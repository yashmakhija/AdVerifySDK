import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { env } from '../config/env';
import { AuthenticatedRequest } from '../types';

export async function sdkAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'] as string | undefined;

  if (!apiKey) {
    res.status(401).json({ error: 'API key is required' });
    return;
  }

  const keyData = await prisma.apiKey.findUnique({ where: { key: apiKey, isActive: true } });

  if (!keyData) {
    res.status(403).json({ error: 'Invalid or inactive API key' });
    return;
  }

  req.apiKeyData = keyData;
  next();
}

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader?.startsWith('Basic ')) {
    res.status(401).json({ error: 'Admin authentication required' });
    return;
  }

  const decoded = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8');
  const [username, password] = decoded.split(':');

  if (username !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) {
    res.status(403).json({ error: 'Invalid admin credentials' });
    return;
  }

  next();
}
