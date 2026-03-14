import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

const execAsync = promisify(exec);

const DOCKER_IMAGE = 'adverify-patcher';
const SMALI_ASSETS = path.resolve(__dirname, '../../assets/adverify-smali');

interface PatchResult {
  outputPath: string;
  packageName: string;
  appName: string;
}

interface ManifestInfo {
  packageName: string;
  appName: string;
  launcherActivity: string;
  hasInternetPerm: boolean;
  hasCleartext: boolean;
}

export class ApkPatcherService {
  // ─── Public ───

  async checkDocker(): Promise<void> {
    try {
      await execAsync('docker info', { timeout: 10000 });
    } catch {
      throw new Error('Docker is not running. Please start Docker first.');
    }

    try {
      const { stdout } = await execAsync(`docker images -q ${DOCKER_IMAGE}`, { timeout: 10000 });
      if (!stdout.trim()) {
        throw new Error(
          `Docker image "${DOCKER_IMAGE}" not found. Run: docker build -t ${DOCKER_IMAGE} server/tools/`
        );
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes('not found')) throw err;
      throw new Error('Failed to check Docker images.');
    }
  }

  async patchApk(apkPath: string, apiKey: string, baseUrl: string): Promise<PatchResult> {
    const workDir = await fs.mkdtemp(path.join(os.tmpdir(), 'apk-patch-'));

    try {
      const inputApk = path.join(workDir, 'input.apk');
      await fs.copyFile(apkPath, inputApk);

      // 1. Decompile
      await this.dockerExec(workDir, ['apktool', 'd', '/work/input.apk', '-o', '/work/decompiled', '-f']);

      const decompiled = path.join(workDir, 'decompiled');
      const manifestPath = path.join(decompiled, 'AndroidManifest.xml');

      // 2. Parse manifest
      const manifest = await this.parseManifest(manifestPath);

      // 3. Modify manifest
      await this.modifyManifest(manifestPath, manifest, apiKey, baseUrl);

      // 4. Find launcher smali
      const smaliPath = await this.findSmaliFile(decompiled, manifest.launcherActivity);

      // 5. Inject SDK hook
      await this.injectSmaliHook(smaliPath);

      // 6. Copy AdVerify SDK smali files
      const targetSmali = path.join(decompiled, 'smali', 'com', 'adverify');
      await fs.cp(path.join(SMALI_ASSETS, 'com', 'adverify'), targetSmali, { recursive: true });

      // 7. Rebuild
      await this.dockerExec(workDir, ['apktool', 'b', '/work/decompiled', '-o', '/work/patched.apk']);

      // 8. Sign
      await this.dockerExec(workDir, [
        'jarsigner', '-sigalg', 'SHA256withRSA', '-digestalg', 'SHA-256',
        '-keystore', '/opt/debug.keystore', '-storepass', 'android',
        '/work/patched.apk', 'androiddebugkey',
      ]);

      // Move patched APK to a stable output location
      const outputPath = path.join(os.tmpdir(), `patched-${crypto.randomUUID()}.apk`);
      await fs.copyFile(path.join(workDir, 'patched.apk'), outputPath);

      return {
        outputPath,
        packageName: manifest.packageName,
        appName: manifest.appName,
      };
    } finally {
      await fs.rm(workDir, { recursive: true, force: true }).catch(() => {});
    }
  }

  // ─── Docker ───

  private async dockerExec(workDir: string, args: string[], timeout = 120000): Promise<string> {
    const cmd = `docker run --rm -v "${workDir}:/work" ${DOCKER_IMAGE} ${args.join(' ')}`;
    const { stdout, stderr } = await execAsync(cmd, { timeout, maxBuffer: 10 * 1024 * 1024 });
    if (stderr && stderr.includes('Exception')) {
      throw new Error(`Docker command failed: ${stderr.slice(0, 500)}`);
    }
    return stdout;
  }

  // ─── Manifest ───

  private async parseManifest(manifestPath: string): Promise<ManifestInfo> {
    const xml = await fs.readFile(manifestPath, 'utf-8');

    // Package name
    const pkgMatch = xml.match(/package="([^"]+)"/);
    if (!pkgMatch) throw new Error('Could not find package name in manifest');
    const packageName = pkgMatch[1];

    // App label (for display name)
    const labelMatch = xml.match(/<application[^>]*android:label="([^"]+)"/);
    const appName = labelMatch ? labelMatch[1].replace(/^@string\//, '') : packageName;

    // Launcher activity: find activity with MAIN + LAUNCHER intent-filter
    const launcherActivity = this.findLauncherActivity(xml, packageName);
    if (!launcherActivity) throw new Error('Could not find launcher activity in manifest');

    // Permissions & flags
    const hasInternetPerm = /android\.permission\.INTERNET/.test(xml);
    const hasCleartext = /android:usesCleartextTraffic="true"/.test(xml);

    return { packageName, appName, launcherActivity, hasInternetPerm, hasCleartext };
  }

  private findLauncherActivity(xml: string, packageName: string): string | null {
    // Match activity blocks that contain both MAIN and LAUNCHER
    const activityRegex = /<activity\s[^>]*android:name="([^"]+)"[^]*?<\/activity>/g;
    let match;
    while ((match = activityRegex.exec(xml)) !== null) {
      const block = match[0];
      if (block.includes('android.intent.action.MAIN') && block.includes('android.intent.category.LAUNCHER')) {
        let name = match[1];
        // Resolve relative names
        if (name.startsWith('.')) name = packageName + name;
        else if (!name.includes('.')) name = packageName + '.' + name;
        return name;
      }
    }

    // Fallback: try self-closing activity tags with intent-filter siblings
    const activityRegex2 = /<activity\s[^>]*android:name="([^"]+)"[^/]*\/>/g;
    while ((match = activityRegex2.exec(xml)) !== null) {
      // Check context around this tag
      const start = Math.max(0, match.index - 200);
      const context = xml.slice(start, match.index + match[0].length + 500);
      if (context.includes('android.intent.action.MAIN') && context.includes('android.intent.category.LAUNCHER')) {
        let name = match[1];
        if (name.startsWith('.')) name = packageName + name;
        else if (!name.includes('.')) name = packageName + '.' + name;
        return name;
      }
    }

    return null;
  }

  private async modifyManifest(
    manifestPath: string,
    info: ManifestInfo,
    apiKey: string,
    baseUrl: string,
  ): Promise<void> {
    let xml = await fs.readFile(manifestPath, 'utf-8');

    // Add INTERNET permission if missing
    if (!info.hasInternetPerm) {
      xml = xml.replace(
        /<application/,
        '<uses-permission android:name="android.permission.INTERNET"/>\n    <application'
      );
    }

    // Add usesCleartextTraffic if missing
    if (!info.hasCleartext) {
      xml = xml.replace(
        /<application\s/,
        '<application android:usesCleartextTraffic="true" '
      );
    }

    // Insert meta-data after <application ...> opening tag
    const metaData = [
      `<meta-data android:name="adverify.api_key" android:value="${apiKey}"/>`,
      `<meta-data android:name="adverify.base_url" android:value="${baseUrl}"/>`,
    ].join('\n        ');

    // Find the end of the <application> opening tag
    const appTagMatch = xml.match(/<application\s[^>]*>/);
    if (appTagMatch) {
      const insertPos = appTagMatch.index! + appTagMatch[0].length;
      xml = xml.slice(0, insertPos) + '\n        ' + metaData + xml.slice(insertPos);
    }

    await fs.writeFile(manifestPath, xml);
  }

  // ─── Smali ───

  private async findSmaliFile(decompiled: string, className: string): Promise<string> {
    const relativePath = className.replace(/\./g, '/') + '.smali';

    // Search across smali/, smali_classes2/, smali_classes3/, etc.
    const entries = await fs.readdir(decompiled);
    const smaliDirs = entries.filter((e) => e.startsWith('smali'));

    for (const dir of smaliDirs) {
      const candidate = path.join(decompiled, dir, relativePath);
      try {
        await fs.access(candidate);
        return candidate;
      } catch {
        // Not in this directory
      }
    }

    throw new Error(`Could not find smali file for ${className}. Searched: ${smaliDirs.join(', ')}`);
  }

  private async injectSmaliHook(smaliPath: string): Promise<void> {
    let smali = await fs.readFile(smaliPath, 'utf-8');

    const hookLine = '    invoke-static {p0}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;)V';

    // Check if already injected
    if (smali.includes('Lcom/adverify/sdk/AdVerify;->start')) return;

    // Case 1: onCreate exists
    const onCreateMatch = smali.match(/\.method\s+(?:public|protected)\s+onCreate\(Landroid\/os\/Bundle;\)V/);
    if (onCreateMatch) {
      // Find the invoke-super or invoke-direct calling parent onCreate
      const superCallRegex = /invoke-(?:super|direct)\s+\{[^}]*\},\s*L[^;]+;->onCreate\(Landroid\/os\/Bundle;\)V/;
      const superMatch = smali.match(superCallRegex);
      if (superMatch) {
        const insertPos = superMatch.index! + superMatch[0].length;
        smali = smali.slice(0, insertPos) + '\n\n' + hookLine + smali.slice(insertPos);
      } else {
        // Insert after .locals or .registers line in onCreate
        const localsRegex = /\.method\s+(?:public|protected)\s+onCreate\(Landroid\/os\/Bundle;\)V[\s\S]*?(\.locals\s+\d+|\.registers\s+\d+)/;
        const localsMatch = smali.match(localsRegex);
        if (localsMatch) {
          const insertPos = localsMatch.index! + localsMatch[0].length;
          smali = smali.slice(0, insertPos) + '\n\n' + hookLine + smali.slice(insertPos);
        }
      }
    } else {
      // Case 2: No onCreate, append a complete method
      const superMatch = smali.match(/\.super\s+(\S+)/);
      const superClass = superMatch ? superMatch[1] : 'Landroid/app/Activity;';

      const method = [
        '',
        '.method protected onCreate(Landroid/os/Bundle;)V',
        '    .locals 0',
        '',
        `    invoke-super {p0, p1}, ${superClass}->onCreate(Landroid/os/Bundle;)V`,
        '',
        hookLine,
        '',
        '    return-void',
        '.end method',
      ].join('\n');

      smali += '\n' + method + '\n';
    }

    await fs.writeFile(smaliPath, smali);
  }
}
