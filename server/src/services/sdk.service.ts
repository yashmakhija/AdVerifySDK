import crypto from 'crypto';
import { prisma } from '../lib/prisma';

export class SdkService {
  async init(apiKeyId: number, deviceId: string) {
    const [apiKey, pinConfig, existingPin] = await Promise.all([
      prisma.apiKey.findUnique({ where: { id: apiKeyId }, select: { appName: true } }),
      prisma.pinConfig.findUnique({ where: { apiKeyId } }),
      // Check if this device already has a verified PIN
      prisma.userPin.findFirst({ where: { apiKeyId, deviceId, isUsed: true } }),
    ]);

    return {
      appName: apiKey?.appName ?? '',
      pinEnabled: pinConfig?.pinEnabled ?? false,
      pinVerified: !!existingPin,
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

    // Check if device already verified
    const alreadyVerified = await prisma.userPin.findFirst({
      where: { apiKeyId, deviceId, isUsed: true },
    });

    if (alreadyVerified) {
      return { verified: true, message: 'Already verified' };
    }

    // Find matching unused PIN for this device
    const userPin = await prisma.userPin.findFirst({
      where: { apiKeyId, deviceId, pin, isUsed: false },
    });

    if (!userPin) {
      return { verified: false, message: 'Invalid PIN' };
    }

    // Mark PIN as used
    await prisma.userPin.update({
      where: { id: userPin.id },
      data: { isUsed: true, usedAt: new Date() },
    });

    return { verified: true, message: 'PIN verified. App unlocked!' };
  }

  // Generate a unique PIN for a device (called by link shortener webhook)
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

  // Check if device is already unlocked
  async checkStatus(apiKeyId: number, deviceId: string) {
    const verified = await prisma.userPin.findFirst({
      where: { apiKeyId, deviceId, isUsed: true },
    });

    return { unlocked: !!verified };
  }

  async trackImpression(adId: number, apiKeyId: number, deviceId: string) {
    await prisma.impression.create({ data: { adId, apiKeyId, deviceId } });
  }

  async trackClick(adId: number, apiKeyId: number, deviceId: string) {
    await prisma.click.create({ data: { adId, apiKeyId, deviceId } });
  }
}
