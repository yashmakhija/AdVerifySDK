import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { env } from '../config/env';

const service = new AdminService();

function paramId(req: Request, name: string): number {
  return parseInt(String(req.params[name]), 10);
}

export class AdminController {
  async me(_req: Request, res: Response) {
    res.json({
      authenticated: true,
      username: env.ADMIN_USERNAME,
    });
  }

  async getStats(_req: Request, res: Response) {
    const stats = await service.getStats();
    res.json(stats);
  }

  // Keys
  async getKeys(_req: Request, res: Response) {
    const keys = await service.getKeys();
    res.json(keys);
  }

  async createKey(req: Request, res: Response) {
    const { appName, packageName } = req.body;
    const key = await service.createKey(appName, packageName ?? '');
    res.json(key);
  }

  async updateKey(req: Request, res: Response) {
    const updated = await service.updateKey(paramId(req, 'id'), req.body);
    res.json(updated);
  }

  async deleteKey(req: Request, res: Response) {
    await service.deleteKey(paramId(req, 'id'));
    res.json({ status: 'deleted' });
  }

  // Ads
  async getAds(_req: Request, res: Response) {
    const ads = await service.getAds();
    res.json(ads);
  }

  async createAd(req: Request, res: Response) {
    const ad = await service.createAd(req.body);
    res.json(ad);
  }

  async updateAd(req: Request, res: Response) {
    const ad = await service.updateAd(paramId(req, 'id'), req.body);
    res.json(ad);
  }

  async deleteAd(req: Request, res: Response) {
    await service.deleteAd(paramId(req, 'id'));
    res.json({ status: 'deleted' });
  }

  // PIN Config
  async listPinConfigs(_req: Request, res: Response) {
    const configs = await service.listPinConfigs();
    res.json(configs);
  }

  async savePinConfig(req: Request, res: Response) {
    const { apiKeyId, ...data } = req.body;
    const config = await service.upsertPinConfig(apiKeyId, data);
    res.json(config);
  }

  // User PINs
  async getUserPins(req: Request, res: Response) {
    const apiKeyId = req.query.apiKeyId ? parseInt(String(req.query.apiKeyId), 10) : undefined;
    const pins = await service.getUserPins(apiKeyId);
    res.json(pins);
  }

  async deleteUserPin(req: Request, res: Response) {
    await service.deleteUserPin(paramId(req, 'id'));
    res.json({ status: 'deleted' });
  }

  async revokeDevice(req: Request, res: Response) {
    const { apiKeyId, deviceId } = req.body;
    await service.revokeDeviceAccess(apiKeyId, deviceId);
    res.json({ status: 'revoked' });
  }
}
