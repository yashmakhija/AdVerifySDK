import crypto from 'crypto';
import { prisma } from '../lib/prisma';
import { env } from '../config/env';
import { SettingsService } from './settings.service';

const settingsService = new SettingsService();

export class SdkService {
  async init(apiKeyId: number, deviceId: string) {
    const [apiKey, pinConfig, settings] = await Promise.all([
      prisma.apiKey.findUnique({ where: { id: apiKeyId }, select: { appName: true } }),
      prisma.pinConfig.findUnique({ where: { apiKeyId } }),
      settingsService.getSettings(),
    ]);

    // Check if device has an active (non-expired) verified PIN
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

    // Check if there are broadcast ads for verified users
    const hasBroadcastAds = pinVerified
      ? (await prisma.ad.count({
          where: {
            apiKeyId,
            isActive: true,
            OR: [
              { broadcastToVerified: true },
              { targetAudience: 'all' },
              { targetAudience: 'verified' },
              // Scheduled ads that are ready to show
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

  async getAds(apiKeyId: number, deviceId?: string, isVerified?: boolean) {
    const now = new Date();
    const ads = await prisma.ad.findMany({
      where: {
        apiKeyId,
        isActive: true,
        // Only show scheduled ads if their time has come (or they have no schedule)
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

    // Filter by target audience
    const audienceFiltered = ads.filter(ad => {
      if (ad.targetAudience === 'all') return true;
      if (ad.targetAudience === 'verified' && isVerified) return true;
      if (ad.targetAudience === 'unverified' && !isVerified) return true;
      return false;
    });

    // Filter by max impressions per device
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

  // Verify a per-user PIN (tied to device)
  async verifyPin(apiKeyId: number, deviceId: string, pin: string) {
    const [config, settings] = await Promise.all([
      prisma.pinConfig.findUnique({ where: { apiKeyId } }),
      settingsService.getSettings(),
    ]);

    if (!config?.pinEnabled) {
      return { verified: true, message: 'PIN not required' };
    }

    // Check if device already has active verification
    if (await this.isDeviceVerifiedWithMode(apiKeyId, deviceId, config, settings)) {
      return { verified: true, message: 'Already verified' };
    }

    // Find matching unused PIN for this device
    const userPin = await prisma.userPin.findFirst({
      where: { apiKeyId, deviceId, pin, isUsed: false },
    });

    if (!userPin) {
      return { verified: false, message: 'Invalid PIN' };
    }

    // Calculate expiry timestamp
    const expiresAt = config.expiryMode === 'duration'
      ? new Date(Date.now() + config.expiryHours * 60 * 60 * 1000)
      : null;

    // Mark PIN as used
    await prisma.userPin.update({
      where: { id: userPin.id },
      data: { isUsed: true, usedAt: new Date(), expiresAt },
    });

    return { verified: true, message: 'PIN verified. App unlocked!' };
  }

  // Generate a unique PIN for a device (called when user taps "Get PIN")
  async generatePin(apiKeyId: number, deviceId: string): Promise<string> {
    // Check if unused PIN already exists for this device
    const existing = await prisma.userPin.findFirst({
      where: { apiKeyId, deviceId, isUsed: false },
    });

    if (existing) {
      return existing.pin;
    }

    // Generate 6-digit unique PIN
    const pin = crypto.randomInt(100000, 999999).toString();

    await prisma.userPin.create({
      data: { apiKeyId, deviceId, pin },
    });

    return pin;
  }

  // Check if device is already unlocked (accounting for expiry)
  async checkStatus(apiKeyId: number, deviceId: string) {
    const [config, settings] = await Promise.all([
      prisma.pinConfig.findUnique({ where: { apiKeyId } }),
      settingsService.getSettings(),
    ]);
    const verified = await this.isDeviceVerifiedWithMode(apiKeyId, deviceId, config, settings);
    return { unlocked: verified };
  }

  // Check verification considering the global unlock mode
  private async isDeviceVerifiedWithMode(
    apiKeyId: number,
    deviceId: string,
    config: { expiryMode: string; expiryHours: number } | null,
    settings: { pinUnlockMode: string; excludedAppIds: number[] },
  ): Promise<boolean> {
    if (!deviceId) return false;

    // per_app: only check this app's PINs (original behavior)
    if (settings.pinUnlockMode === 'per_app') {
      return this.isDeviceVerified(apiKeyId, deviceId, config);
    }

    // global: check if device is verified on ANY app
    if (settings.pinUnlockMode === 'global') {
      return this.isDeviceVerifiedGlobally(deviceId);
    }

    // global_except: if this app is excluded, check only its own PINs
    if (settings.pinUnlockMode === 'global_except') {
      if (settings.excludedAppIds.includes(apiKeyId)) {
        return this.isDeviceVerified(apiKeyId, deviceId, config);
      }
      return this.isDeviceVerifiedGlobally(deviceId);
    }

    return this.isDeviceVerified(apiKeyId, deviceId, config);
  }

  // Check if device has a valid PIN on ANY app
  private async isDeviceVerifiedGlobally(deviceId: string): Promise<boolean> {
    const verifiedPin = await prisma.userPin.findFirst({
      where: { deviceId, isUsed: true },
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

  // Check if device has a valid PIN for a specific app
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

    // Never expires
    if (!config || config.expiryMode === 'never') return true;

    // Check if PIN has expired
    if (verifiedPin.expiresAt && new Date() > verifiedPin.expiresAt) {
      await prisma.userPin.delete({ where: { id: verifiedPin.id } });
      return false;
    }

    return true;
  }

  // Create a verification link via the shortener API
  async createVerifyLink(apiKey: string, deviceId: string): Promise<string> {
    const res = await fetch(`${env.SHORTENER_API_URL}/api/v1/adverify/create`, {
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

    return `${env.SHORTENER_FRONTEND_URL}/verify/${data.data.code}`;
  }

  async trackImpression(adId: number, apiKeyId: number, deviceId: string) {
    await prisma.impression.create({ data: { adId, apiKeyId, deviceId } });
  }

  async trackClick(adId: number, apiKeyId: number, deviceId: string) {
    await prisma.click.create({ data: { adId, apiKeyId, deviceId } });
  }
}
