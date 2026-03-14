import { Request, Response } from 'express';
import fs from 'fs/promises';
import crypto from 'crypto';
import { ApkPatcherService } from '../services/apk-patcher.service';
import { AdminService } from '../services/admin.service';
import { env } from '../config/env';

const patcher = new ApkPatcherService();
const admin = new AdminService();

// In-memory store for download links with 5-minute TTL
const downloads = new Map<string, { path: string; timer: NodeJS.Timeout }>();

function storeDownload(filePath: string): string {
  const id = crypto.randomUUID();
  const timer = setTimeout(async () => {
    downloads.delete(id);
    await fs.unlink(filePath).catch(() => {});
  }, 5 * 60 * 1000);
  downloads.set(id, { path: filePath, timer });
  return id;
}

export class PatcherController {
  async patchApk(req: Request, res: Response) {
    if (!req.file) {
      res.status(400).json({ error: 'No APK file uploaded' });
      return;
    }

    if (!req.file.originalname.toLowerCase().endsWith('.apk')) {
      await fs.unlink(req.file.path).catch(() => {});
      res.status(400).json({ error: 'File must be an .apk file' });
      return;
    }

    try {
      // Validate Docker is ready
      await patcher.checkDocker();

      // Patch the APK
      const result = await patcher.patchApk(req.file.path, 'PLACEHOLDER', env.BASE_URL);

      // Create API key + PIN config
      const apiKeyRecord = await admin.createKey(result.appName, result.packageName);

      // Update PIN config with user's settings
      const expiryMode = req.body.expiryMode || 'never';
      const expiryHours = parseInt(req.body.expiryHours) || 24;
      const maxAttempts = parseInt(req.body.maxAttempts) || 5;
      const pinMessage = req.body.pinMessage || 'Enter your PIN to unlock the app';

      await admin.upsertPinConfig(apiKeyRecord.id, {
        pinEnabled: true,
        expiryMode,
        expiryHours,
        maxAttempts,
        pinMessage,
      });

      // Re-patch with the real API key (now that we have it)
      const finalResult = await patcher.patchApk(req.file.path, apiKeyRecord.key, env.BASE_URL);

      // Store for download
      const downloadId = storeDownload(finalResult.outputPath);

      res.json({
        downloadId,
        apiKey: apiKeyRecord.key,
        apiKeyId: apiKeyRecord.id,
        appName: finalResult.appName,
        packageName: finalResult.packageName,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Patching failed';
      res.status(500).json({ error: message });
    } finally {
      // Clean up uploaded file
      await fs.unlink(req.file.path).catch(() => {});
    }
  }

  async downloadPatched(req: Request, res: Response) {
    const { id } = req.params;
    const entry = downloads.get(id);

    if (!entry) {
      res.status(404).json({ error: 'Download expired or not found' });
      return;
    }

    try {
      await fs.access(entry.path);
    } catch {
      downloads.delete(id);
      res.status(404).json({ error: 'File no longer available' });
      return;
    }

    res.download(entry.path, 'patched.apk', async (err) => {
      if (!err) {
        // Clean up after successful download
        clearTimeout(entry.timer);
        downloads.delete(id);
        await fs.unlink(entry.path).catch(() => {});
      }
    });
  }
}
