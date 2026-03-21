import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { env } from '../config/env';
import { AuthenticatedRequest, AdminRequest } from '../types';

export async function sdkAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'] as string | undefined;

  if (!apiKey) {
    res.status(401).json({ error: 'API key is required' });
    return;
  }

  const keyData = await prisma.apiKey.findUnique({ where: { key: apiKey, isActive: true, suspendedAt: null } });

  if (!keyData) {
    res.status(403).json({ error: 'Invalid or inactive API key' });
    return;
  }

  req.apiKeyData = keyData;
  next();
}

export async function adminAuth(req: AdminRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { userId: number };
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });

    if (!user || !user.isActive) {
      res.status(403).json({ error: 'Account is inactive or not found' });
      return;
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function requireAdmin(req: AdminRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== 'ADMIN') {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }
  next();
}

export async function requireActivePlan(req: AdminRequest, res: Response, next: NextFunction) {
  const user = req.user!;

  // Admins bypass plan check
  if (user.role === 'ADMIN') {
    next();
    return;
  }

  const activePurchase = await prisma.purchase.findFirst({
    where: { userId: user.id, status: 'active' },
  });

  if (!activePurchase) {
    res.status(403).json({
      error: 'No active plan',
      code: 'PLAN_REQUIRED',
      message: 'You need an active plan to access this feature. Please contact support or subscribe to a plan.',
    });
    return;
  }

  next();
}
