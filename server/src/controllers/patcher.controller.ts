import { Request, Response } from 'express';
import fs from 'fs/promises';
import crypto from 'crypto';
import { z } from 'zod';
import { ApkPatcherService } from '../services/apk-patcher.service';
import { AdminService } from '../services/admin.service';
import { env } from '../config/env';

const bodySchema = z.object({
  expiryMode: z.enum(['never', 'duration']).default('never'),
  expiryHours: z.coerce.number().min(1).default(24),
  maxAttempts: z.coerce.number().min(1).max(20).default(5),
  pinMessage: z.string().default('Enter your PIN to unlock the app'),
});

const patcher = new ApkPatcherService();
const admin = new AdminService();

// In-memory store for download links with 5-minute TTL
const downloads = new Map<string, { path: string; timer: NodeJS.Timeout }>();

function storeDownload(filePath: string): string {
  const id = crypto.randomUUID();
  const timer = setTimeout(async () => {
    downloads.delete(id);
    await fs.unlink(filePath).catch((err) => {
      console.warn(`Download cleanup failed for ${filePath}:`, err.message);
    });
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
      await fs.unlink(req.file.path).catch((err) => {
        console.warn(`Upload cleanup failed:`, err.message);
      });
      res.status(400).json({ error: 'File must be an .apk file' });
      return;
    }

    try {
      // Validate request body
      const pinSettings = bodySchema.parse(req.body);

      // Validate Docker is ready
      await patcher.checkDocker();

      // Extract package info without rebuilding
      const { appName, packageName } = await patcher.parseApkInfo(req.file.path);

      // Create API key + PIN config with real app data
      const apiKeyRecord = await admin.createKey(appName, packageName);

      await admin.upsertPinConfig(apiKeyRecord.id, {
        pinEnabled: true,
        expiryMode: pinSettings.expiryMode,
        expiryHours: pinSettings.expiryHours,
        maxAttempts: pinSettings.maxAttempts,
        pinMessage: pinSettings.pinMessage,
      });

      // Patch the APK once with the real API key
      const result = await patcher.patchApk(req.file.path, apiKeyRecord.key, env.BASE_URL);

      // Store for download
      const downloadId = storeDownload(result.outputPath);

      res.json({
        downloadId,
        apiKey: apiKeyRecord.key,
        apiKeyId: apiKeyRecord.id,
        appName: result.appName,
        packageName: result.packageName,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ error: err.errors[0].message });
        return;
      }
      const message = err instanceof Error ? err.message : 'Patching failed';
      res.status(500).json({ error: message });
    } finally {
      // Clean up uploaded file
      await fs.unlink(req.file.path).catch((err) => {
        console.warn(`Upload cleanup failed for ${req.file!.path}:`, err.message);
      });
    }
  }

  async downloadPatched(req: Request, res: Response) {
    const id = req.params.id as string;
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
        await fs.unlink(entry.path).catch((err) => {
          console.warn(`Download file cleanup failed:`, err.message);
        });
      }
    });
  }
}
