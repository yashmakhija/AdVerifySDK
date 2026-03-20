import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

export class UserService {
  // ─── Users ───

  async getUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        purchases: {
          where: { status: 'active' },
          include: { plan: true },
          orderBy: { purchasedAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        purchases: {
          include: { plan: true },
          orderBy: { purchasedAt: 'desc' },
        },
        activityLogs: {
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
      },
    });
  }

  async createUser(data: {
    email: string;
    username: string;
    password: string;
    role?: 'ADMIN' | 'USER';
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        role: data.role || 'USER',
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'account_created',
        details: `Account created with role ${user.role}`,
      },
    });

    return user;
  }

  async updateUser(id: number, data: {
    email?: string;
    username?: string;
    password?: string;
    isActive?: boolean;
  }) {
    const updateData: any = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    return prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteUser(id: number) {
    return prisma.user.delete({ where: { id } });
  }

  // ─── Plans ───

  async getPlans() {
    return prisma.plan.findMany({
      include: {
        _count: { select: { purchases: true } },
      },
      orderBy: { price: 'asc' },
    });
  }

  async createPlan(data: {
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    currency?: string;
    durationDays: number;
    badge?: string;
    subtitle?: string;
    features?: { text: string; included: boolean; addon?: string }[];
    maxApps?: number;
    maxAds?: number;
    maxSpots?: number;
  }) {
    return prisma.plan.create({ data });
  }

  async updatePlan(id: number, data: {
    name?: string;
    description?: string;
    price?: number;
    originalPrice?: number | null;
    currency?: string;
    durationDays?: number;
    badge?: string;
    subtitle?: string;
    features?: { text: string; included: boolean; addon?: string }[];
    maxApps?: number;
    maxAds?: number;
    maxSpots?: number | null;
    isActive?: boolean;
  }) {
    return prisma.plan.update({ where: { id }, data });
  }

  async deletePlan(id: number) {
    return prisma.plan.delete({ where: { id } });
  }

  // ─── Purchases ───

  async getPurchases(userId?: number) {
    return prisma.purchase.findMany({
      where: userId ? { userId } : {},
      include: {
        user: { select: { id: true, email: true, username: true } },
        plan: true,
      },
      orderBy: { purchasedAt: 'desc' },
    });
  }

  async createPurchase(data: {
    userId: number;
    planId: number;
  }) {
    const plan = await prisma.plan.findUnique({ where: { id: data.planId } });
    if (!plan) throw new Error('Plan not found');

    const now = new Date();
    const expiresAt = new Date(now.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);

    const purchase = await prisma.purchase.create({
      data: {
        userId: data.userId,
        planId: data.planId,
        amount: plan.price,
        purchasedAt: now,
        expiresAt,
      },
      include: { plan: true, user: { select: { id: true, email: true, username: true } } },
    });

    await prisma.activityLog.create({
      data: {
        userId: data.userId,
        action: 'purchase',
        details: `Purchased plan "${plan.name}" for $${plan.price} — expires ${expiresAt.toISOString().split('T')[0]}`,
      },
    });

    return purchase;
  }

  async cancelPurchase(id: number) {
    const purchase = await prisma.purchase.update({
      where: { id },
      data: {
        status: 'cancelled',
        cancelledAt: new Date(),
      },
      include: { plan: true },
    });

    await prisma.activityLog.create({
      data: {
        userId: purchase.userId,
        action: 'plan_cancelled',
        details: `Cancelled plan "${purchase.plan.name}"`,
      },
    });

    return purchase;
  }

  async expireOverduePurchases() {
    const now = new Date();
    const expired = await prisma.purchase.updateMany({
      where: {
        status: 'active',
        expiresAt: { lte: now },
      },
      data: { status: 'expired' },
    });
    return expired.count;
  }

  // ─── Activity Logs ───

  async getActivityLogs(userId?: number, limit = 100) {
    return prisma.activityLog.findMany({
      where: userId ? { userId } : {},
      include: {
        user: { select: { id: true, email: true, username: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  // ─── Stats ───

  async getUserStats() {
    const [totalUsers, activeUsers, totalPurchases, activePurchases, revenue] =
      await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { isActive: true } }),
        prisma.purchase.count(),
        prisma.purchase.count({ where: { status: 'active' } }),
        prisma.purchase.aggregate({
          _sum: { amount: true },
          where: { status: { in: ['active', 'expired'] } },
        }),
      ]);

    return {
      totalUsers,
      activeUsers,
      totalPurchases,
      activePurchases,
      totalRevenue: revenue._sum.amount || 0,
    };
  }
}
