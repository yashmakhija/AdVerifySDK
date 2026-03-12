import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';

const service = new AdminService();

export class AdminController {
  async getStats(_req: Request, res: Response) {
    const stats = await service.getStats();
    res.json(stats);
  }

  // Keys
  async getKeys(_req: Request, res: Response) {
    const keys = await service.getKeys();
    res.json({ keys });
  }

  async createKey(req: Request, res: Response) {
    const { appName, packageName } = req.body;
    const key = await service.createKey(appName, packageName ?? '');
    res.json(key);
  }

  async updateKey(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const updated = await service.updateKey(id, req.body);
    res.json(updated);
  }

  async deleteKey(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    await service.deleteKey(id);
    res.json({ status: 'deleted' });
  }

  // Ads
  async getAds(_req: Request, res: Response) {
    const ads = await service.getAds();
    res.json({ ads });
  }

  async createAd(req: Request, res: Response) {
    const ad = await service.createAd(req.body);
    res.json(ad);
  }

  async updateAd(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const ad = await service.updateAd(id, req.body);
    res.json(ad);
  }

  async deleteAd(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    await service.deleteAd(id);
    res.json({ status: 'deleted' });
  }

  // PIN Config
  async getPinConfig(req: Request, res: Response) {
    const apiKeyId = parseInt(req.params.apiKeyId, 10);
    const config = await service.getPinConfig(apiKeyId);
    res.json({ config });
  }

  async upsertPinConfig(req: Request, res: Response) {
    const apiKeyId = parseInt(req.params.apiKeyId, 10);
    const config = await service.upsertPinConfig(apiKeyId, req.body);
    res.json(config);
  }

  // User PINs
  async getUserPins(req: Request, res: Response) {
    const apiKeyId = req.query.apiKeyId ? parseInt(req.query.apiKeyId as string, 10) : undefined;
    const pins = await service.getUserPins(apiKeyId);
    res.json({ pins });
  }

  async deleteUserPin(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    await service.deleteUserPin(id);
    res.json({ status: 'deleted' });
  }

  async revokeDevice(req: Request, res: Response) {
    const { apiKeyId, deviceId } = req.body;
    await service.revokeDeviceAccess(apiKeyId, deviceId);
    res.json({ status: 'revoked' });
  }
}
