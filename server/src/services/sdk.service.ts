import crypto from 'crypto';
import { prisma } from '../lib/prisma';
import { env } from '../config/env';

export class SdkService {
  async init(apiKeyId: number, deviceId: string) {
    const [apiKey, pinConfig] = await Promise.all([
      prisma.apiKey.findUnique({ where: { id: apiKeyId }, select: { appName: true } }),
      prisma.pinConfig.findUnique({ where: { apiKeyId } }),
    ]);

    // Check if device has an active (non-expired) verified PIN
    const pinVerified = await this.isDeviceVerified(apiKeyId, deviceId, pinConfig);

    return {
      appName: apiKey?.appName ?? '',
      pinEnabled: pinConfig?.pinEnabled ?? false,
      pinVerified,
      pinMessage: pinConfig?.pinMessage ?? '',
      maxAttempts: pinConfig?.maxAttempts ?? 3,
      getPinUrl: pinConfig?.getPinUrl ?? '',
      getPinBtnText: pinConfig?.getPinBtnText ?? 'Get PIN',
    };
  }

  async getAds(apiKeyId: number) {
    return prisma.ad.findMany({
      where: { apiKeyId, isActive: true },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        redirectUrl: true,
        adType: true,
        buttonText: true,
        priority: true,
      },
      orderBy: { priority: 'desc' },
    });
  }

  // Verify a per-user PIN (tied to device)
  async verifyPin(apiKeyId: number, deviceId: string, pin: string) {
    const config = await prisma.pinConfig.findUnique({ where: { apiKeyId } });

    if (!config?.pinEnabled) {
      return { verified: true, message: 'PIN not required' };
    }

    // Check if device already has active verification
    if (await this.isDeviceVerified(apiKeyId, deviceId, config)) {
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
    const config = await prisma.pinConfig.findUnique({ where: { apiKeyId } });
    const verified = await this.isDeviceVerified(apiKeyId, deviceId, config);
    return { unlocked: verified };
  }

  // Helper: check if a device has an active (non-expired) verified PIN
  private async isDeviceVerified(
    apiKeyId: number,
    deviceId: string,
    config: { expiryMode: string; expiryHours: number } | null,
  ): Promise<boolean> {
    if (!deviceId) return false;

    const verifiedPin = await prisma.userPin.findFirst({
      where: { apiKeyId, deviceId, isUsed: true },
      orderBy: { usedAt: 'desc' },
    });

    if (!verifiedPin) return false;

    // Never expires
    if (!config || config.expiryMode === 'never') return true;

    // Check if PIN has expired
    if (verifiedPin.expiresAt && new Date() > verifiedPin.expiresAt) {
      // PIN expired — delete it so user can generate a new one
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
