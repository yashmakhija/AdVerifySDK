import crypto from 'crypto';
import { prisma } from '../lib/prisma';
import { env } from '../config/env';

type UserSettings = { pinUnlockMode: string; excludedAppIds: number[] };

// Get settings for the user who owns the API key, fallback to safe defaults
async function getSettingsForKey(apiKeyId: number): Promise<UserSettings> {
  const apiKey = await prisma.apiKey.findUnique({
    where: { id: apiKeyId },
    select: { userId: true },
  });

  // If key is owned by a user, use their settings
  if (apiKey?.userId) {
    const user = await prisma.user.findUnique({
      where: { id: apiKey.userId },
      select: { pinUnlockMode: true, excludedAppIds: true },
    });
    if (user) {
      return { pinUnlockMode: user.pinUnlockMode, excludedAppIds: user.excludedAppIds };
    }
  }

  // Unassigned keys: always use per_app mode to prevent cross-user leaks
  // Global settings only apply to keys with a known owner
  return { pinUnlockMode: 'per_app', excludedAppIds: [] };
}

export class SdkService {
  async init(apiKeyId: number, deviceId: string) {
    const [apiKey, pinConfig, settings] = await Promise.all([
      prisma.apiKey.findUnique({ where: { id: apiKeyId }, select: { appName: true, userId: true } }),
      prisma.pinConfig.findUnique({ where: { apiKeyId } }),
      getSettingsForKey(apiKeyId),
    ]);

    const pinVerified = await this.isDeviceVerifiedWithMode(apiKeyId, deviceId, pinConfig, settings);

    const defaultInfoItems = [
      { icon: 'device', text: 'Device Not Registered', color: '#3b82f6' },
      { icon: 'hourglass', text: `Access Duration: ${pinConfig?.expiryMode === 'duration' ? pinConfig.expiryHours + ' Hours' : 'Lifetime'}`, color: '#22c55e' },
      { icon: 'key', text: 'Automatic Password System', color: '#8b5cf6' },
      { icon: 'crown', text: 'Premium Users Only', color: '#eab308' },
      { icon: 'shield', text: 'VPN & Emulators Not Allowed', color: '#ef4444' },
    ];

    const defaultJoinLinks = [
      { name: 'Public Channel', description: 'Apps, APKs & Mods', url: 'https://t.me/Android_apps_apks_mod', iconType: 'channel' },
      { name: 'Private Channel', description: 'Exclusive Content', url: 'https://t.me/+PXcn1RVLom0xMzU1', iconType: 'telegram' },
    ];

    const pinInfoItems = pinConfig?.pinInfoItems as any[] ?? [];
    const joinLinks = pinConfig?.joinLinks as any[] ?? [];

    const hasBroadcastAds = pinVerified
      ? (await prisma.ad.count({
          where: {
            apiKeyId,
            isActive: true,
            OR: [
              { broadcastToVerified: true },
              { targetAudience: 'all' },
              { targetAudience: 'verified' },
              { scheduledAt: { not: null, lte: new Date() } },
            ],
          },
        })) > 0
      : false;

    return {
      appName: apiKey?.appName ?? '',
      pinEnabled: pinConfig?.pinEnabled ?? false,
      pinVerified,
      hasBroadcastAds,
      pinMessage: pinConfig?.pinMessage ?? '',
      maxAttempts: pinConfig?.maxAttempts ?? 3,
      getPinUrl: pinConfig?.getPinUrl ?? '',
      getPinBtnText: pinConfig?.getPinBtnText ?? 'Get PIN',
      enterPinBtnText: pinConfig?.enterPinBtnText ?? 'Enter PIN',
      tutorialUrl: pinConfig?.tutorialUrl ?? 'https://t.me/EllieTutorials/36',
      pinInfoItems: pinInfoItems.length > 0 ? pinInfoItems : defaultInfoItems,
      joinLinks: joinLinks.length > 0 ? joinLinks : defaultJoinLinks,
    };
  }

  async getPinConfig(apiKeyId: number) {
    return prisma.pinConfig.findUnique({ where: { apiKeyId } });
  }

  async getAds(apiKeyId: number, deviceId?: string, isVerified?: boolean) {
    const now = new Date();
    const ads = await prisma.ad.findMany({
      where: {
        apiKeyId,
        isActive: true,
        OR: [
          { scheduledAt: null },
          { scheduledAt: { lte: now } },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        redirectUrl: true,
        adType: true,
        buttonText: true,
        priority: true,
        maxImpressions: true,
        broadcastToVerified: true,
        targetAudience: true,
      },
      orderBy: { priority: 'desc' },
    });

    const audienceFiltered = ads.filter(ad => {
      if (ad.targetAudience === 'all') return true;
      if (ad.targetAudience === 'verified' && isVerified) return true;
      if (ad.targetAudience === 'unverified' && !isVerified) return true;
      return false;
    });

    if (deviceId && audienceFiltered.some(a => a.maxImpressions > 0)) {
      const counts = await prisma.impression.groupBy({
        by: ['adId'],
        where: { apiKeyId, deviceId },
        _count: true,
      });
      const countMap = new Map(counts.map(c => [c.adId, c._count]));

      return audienceFiltered.filter(ad => {
        if (ad.maxImpressions <= 0) return true;
        return (countMap.get(ad.id) ?? 0) < ad.maxImpressions;
      });
    }

    return audienceFiltered;
  }

  async verifyPin(apiKeyId: number, deviceId: string, pin: string) {
    const [config, settings] = await Promise.all([
      prisma.pinConfig.findUnique({ where: { apiKeyId } }),
      getSettingsForKey(apiKeyId),
    ]);

    if (!config?.pinEnabled) {
      return { verified: true, message: 'PIN not required' };
    }

    if (await this.isDeviceVerifiedWithMode(apiKeyId, deviceId, config, settings)) {
      return { verified: true, message: 'Already verified' };
    }

    // Find the device's PIN record (any unused PIN for this device)
    const devicePin = await prisma.userPin.findFirst({
      where: { apiKeyId, deviceId, isUsed: false },
    });

    // Check if device is locked from too many attempts
    if (devicePin?.lockedUntil && new Date() < devicePin.lockedUntil) {
      const minutesLeft = Math.ceil((devicePin.lockedUntil.getTime() - Date.now()) / 60000);
      return { verified: false, message: `Too many attempts. Try again in ${minutesLeft} minute${minutesLeft === 1 ? '' : 's'}.`, locked: true };
    }

    // If lock expired, reset attempts for fresh start
    if (devicePin?.lockedUntil && new Date() >= devicePin.lockedUntil) {
      await prisma.userPin.update({
        where: { id: devicePin.id },
        data: { attempts: 0, lockedUntil: null },
      });
      devicePin.attempts = 0;
    }

    // Check if PIN matches
    if (!devicePin || devicePin.pin !== pin) {
      // Wrong PIN — increment attempts
      if (devicePin) {
        const newAttempts = devicePin.attempts + 1;
        const maxAttempts = config.maxAttempts || 3;

        if (newAttempts >= maxAttempts) {
          // Lock for 30 minutes after max attempts
          await prisma.userPin.update({
            where: { id: devicePin.id },
            data: { attempts: newAttempts, lockedUntil: new Date(Date.now() + 30 * 60 * 1000) },
          });
          return { verified: false, message: `Too many attempts. Locked for 30 minutes.`, locked: true };
        }

        await prisma.userPin.update({
          where: { id: devicePin.id },
          data: { attempts: newAttempts },
        });

        const remaining = maxAttempts - newAttempts;
        return { verified: false, message: `Invalid PIN. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.` };
      }

      return { verified: false, message: 'Invalid PIN' };
    }

    const expiresAt = config.expiryMode === 'duration'
      ? new Date(Date.now() + config.expiryHours * 60 * 60 * 1000)
      : null;

    // Correct PIN — mark as used, reset attempts
    await prisma.userPin.update({
      where: { id: devicePin.id },
      data: { isUsed: true, usedAt: new Date(), expiresAt, attempts: 0, lockedUntil: null },
    });

    return { verified: true, message: 'PIN verified. App unlocked!' };
  }

  async generatePin(apiKeyId: number, deviceId: string): Promise<string> {
    const existing = await prisma.userPin.findFirst({
      where: { apiKeyId, deviceId, isUsed: false },
    });

    // If locked, don't give a new PIN
    if (existing?.lockedUntil && new Date() < existing.lockedUntil) {
      throw new Error('Device is locked from too many attempts');
    }

    // If max attempts exhausted but lock expired, reset and generate new PIN
    if (existing && existing.attempts > 0 && (!existing.lockedUntil || new Date() >= existing.lockedUntil)) {
      await prisma.userPin.update({
        where: { id: existing.id },
        data: { attempts: 0, lockedUntil: null },
      });
    }

    if (existing) {
      return existing.pin;
    }

    const pin = crypto.randomInt(100000, 999999).toString();

    await prisma.userPin.create({
      data: { apiKeyId, deviceId, pin },
    });

    return pin;
  }

  async checkStatus(apiKeyId: number, deviceId: string) {
    const [config, settings] = await Promise.all([
      prisma.pinConfig.findUnique({ where: { apiKeyId } }),
      getSettingsForKey(apiKeyId),
    ]);
    const verified = await this.isDeviceVerifiedWithMode(apiKeyId, deviceId, config, settings);
    return { unlocked: verified };
  }

  // Scope "global" unlock to the same user's keys only
  private async isDeviceVerifiedWithMode(
    apiKeyId: number,
    deviceId: string,
    config: { expiryMode: string; expiryHours: number } | null,
    settings: UserSettings,
  ): Promise<boolean> {
    if (!deviceId) return false;

    if (settings.pinUnlockMode === 'per_app') {
      return this.isDeviceVerified(apiKeyId, deviceId, config);
    }

    if (settings.pinUnlockMode === 'global') {
      return this.isDeviceVerifiedGlobally(apiKeyId, deviceId);
    }

    if (settings.pinUnlockMode === 'global_except') {
      if (settings.excludedAppIds.includes(apiKeyId)) {
        return this.isDeviceVerified(apiKeyId, deviceId, config);
      }
      return this.isDeviceVerifiedGlobally(apiKeyId, deviceId);
    }

    return this.isDeviceVerified(apiKeyId, deviceId, config);
  }

  // "Global" now means across the SAME user's keys only
  private async isDeviceVerifiedGlobally(apiKeyId: number, deviceId: string): Promise<boolean> {
    // Get the owner of this API key
    const apiKey = await prisma.apiKey.findUnique({
      where: { id: apiKeyId },
      select: { userId: true },
    });

    // If key has no owner, can't do global — fall back to per-app only
    if (!apiKey?.userId) {
      const config = await prisma.pinConfig.findUnique({ where: { apiKeyId } });
      return this.isDeviceVerified(apiKeyId, deviceId, config);
    }

    // Build filter: same user's keys only
    const keyFilter = { apiKey: { userId: apiKey.userId } };

    const verifiedPin = await prisma.userPin.findFirst({
      where: { deviceId, isUsed: true, ...keyFilter },
      include: { apiKey: { include: { pinConfig: true } } },
      orderBy: { usedAt: 'desc' },
    });

    if (!verifiedPin) return false;

    const config = verifiedPin.apiKey?.pinConfig;
    if (!config || config.expiryMode === 'never') return true;

    if (verifiedPin.expiresAt && new Date() > verifiedPin.expiresAt) {
      await prisma.userPin.delete({ where: { id: verifiedPin.id } });
      return false;
    }

    return true;
  }

  private async isDeviceVerified(
    apiKeyId: number,
    deviceId: string,
    config: { expiryMode: string; expiryHours: number } | null,
  ): Promise<boolean> {
    const verifiedPin = await prisma.userPin.findFirst({
      where: { apiKeyId, deviceId, isUsed: true },
      orderBy: { usedAt: 'desc' },
    });

    if (!verifiedPin) return false;
    if (!config || config.expiryMode === 'never') return true;

    if (verifiedPin.expiresAt && new Date() > verifiedPin.expiresAt) {
      await prisma.userPin.delete({ where: { id: verifiedPin.id } });
      return false;
    }

    return true;
  }

  async createVerifyLink(apiKeyId: number, apiKey: string, deviceId: string): Promise<string> {
    // Load per-app shortener config, fall back to system defaults
    const pinConfig = await prisma.pinConfig.findUnique({ where: { apiKeyId } });
    const shortenerApiUrl = pinConfig?.shortenerApiUrl || env.SHORTENER_API_URL;
    const shortenerFrontendUrl = pinConfig?.shortenerFrontendUrl || env.SHORTENER_FRONTEND_URL;

    const res = await fetch(`${shortenerApiUrl}/api/v1/adverify/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey, deviceId }),
    });

    if (!res.ok) {
      throw new Error(`Shortener API error: ${res.status}`);
    }

    const data = await res.json() as { success: boolean; data: { code: string } };
    if (!data.success) {
      throw new Error('Failed to create verification link');
    }

    return `${shortenerFrontendUrl}/verify/${data.data.code}`;
  }

  async trackImpression(adId: number, apiKeyId: number, deviceId: string) {
    await prisma.impression.create({ data: { adId, apiKeyId, deviceId } });
  }

  async trackClick(adId: number, apiKeyId: number, deviceId: string) {
    await prisma.click.create({ data: { adId, apiKeyId, deviceId } });
  }
}
