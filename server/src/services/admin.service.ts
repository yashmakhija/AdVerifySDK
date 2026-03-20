import crypto from 'crypto';
import { prisma } from '../lib/prisma';

type UserScope = { userId: number; role: 'ADMIN' | 'USER' };

export class AdminService {
  // Helper — returns key filter based on user role
  private keyFilter(scope: UserScope) {
    return scope.role === 'ADMIN' ? {} : { userId: scope.userId };
  }

  // Helper — get user's key IDs for filtering ads/pins
  private async userKeyIds(scope: UserScope): Promise<number[] | undefined> {
    if (scope.role === 'ADMIN') return undefined; // no filter
    const keys = await prisma.apiKey.findMany({
      where: { userId: scope.userId },
      select: { id: true },
    });
    return keys.map((k) => k.id);
  }

  async getStats(scope: UserScope) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const keyFilter = this.keyFilter(scope);
    const keyIds = await this.userKeyIds(scope);
    const adFilter = keyIds ? { apiKeyId: { in: keyIds } } : {};

    const [totalKeys, totalAds, totalImpressions, totalClicks, todayImpressions, todayClicks, totalPins, usedPins] =
      await Promise.all([
        prisma.apiKey.count({ where: keyFilter }),
        prisma.ad.count({ where: adFilter }),
        prisma.impression.count({ where: adFilter }),
        prisma.click.count({ where: adFilter }),
        prisma.impression.count({ where: { ...adFilter, createdAt: { gte: today } } }),
        prisma.click.count({ where: { ...adFilter, createdAt: { gte: today } } }),
        prisma.userPin.count({ where: keyIds ? { apiKeyId: { in: keyIds } } : {} }),
        prisma.userPin.count({ where: { ...(keyIds ? { apiKeyId: { in: keyIds } } : {}), isUsed: true } }),
      ]);

    const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

    return { totalKeys, totalAds, totalImpressions, totalClicks, todayImpressions, todayClicks, ctr, totalPins, usedPins };
  }

  // ─── API Keys ───

  async getKeys(scope: UserScope) {
    return prisma.apiKey.findMany({
      where: this.keyFilter(scope),
      include: { user: { select: { id: true, username: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createKey(appName: string, packageName: string, scope: UserScope) {
    // Enforce plan limits for non-admin users
    if (scope.role === 'USER') {
      const activePurchase = await prisma.purchase.findFirst({
        where: { userId: scope.userId, status: 'active' },
        include: { plan: true },
      });

      if (activePurchase && activePurchase.plan.maxApps > 0) {
        const currentCount = await prisma.apiKey.count({ where: { userId: scope.userId } });
        if (currentCount >= activePurchase.plan.maxApps) {
          throw new Error(`Plan limit reached: max ${activePurchase.plan.maxApps} apps allowed`);
        }
      }
    }

    const key = crypto.randomBytes(16).toString('hex');

    return prisma.apiKey.create({
      data: {
        key,
        appName,
        packageName,
        userId: scope.role === 'USER' ? scope.userId : null,
        pinConfig: { create: {} },
      },
    });
  }

  async updateKey(id: number, data: { appName?: string; packageName?: string; isActive?: boolean; userId?: number | null }, scope: UserScope) {
    // Verify ownership for non-admin
    if (scope.role === 'USER') {
      const key = await prisma.apiKey.findFirst({ where: { id, userId: scope.userId } });
      if (!key) throw new Error('API key not found');
    }
    return prisma.apiKey.update({ where: { id }, data });
  }

  async deleteKey(id: number, scope: UserScope) {
    if (scope.role === 'USER') {
      const key = await prisma.apiKey.findFirst({ where: { id, userId: scope.userId } });
      if (!key) throw new Error('API key not found');
    }
    return prisma.apiKey.delete({ where: { id } });
  }

  // ─── Ads ───

  async getAds(scope: UserScope) {
    const keyIds = await this.userKeyIds(scope);
    return prisma.ad.findMany({
      where: keyIds ? { apiKeyId: { in: keyIds } } : {},
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
    maxImpressions?: number;
    broadcastToVerified?: boolean;
    targetAudience?: string;
    scheduledAt?: string | null;
  }, scope: UserScope) {
    // Verify user owns the API key
    if (scope.role === 'USER') {
      const key = await prisma.apiKey.findFirst({ where: { id: data.apiKeyId, userId: scope.userId } });
      if (!key) throw new Error('API key not found');

      // Enforce plan ad limits
      const activePurchase = await prisma.purchase.findFirst({
        where: { userId: scope.userId, status: 'active' },
        include: { plan: true },
      });

      if (activePurchase && activePurchase.plan.maxAds > 0) {
        const keyIds = await this.userKeyIds(scope);
        const currentCount = await prisma.ad.count({ where: { apiKeyId: { in: keyIds! } } });
        if (currentCount >= activePurchase.plan.maxAds) {
          throw new Error(`Plan limit reached: max ${activePurchase.plan.maxAds} ads allowed`);
        }
      }
    }

    return prisma.ad.create({ data: {
      ...data,
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
    }});
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
      maxImpressions?: number;
      broadcastToVerified?: boolean;
      targetAudience?: string;
      scheduledAt?: string | null;
    },
    scope: UserScope,
  ) {
    if (scope.role === 'USER') {
      const ad = await prisma.ad.findFirst({ where: { id, apiKey: { userId: scope.userId } } });
      if (!ad) throw new Error('Ad not found');
    }
    const updateData: any = { ...data };
    if (data.scheduledAt !== undefined) {
      updateData.scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : null;
    }
    return prisma.ad.update({ where: { id }, data: updateData });
  }

  async deleteAd(id: number, scope: UserScope) {
    if (scope.role === 'USER') {
      const ad = await prisma.ad.findFirst({ where: { id, apiKey: { userId: scope.userId } } });
      if (!ad) throw new Error('Ad not found');
    }
    return prisma.ad.delete({ where: { id } });
  }

  // ─── PIN Config ───

  async getPinConfig(apiKeyId: number) {
    return prisma.pinConfig.findUnique({ where: { apiKeyId } });
  }

  async listPinConfigs(scope: UserScope) {
    const keyIds = await this.userKeyIds(scope);
    return prisma.pinConfig.findMany({
      where: keyIds ? { apiKeyId: { in: keyIds } } : {},
    });
  }

  async upsertPinConfig(
    apiKeyId: number,
    data: { pinEnabled?: boolean; pinMessage?: string; maxAttempts?: number; getPinUrl?: string; getPinBtnText?: string; enterPinBtnText?: string; expiryMode?: string; expiryHours?: number },
    scope: UserScope,
  ) {
    // Verify ownership
    if (scope.role === 'USER') {
      const key = await prisma.apiKey.findFirst({ where: { id: apiKeyId, userId: scope.userId } });
      if (!key) throw new Error('API key not found');
    }

    const config = await prisma.pinConfig.upsert({
      where: { apiKeyId },
      update: data,
      create: { apiKeyId, ...data },
    });

    if (data.expiryMode === 'duration' && data.expiryHours) {
      const activePinsWithNoExpiry = await prisma.userPin.findMany({
        where: { apiKeyId, isUsed: true, expiresAt: null },
      });

      if (activePinsWithNoExpiry.length > 0) {
        const now = new Date();
        await Promise.all(
          activePinsWithNoExpiry.map((pin) => {
            const baseTime = pin.usedAt || pin.createdAt;
            const expiresAt = new Date(baseTime.getTime() + data.expiryHours! * 60 * 60 * 1000);
            const finalExpiry = expiresAt < now ? now : expiresAt;
            return prisma.userPin.update({
              where: { id: pin.id },
              data: { expiresAt: finalExpiry },
            });
          }),
        );
      }
    }

    if (data.expiryMode === 'never') {
      await prisma.userPin.updateMany({
        where: { apiKeyId, isUsed: true, expiresAt: { not: null } },
        data: { expiresAt: null },
      });
    }

    return config;
  }

  // ─── User PINs ───

  async getUserPins(scope: UserScope, apiKeyId?: number) {
    const keyIds = await this.userKeyIds(scope);
    const where: any = {};
    if (apiKeyId) where.apiKeyId = apiKeyId;
    if (keyIds) where.apiKeyId = apiKeyId ? apiKeyId : { in: keyIds };

    return prisma.userPin.findMany({
      where,
      include: { apiKey: { select: { appName: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  async deleteUserPin(id: number, scope: UserScope) {
    if (scope.role === 'USER') {
      const pin = await prisma.userPin.findFirst({ where: { id, apiKey: { userId: scope.userId } } });
      if (!pin) throw new Error('PIN not found');
    }
    return prisma.userPin.delete({ where: { id } });
  }

  async revokeDeviceAccess(apiKeyId: number, deviceId: string, scope: UserScope) {
    if (scope.role === 'USER') {
      const key = await prisma.apiKey.findFirst({ where: { id: apiKeyId, userId: scope.userId } });
      if (!key) throw new Error('API key not found');
    }
    return prisma.userPin.deleteMany({ where: { apiKeyId, deviceId } });
  }

  async expirePin(id: number, scope: UserScope) {
    if (scope.role === 'USER') {
      const pin = await prisma.userPin.findFirst({ where: { id, apiKey: { userId: scope.userId } } });
      if (!pin) throw new Error('PIN not found');
    }
    return prisma.userPin.update({
      where: { id },
      data: { expiresAt: new Date(), isUsed: true, usedAt: new Date() },
    });
  }

  async getPinStats(scope: UserScope, date?: string) {
    const target = date ? new Date(date) : new Date();
    const dayStart = new Date(target);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const yesterdayStart = new Date(dayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(dayStart);

    const keyIds = await this.userKeyIds(scope);
    const pinFilter = keyIds ? { apiKeyId: { in: keyIds } } : {};

    const [todayGenerated, todayUsed, yesterdayGenerated, yesterdayUsed, totalActive, totalExpired] =
      await Promise.all([
        prisma.userPin.count({ where: { ...pinFilter, createdAt: { gte: dayStart, lt: dayEnd } } }),
        prisma.userPin.count({ where: { ...pinFilter, createdAt: { gte: dayStart, lt: dayEnd }, isUsed: true } }),
        prisma.userPin.count({ where: { ...pinFilter, createdAt: { gte: yesterdayStart, lt: yesterdayEnd } } }),
        prisma.userPin.count({ where: { ...pinFilter, createdAt: { gte: yesterdayStart, lt: yesterdayEnd }, isUsed: true } }),
        prisma.userPin.count({
          where: { ...pinFilter, isUsed: true, OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] },
        }),
        prisma.userPin.count({
          where: { ...pinFilter, isUsed: true, expiresAt: { lte: new Date() } },
        }),
      ]);

    return { date: dayStart.toISOString().split('T')[0], todayGenerated, todayUsed, yesterdayGenerated, yesterdayUsed, totalActive, totalExpired };
  }
}
