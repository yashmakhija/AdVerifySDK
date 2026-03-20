import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { env } from '../config/env';

export class AuthService {
  async login(email: string, password: string, ipAddress: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username: email }],
      },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'login',
        details: 'User logged in',
        ipAddress,
      },
    });

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: '7d' });

    // Include active plan info in login response
    const activePurchase = await prisma.purchase.findFirst({
      where: { userId: user.id, status: 'active' },
      include: { plan: { select: { id: true, name: true, price: true, currency: true } } },
      orderBy: { expiresAt: 'desc' },
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
      },
      plan: activePurchase ? {
        name: activePurchase.plan.name,
        expiresAt: activePurchase.expiresAt,
      } : null,
    };
  }

  async updateProfile(userId: number, data: { avatar?: string }) {
    return prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, email: true, username: true, avatar: true, role: true },
    });
  }

  async getMyPurchases(userId: number) {
    return prisma.purchase.findMany({
      where: { userId },
      include: {
        plan: true,
        assignedBy: { select: { id: true, username: true } },
      },
      orderBy: { purchasedAt: 'desc' },
    });
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) throw new Error('Current password is incorrect');

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    await prisma.activityLog.create({
      data: {
        userId,
        action: 'password_changed',
        details: `Password changed by user`,
      },
    });
  }
}
