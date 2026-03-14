import crypto from 'crypto';
import { prisma } from '../lib/prisma';

export class AdminService {
  async getStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalKeys, totalAds, totalImpressions, totalClicks, todayImpressions, todayClicks, totalPins, usedPins] =
      await Promise.all([
        prisma.apiKey.count(),
        prisma.ad.count(),
        prisma.impression.count(),
        prisma.click.count(),
        prisma.impression.count({ where: { createdAt: { gte: today } } }),
        prisma.click.count({ where: { createdAt: { gte: today } } }),
        prisma.userPin.count(),
        prisma.userPin.count({ where: { isUsed: true } }),
      ]);

    const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

    return { totalKeys, totalAds, totalImpressions, totalClicks, todayImpressions, todayClicks, ctr, totalPins, usedPins };
  }

  // ─── API Keys ───

  async getKeys() {
    return prisma.apiKey.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async createKey(appName: string, packageName: string) {
    const key = crypto.randomBytes(16).toString('hex');

    return prisma.apiKey.create({
      data: {
        key,
        appName,
        packageName,
        pinConfig: { create: {} },
      },
    });
  }

  async updateKey(id: number, data: { appName?: string; packageName?: string; isActive?: boolean }) {
    return prisma.apiKey.update({ where: { id }, data });
  }

  async deleteKey(id: number) {
    return prisma.apiKey.delete({ where: { id } });
  }

  // ─── Ads ───

  async getAds() {
    return prisma.ad.findMany({
      include: {
        apiKey: { select: { appName: true } },
        _count: { select: { impressions: true, clicks: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createAd(data: {
    apiKeyId: number;
    title: string;
    description?: string;
    imageUrl?: string;
    redirectUrl?: string;
    adType?: string;
    buttonText?: string;
    priority?: number;
  }) {
    return prisma.ad.create({ data });
  }

  async updateAd(
    id: number,
    data: {
      title?: string;
      description?: string;
      imageUrl?: string;
      redirectUrl?: string;
      adType?: string;
      buttonText?: string;
      isActive?: boolean;
      priority?: number;
    },
  ) {
    return prisma.ad.update({ where: { id }, data });
  }

  async deleteAd(id: number) {
    return prisma.ad.delete({ where: { id } });
  }

  // ─── PIN Config ───

  async getPinConfig(apiKeyId: number) {
    return prisma.pinConfig.findUnique({ where: { apiKeyId } });
  }

  async listPinConfigs() {
    return prisma.pinConfig.findMany();
  }

  async upsertPinConfig(
    apiKeyId: number,
    data: { pinEnabled?: boolean; pinMessage?: string; maxAttempts?: number; getPinUrl?: string; getPinBtnText?: string; expiryMode?: string; expiryHours?: number },
  ) {
    return prisma.pinConfig.upsert({
      where: { apiKeyId },
      update: data,
      create: { apiKeyId, ...data },
    });
  }

  // ─── User PINs ───

  async getUserPins(apiKeyId?: number) {
    return prisma.userPin.findMany({
      where: apiKeyId ? { apiKeyId } : {},
      include: { apiKey: { select: { appName: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  async deleteUserPin(id: number) {
    return prisma.userPin.delete({ where: { id } });
  }

  async revokeDeviceAccess(apiKeyId: number, deviceId: string) {
    return prisma.userPin.deleteMany({ where: { apiKeyId, deviceId } });
  }

  async expirePin(id: number) {
    return prisma.userPin.update({
      where: { id },
      data: { expiresAt: new Date(), isUsed: true, usedAt: new Date() },
    });
  }

  async getPinStats(date?: string) {
    // Parse target date or default to today
    const target = date ? new Date(date) : new Date();
    const dayStart = new Date(target);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    // Yesterday
    const yesterdayStart = new Date(dayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(dayStart);

    const [todayGenerated, todayUsed, yesterdayGenerated, yesterdayUsed, totalActive, totalExpired] =
      await Promise.all([
        prisma.userPin.count({ where: { createdAt: { gte: dayStart, lt: dayEnd } } }),
        prisma.userPin.count({ where: { createdAt: { gte: dayStart, lt: dayEnd }, isUsed: true } }),
        prisma.userPin.count({ where: { createdAt: { gte: yesterdayStart, lt: yesterdayEnd } } }),
        prisma.userPin.count({ where: { createdAt: { gte: yesterdayStart, lt: yesterdayEnd }, isUsed: true } }),
        prisma.userPin.count({
          where: {
            isUsed: true,
            OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
          },
        }),
        prisma.userPin.count({
          where: { isUsed: true, expiresAt: { lte: new Date() } },
        }),
      ]);

    return {
      date: dayStart.toISOString().split('T')[0],
      todayGenerated,
      todayUsed,
      yesterdayGenerated,
      yesterdayUsed,
      totalActive,
      totalExpired,
    };
  }
}
