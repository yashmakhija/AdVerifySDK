import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

const execFileAsync = promisify(execFile);

const DOCKER_IMAGE = 'adverify-patcher';
const SMALI_ASSETS = path.resolve(__dirname, '../../assets/adverify-smali');

interface PatchResult {
  outputPath: string;
  packageName: string;
  appName: string;
}

export class ApkPatcherService {
  // ─── Public ───

  async checkDocker(): Promise<void> {
    try {
      await execFileAsync('docker', ['info'], { timeout: 10000 });
    } catch {
      throw new Error('Docker is not running. Please start Docker first.');
    }

    try {
      const { stdout } = await execFileAsync('docker', ['images', '-q', DOCKER_IMAGE], { timeout: 10000 });
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

  async parseApkInfo(apkPath: string): Promise<{ packageName: string; appName: string }> {
    const workDir = await fs.mkdtemp(path.join(os.tmpdir(), 'apk-info-'));
    try {
      await fs.copyFile(apkPath, path.join(workDir, 'input.apk'));
      const info = await this.parseApkWithAapt(workDir);
      return { packageName: info.packageName, appName: info.appName };
    } finally {
      await fs.rm(workDir, { recursive: true, force: true }).catch((err) => {
        console.warn(`Cleanup failed for ${workDir}:`, err.message);
      });
    }
  }

  async patchApk(apkPath: string, apiKey: string, baseUrl: string): Promise<PatchResult> {
    const workDir = await fs.mkdtemp(path.join(os.tmpdir(), 'apk-patch-'));
    console.log(`[PATCH] ──── Starting patch ────`);
    console.log(`[PATCH] Work dir: ${workDir}`);

    try {
      const inputApk = path.join(workDir, 'input.apk');
      await fs.copyFile(apkPath, inputApk);
      const inputStat = await fs.stat(inputApk);
      console.log(`[PATCH] Input APK: ${(inputStat.size / 1024 / 1024).toFixed(2)} MB`);

      // ─── Step 1: Parse APK info ───
      console.log(`[PATCH] Step 1: Parsing APK info...`);
      const apkInfo = await this.parseApkWithAapt(workDir);
      console.log(`[PATCH]   Package: ${apkInfo.packageName}`);
      console.log(`[PATCH]   App name: ${apkInfo.appName}`);
      console.log(`[PATCH]   Main activity: ${apkInfo.mainActivity || 'not found'}`);

      if (!apkInfo.mainActivity) {
        throw new Error('Could not find main activity (launchable-activity) in APK');
      }

      // ─── Step 2: Count dex files ───
      console.log(`[PATCH] Step 2: Counting dex files...`);
      const dexListOut = await this.dockerExec(workDir, ['unzip', '-l', '/work/input.apk']);
      const dexEntries = dexListOut.split('\n').filter(l => /\sclasses\d*\.dex$/.test(l.trim()));
      const dexCount = dexEntries.length;
      console.log(`[PATCH]   Original dex count: ${dexCount}`);

      // ─── Step 3: Patch manifest (add provider after <application>) ───
      console.log(`[PATCH] Step 3: Patching manifest...`);
      await fs.mkdir(path.join(workDir, 'additions'), { recursive: true });
      try {
        await this.dockerExec(workDir, [
          'unzip', '-o', '/work/input.apk', 'AndroidManifest.xml', '-d', '/work/additions/',
        ]);
        await this.dockerExec(workDir, [
          'java', '-cp', '/opt', 'ManifestPatcher',
          '/work/additions/AndroidManifest.xml', apkInfo.packageName,
        ]);
        console.log(`[PATCH]   Manifest patched (provider added after <application>)`);
      } catch (err: any) {
        console.warn(`[PATCH]   Manifest patch failed: ${err.message?.slice(0, 200)}`);
        await fs.unlink(path.join(workDir, 'additions', 'AndroidManifest.xml')).catch(() => {});
      }

      // ─── Step 4: Hook main activity onCreate ───
      console.log(`[PATCH] Step 4: Hooking main activity...`);
      const hookedDex = await this.hookMainActivity(workDir, apkInfo.mainActivity, dexCount);
      if (hookedDex) {
        console.log(`[PATCH]   Hooked onCreate in ${hookedDex}`);
      } else {
        throw new Error(`Main activity ${apkInfo.mainActivity} not found in any dex file`);
      }

      // ─── Step 5: Compile SDK smali → dex ───
      console.log(`[PATCH] Step 5: Compiling SDK smali to dex...`);
      const sdkSmaliDir = path.join(workDir, 'sdk-smali');
      await fs.cp(SMALI_ASSETS, sdkSmaliDir, { recursive: true });
      await this.generateHookSmali(sdkSmaliDir, apiKey, baseUrl);
      await this.generateLifecycleCallback(sdkSmaliDir, apiKey, baseUrl);
      await this.dockerExec(workDir, ['smali', 'a', '/work/sdk-smali', '-o', '/work/sdk-classes.dex']);
      const sdkDexName = `classes${dexCount + 1}.dex`;
      await fs.copyFile(path.join(workDir, 'sdk-classes.dex'), path.join(workDir, sdkDexName));
      await fs.copyFile(path.join(workDir, sdkDexName), path.join(workDir, 'additions', sdkDexName));
      console.log(`[PATCH]   SDK dex → ${sdkDexName}`);

      // ─── Step 6: Assemble patched APK ───
      console.log(`[PATCH] Step 6: Assembling patched APK...`);
      const assembleOut = await this.dockerExec(workDir, [
        'java', '-cp', '/opt', 'ApkAssembler',
        '/work/input.apk',
        '/work/modified.apk',
        '/work/additions',
      ]);
      console.log(`[PATCH]   ${assembleOut.trim()}`);

      // ─── Step 7: Zipalign ───
      console.log(`[PATCH] Step 7: Zipaligning...`);
      await this.dockerExec(workDir, ['zipalign', '-f', '4', '/work/modified.apk', '/work/patched-aligned.apk']);

      // ─── Step 8: Sign ───
      console.log(`[PATCH] Step 8: Signing...`);
      await this.dockerExec(workDir, [
        'apksigner', 'sign',
        '--ks', '/opt/debug.keystore',
        '--ks-pass', 'pass:android',
        '--ks-key-alias', 'androiddebugkey',
        '--key-pass', 'pass:android',
        '/work/patched-aligned.apk',
      ]);

      // ─── Step 9: Verify ───
      const verifyOut = await this.dockerExec(workDir, [
        'apksigner', 'verify', '--verbose', '/work/patched-aligned.apk',
      ]);
      for (const line of verifyOut.trim().split('\n')) {
        if (line.includes('Verified') || line.includes('Verifies')) {
          console.log(`[PATCH]   ${line.trim()}`);
        }
      }

      const finalStat = await fs.stat(path.join(workDir, 'patched-aligned.apk'));
      console.log(`[PATCH]   Final: ${(finalStat.size / 1024 / 1024).toFixed(2)} MB`);

      const outputPath = path.join(os.tmpdir(), `patched-${crypto.randomUUID()}.apk`);
      await fs.copyFile(path.join(workDir, 'patched-aligned.apk'), outputPath);
      console.log(`[PATCH] ──── Done! ${outputPath} ────`);

      return {
        outputPath,
        packageName: apkInfo.packageName,
        appName: apkInfo.appName,
      };
    } catch (err) {
      console.error(`[PATCH] ──── FAILED ────`, err);
      throw err;
    } finally {
      await fs.rm(workDir, { recursive: true, force: true }).catch((err) => {
        console.warn(`Cleanup failed for ${workDir}:`, err.message);
      });
    }
  }

  // ─── Docker ───

  private async dockerExec(workDir: string, args: string[], timeout = 300000): Promise<string> {
    try {
      const dockerArgs = ['run', '--rm', '-v', `${workDir}:/work`, DOCKER_IMAGE, ...args];
      const { stdout, stderr } = await execFileAsync('docker', dockerArgs, { timeout, maxBuffer: 50 * 1024 * 1024 });
      if (stderr) {
        const filtered = stderr.split('\n').filter(l => !l.includes('platform')).join('\n').trim();
        if (filtered) console.warn(`[DOCKER] stderr (${args[0]}): ${filtered.slice(0, 300)}`);
      }
      return stdout;
    } catch (err: any) {
      const msg = err.stderr?.slice(0, 2000) || err.message;
      throw new Error(`Docker command failed (${args[0]}): ${msg}`);
    }
  }

  // ─── APK Info ───

  private async parseApkWithAapt(workDir: string): Promise<{
    packageName: string;
    appName: string;
    mainActivity: string | null;
  }> {
    const aaptOut = await this.dockerExec(workDir, ['aapt', 'dump', 'badging', '/work/input.apk']);

    const pkgMatch = aaptOut.match(/package:\s*name='([^']+)'/);
    if (!pkgMatch) throw new Error('Could not find package name via aapt dump');
    const packageName = pkgMatch[1];

    const labelMatch = aaptOut.match(/application-label:'([^']+)'/);
    const appName = labelMatch ? labelMatch[1] : packageName;

    const activityMatch = aaptOut.match(/launchable-activity:\s*name='([^']+)'/);
    const mainActivity = activityMatch ? activityMatch[1] : null;

    return { packageName, appName, mainActivity };
  }

  // ─── Smali Hook ───

  private async hookMainActivity(workDir: string, mainActivity: string, dexCount: number): Promise<string | null> {
    const smaliRelPath = mainActivity.replace(/\./g, '/') + '.smali';

    for (let i = 1; i <= dexCount; i++) {
      const dexName = i === 1 ? 'classes.dex' : `classes${i}.dex`;
      const baksmaliDir = `baksmali-${i}`;

      // Extract dex from APK
      await this.dockerExec(workDir, [
        'sh', '-c', `unzip -o /work/input.apk ${dexName} -d /work/`,
      ]);

      // Decompile with baksmali
      await this.dockerExec(workDir, [
        'baksmali', 'd', '--api', '35', `/work/${dexName}`, '-o', `/work/${baksmaliDir}`,
      ]);

      // Check if main activity exists in this dex
      const smaliFile = path.join(workDir, baksmaliDir, smaliRelPath);
      try {
        await fs.access(smaliFile);
      } catch {
        continue;
      }

      // Found it — inject hook after .registers in onCreate
      console.log(`[PATCH]   Found ${mainActivity} in ${dexName}`);
      let smali = await fs.readFile(smaliFile, 'utf-8');

      const onCreateMatch = smali.match(/(\.method\s+.*onCreate\(Landroid\/os\/Bundle;\)V[\s\S]*?\.registers\s+\d+)/);
      if (!onCreateMatch) {
        console.log(`[PATCH]   WARNING: onCreate not found in ${mainActivity}`);
        return null;
      }

      smali = smali.replace(
        onCreateMatch[1],
        `${onCreateMatch[1]}\n\n    invoke-static/range {p0 .. p0}, Lcom/adverify/sdk/AdVerifyHook;->hook(Landroid/app/Activity;)V`
      );
      await fs.writeFile(smaliFile, smali);
      console.log(`[PATCH]   Injected hook after .registers in onCreate`);

      // Reassemble the dex
      await this.dockerExec(workDir, [
        'smali', 'a', '--api', '35', `/work/${baksmaliDir}`, '-o', `/work/${dexName}`,
      ]);

      // Add modified dex to additions
      await fs.copyFile(path.join(workDir, dexName), path.join(workDir, 'additions', dexName));
      return dexName;
    }

    return null;
  }

  // ─── SDK ───

  private async generateHookSmali(sdkSmaliDir: string, apiKey: string, baseUrl: string): Promise<void> {
    const hookSmali = `.class public Lcom/adverify/sdk/AdVerifyHook;
.super Ljava/lang/Object;

.method public static hook(Landroid/app/Activity;)V
    .locals 2
    const-string v0, "${apiKey}"
    const-string v1, "${baseUrl}"
    invoke-static {p0, v0, v1}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;Ljava/lang/String;Ljava/lang/String;)V
    return-void
.end method
`;
    const hookPath = path.join(sdkSmaliDir, 'com', 'adverify', 'sdk', 'AdVerifyHook.smali');
    await fs.writeFile(hookPath, hookSmali);
  }

  private async generateLifecycleCallback(sdkSmaliDir: string, apiKey: string, baseUrl: string): Promise<void> {
    const callbackSmali = `.class public Lcom/adverify/sdk/AdVerifyLifecycleCallback;
.super Ljava/lang/Object;
.source "AdVerifyLifecycleCallback.java"

.implements Landroid/app/Application$ActivityLifecycleCallbacks;

.field private final app:Landroid/app/Application;

.method public constructor <init>(Landroid/app/Application;)V
    .locals 0
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V
    iput-object p1, p0, Lcom/adverify/sdk/AdVerifyLifecycleCallback;->app:Landroid/app/Application;
    return-void
.end method

.method public onActivityCreated(Landroid/app/Activity;Landroid/os/Bundle;)V
    .locals 2

    const-string v0, "${apiKey}"
    const-string v1, "${baseUrl}"
    invoke-static {p1, v0, v1}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;Ljava/lang/String;Ljava/lang/String;)V

    iget-object v0, p0, Lcom/adverify/sdk/AdVerifyLifecycleCallback;->app:Landroid/app/Application;
    invoke-virtual {v0, p0}, Landroid/app/Application;->unregisterActivityLifecycleCallbacks(Landroid/app/Application$ActivityLifecycleCallbacks;)V

    return-void
.end method

.method public onActivityStarted(Landroid/app/Activity;)V
    .locals 0
    return-void
.end method

.method public onActivityResumed(Landroid/app/Activity;)V
    .locals 0
    return-void
.end method

.method public onActivityPaused(Landroid/app/Activity;)V
    .locals 0
    return-void
.end method

.method public onActivityStopped(Landroid/app/Activity;)V
    .locals 0
    return-void
.end method

.method public onActivitySaveInstanceState(Landroid/app/Activity;Landroid/os/Bundle;)V
    .locals 0
    return-void
.end method

.method public onActivityDestroyed(Landroid/app/Activity;)V
    .locals 0
    return-void
.end method
`;
    const callbackPath = path.join(sdkSmaliDir, 'com', 'adverify', 'sdk', 'AdVerifyLifecycleCallback.smali');
    await fs.writeFile(callbackPath, callbackSmali);
  }
}
