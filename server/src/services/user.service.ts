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
        avatar: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        purchases: {
          where: { status: 'active' },
          include: {
            plan: true,
            assignedBy: { select: { id: true, email: true, username: true } },
          },
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
        avatar: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        purchases: {
          include: {
            plan: true,
            assignedBy: { select: { id: true, email: true, username: true } },
          },
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
    createdById?: number;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    let adminUsername = 'system';
    if (data.createdById) {
      const admin = await prisma.user.findUnique({ where: { id: data.createdById }, select: { username: true } });
      adminUsername = admin?.username ?? 'unknown';
    }

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
        avatar: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'account_created',
        details: `Account "${user.username}" (${user.role}) created by admin ${adminUsername}`,
      },
    });

    return user;
  }

  async updateUser(id: number, data: {
    email?: string;
    username?: string;
    password?: string;
    avatar?: string;
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
        avatar: true,
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
        assignedBy: { select: { id: true, email: true, username: true } },
      },
      orderBy: { purchasedAt: 'desc' },
    });
  }

  async createPurchase(data: {
    userId: number;
    planId: number;
    assignedById: number;
    note?: string;
  }) {
    const [plan, targetUser, adminUser] = await Promise.all([
      prisma.plan.findUnique({ where: { id: data.planId } }),
      prisma.user.findUnique({ where: { id: data.userId }, select: { username: true, email: true } }),
      prisma.user.findUnique({ where: { id: data.assignedById }, select: { username: true } }),
    ]);

    if (!plan) throw new Error('Plan not found');
    if (!targetUser) throw new Error('User not found');

    const now = new Date();
    const expiresAt = new Date(now.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);

    const purchase = await prisma.purchase.create({
      data: {
        userId: data.userId,
        planId: data.planId,
        assignedById: data.assignedById,
        amount: plan.price,
        note: data.note || '',
        purchasedAt: now,
        expiresAt,
      },
      include: {
        plan: true,
        user: { select: { id: true, email: true, username: true } },
        assignedBy: { select: { id: true, email: true, username: true } },
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: data.userId,
        action: 'plan_assigned',
        details: `Plan "${plan.name}" (${plan.currency}${plan.price}/mo) assigned to ${targetUser.username} by admin ${adminUser?.username ?? 'unknown'} — valid ${now.toISOString().split('T')[0]} to ${expiresAt.toISOString().split('T')[0]}`,
      },
    });

    return purchase;
  }

  async cancelPurchase(id: number, cancelledById: number) {
    const [purchase, adminUser] = await Promise.all([
      prisma.purchase.update({
        where: { id },
        data: { status: 'cancelled', cancelledAt: new Date() },
        include: {
          plan: true,
          user: { select: { username: true } },
        },
      }),
      prisma.user.findUnique({ where: { id: cancelledById }, select: { username: true } }),
    ]);

    await prisma.activityLog.create({
      data: {
        userId: purchase.userId,
        action: 'plan_cancelled',
        details: `Plan "${purchase.plan.name}" cancelled for ${purchase.user.username} by admin ${adminUser?.username ?? 'unknown'}`,
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

  // ─── Announcements ───

  async getAnnouncements() {
    return prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async getActiveAnnouncements() {
    return prisma.announcement.findMany({
      where: { isActive: true },
      select: { id: true, title: true, content: true, type: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createAnnouncement(data: { title: string; content: string; type?: string }) {
    return prisma.announcement.create({ data });
  }

  async deleteAnnouncement(id: number) {
    return prisma.announcement.delete({ where: { id } });
  }
}
