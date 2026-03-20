import { prisma } from '../lib/prisma';

const GRACE_PERIOD_DAYS = 3;

export class ExpiryService {
  /**
   * Run periodically (e.g. every hour via cron or on each relevant request).
   * 1. Mark overdue purchases as "expired"
   * 2. Suspend API keys for users with no active purchase (after grace period)
   * 3. Reactivate API keys if user renews
   */
  async processExpirations() {
    const now = new Date();

    // Step 1: Mark overdue purchases as expired
    const expired = await prisma.purchase.updateMany({
      where: {
        status: 'active',
        expiresAt: { lte: now },
      },
      data: { status: 'expired' },
    });

    // Step 2: Find users whose last purchase expired beyond the grace period
    const graceCutoff = new Date(now.getTime() - GRACE_PERIOD_DAYS * 24 * 60 * 60 * 1000);

    const usersWithNoActivePlan = await prisma.user.findMany({
      where: {
        role: 'USER',
        apiKeys: { some: { isActive: true, suspendedAt: null } },
        purchases: {
          none: { status: 'active' },
        },
      },
      select: {
        id: true,
        username: true,
        purchases: {
          where: { status: 'expired' },
          orderBy: { expiresAt: 'desc' },
          take: 1,
          select: { expiresAt: true },
        },
      },
    });

    let suspended = 0;
    for (const user of usersWithNoActivePlan) {
      const lastExpiry = user.purchases[0]?.expiresAt;

      // Only suspend if grace period has passed
      if (lastExpiry && lastExpiry <= graceCutoff) {
        await prisma.apiKey.updateMany({
          where: { userId: user.id, isActive: true, suspendedAt: null },
          data: { isActive: false, suspendedAt: now },
        });

        await prisma.activityLog.create({
          data: {
            userId: user.id,
            action: 'keys_suspended',
            details: `API keys suspended — no active plan (expired ${lastExpiry.toISOString().split('T')[0]}, grace period ended)`,
          },
        });

        suspended++;
      }
    }

    // Step 3: Reactivate keys for users who renewed
    const usersWithRenewedPlan = await prisma.user.findMany({
      where: {
        role: 'USER',
        apiKeys: { some: { isActive: false, suspendedAt: { not: null } } },
        purchases: {
          some: { status: 'active' },
        },
      },
      select: { id: true, username: true },
    });

    let reactivated = 0;
    for (const user of usersWithRenewedPlan) {
      await prisma.apiKey.updateMany({
        where: { userId: user.id, isActive: false, suspendedAt: { not: null } },
        data: { isActive: true, suspendedAt: null },
      });

      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'keys_reactivated',
          details: `API keys reactivated — active plan found`,
        },
      });

      reactivated++;
    }

    return { expired: expired.count, suspended, reactivated };
  }

  /**
   * Check if a specific user has an active plan.
   * Returns the active purchase or null.
   */
  async getUserActivePlan(userId: number) {
    return prisma.purchase.findFirst({
      where: { userId, status: 'active' },
      include: { plan: true },
      orderBy: { expiresAt: 'desc' },
    });
  }

  /**
   * Get expiry status for a user — used by frontend to show warnings.
   */
  async getUserExpiryStatus(userId: number) {
    const activePurchase = await this.getUserActivePlan(userId);

    if (!activePurchase) {
      return { status: 'expired', message: 'No active plan', daysLeft: 0 };
    }

    const now = new Date();
    const daysLeft = Math.ceil((activePurchase.expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      status: daysLeft <= 7 ? 'expiring_soon' : 'active',
      message: daysLeft <= 7 ? `Plan expires in ${daysLeft} day${daysLeft === 1 ? '' : 's'}` : 'Active',
      daysLeft,
      plan: activePurchase.plan,
      expiresAt: activePurchase.expiresAt,
    };
  }
}
