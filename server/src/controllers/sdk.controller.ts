import { Request, Response } from 'express';
import { SdkService } from '../services/sdk.service';
import { AuthenticatedRequest } from '../types';
import { env } from '../config/env';

const service = new SdkService();

export class SdkController {
  async init(req: AuthenticatedRequest, res: Response) {
    const { deviceId } = req.body;
    const data = await service.init(req.apiKeyData!.id, deviceId ?? '');
    res.json(data);
  }

  async getAds(req: AuthenticatedRequest, res: Response) {
    const deviceId = (req.body?.deviceId || req.query?.deviceId || '') as string;
    const isVerified = req.body?.isVerified ?? true; // default true for backward compat
    const ads = await service.getAds(req.apiKeyData!.id, deviceId, isVerified);
    res.json({ ads });
  }

  async verifyPin(req: AuthenticatedRequest, res: Response) {
    const { pin, deviceId } = req.body;
    const result = await service.verifyPin(req.apiKeyData!.id, deviceId ?? '', pin ?? '');
    res.json(result);
  }

  async checkStatus(req: AuthenticatedRequest, res: Response) {
    const { deviceId } = req.body;
    const result = await service.checkStatus(req.apiKeyData!.id, deviceId ?? '');
    res.json(result);
  }

  // Called by your link shortener when user completes the ad pages
  async generatePin(req: Request, res: Response) {
    // Verify shortener secret — only your shortener backend can call this
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${env.SHORTENER_SECRET}`) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { apiKey, deviceId } = req.body;

    if (!apiKey || !deviceId) {
      res.status(400).json({ error: 'apiKey and deviceId are required' });
      return;
    }

    const keyData = await require('../lib/prisma').prisma.apiKey.findUnique({
      where: { key: apiKey, isActive: true },
    });

    if (!keyData) {
      res.status(403).json({ error: 'Invalid API key' });
      return;
    }

    const pin = await service.generatePin(keyData.id, deviceId);
    res.json({ pin, deviceId });
  }

  // Called by SDK when user taps "Get PIN" — creates shortener link and returns URL
  async createLink(req: AuthenticatedRequest, res: Response) {
    const { deviceId } = req.body;
    if (!deviceId) {
      res.status(400).json({ error: 'deviceId is required' });
      return;
    }

    try {
      const apiKey = await require('../lib/prisma').prisma.apiKey.findUnique({
        where: { id: req.apiKeyData!.id },
        select: { key: true },
      });

      const url = await service.createVerifyLink(apiKey!.key, deviceId);
      res.json({ url });
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'Failed to create link' });
    }
  }

  async trackImpression(req: AuthenticatedRequest, res: Response) {
    const { adId, deviceId } = req.body;
    await service.trackImpression(adId, req.apiKeyData!.id, deviceId ?? '');
    res.json({ status: 'ok' });
  }

  async trackClick(req: AuthenticatedRequest, res: Response) {
    const { adId, deviceId } = req.body;
    await service.trackClick(adId, req.apiKeyData!.id, deviceId ?? '');
    res.json({ status: 'ok' });
  }
}
