import { Response } from 'express';
import { AdminService } from '../services/admin.service';
import { SettingsService } from '../services/settings.service';
import { AdminRequest } from '../types';

const service = new AdminService();
const settingsService = new SettingsService();

function paramId(req: AdminRequest, name: string): number {
  return parseInt(String(req.params[name]), 10);
}

function scope(req: AdminRequest) {
  const user = req.user!;
  return { userId: user.id, role: user.role as 'ADMIN' | 'USER' };
}

export class AdminController {
  async me(req: AdminRequest, res: Response) {
    const user = req.user!;
    res.json({
      authenticated: true,
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      role: user.role,
    });
  }

  async getStats(req: AdminRequest, res: Response) {
    const stats = await service.getStats(scope(req));
    res.json(stats);
  }

  // Keys
  async getKeys(req: AdminRequest, res: Response) {
    const keys = await service.getKeys(scope(req));
    res.json(keys);
  }

  async createKey(req: AdminRequest, res: Response) {
    try {
      const { appName, packageName } = req.body;
      const key = await service.createKey(appName, packageName ?? '', scope(req));
      res.json(key);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateKey(req: AdminRequest, res: Response) {
    try {
      const updated = await service.updateKey(paramId(req, 'id'), req.body, scope(req));
      res.json(updated);
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  }

  async deleteKey(req: AdminRequest, res: Response) {
    try {
      await service.deleteKey(paramId(req, 'id'), scope(req));
      res.json({ status: 'deleted' });
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  }

  // Ads
  async getAds(req: AdminRequest, res: Response) {
    const ads = await service.getAds(scope(req));
    res.json(ads);
  }

  async createAd(req: AdminRequest, res: Response) {
    try {
      const ad = await service.createAd(req.body, scope(req));
      res.json(ad);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateAd(req: AdminRequest, res: Response) {
    try {
      const ad = await service.updateAd(paramId(req, 'id'), req.body, scope(req));
      res.json(ad);
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  }

  async deleteAd(req: AdminRequest, res: Response) {
    try {
      await service.deleteAd(paramId(req, 'id'), scope(req));
      res.json({ status: 'deleted' });
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  }

  // PIN Config
  async listPinConfigs(req: AdminRequest, res: Response) {
    const configs = await service.listPinConfigs(scope(req));
    res.json(configs);
  }

  async savePinConfig(req: AdminRequest, res: Response) {
    try {
      const { apiKeyId, ...data } = req.body;
      const config = await service.upsertPinConfig(apiKeyId, data, scope(req));
      res.json(config);
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  }

  // User PINs
  async getUserPins(req: AdminRequest, res: Response) {
    const apiKeyId = req.query.apiKeyId ? parseInt(String(req.query.apiKeyId), 10) : undefined;
    const pins = await service.getUserPins(scope(req), apiKeyId);
    res.json(pins);
  }

  async deleteUserPin(req: AdminRequest, res: Response) {
    try {
      await service.deleteUserPin(paramId(req, 'id'), scope(req));
      res.json({ status: 'deleted' });
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  }

  async revokeDevice(req: AdminRequest, res: Response) {
    try {
      const { apiKeyId, deviceId } = req.body;
      await service.revokeDeviceAccess(apiKeyId, deviceId, scope(req));
      res.json({ status: 'revoked' });
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  }

  async expirePin(req: AdminRequest, res: Response) {
    try {
      await service.expirePin(paramId(req, 'id'), scope(req));
      res.json({ status: 'expired' });
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  }

  async getPinStats(req: AdminRequest, res: Response) {
    const date = req.query.date ? String(req.query.date) : undefined;
    const stats = await service.getPinStats(scope(req), date);
    res.json(stats);
  }

  async getSettings(_req: AdminRequest, res: Response) {
    const settings = await settingsService.getSettings();
    res.json(settings);
  }

  async updateSettings(req: AdminRequest, res: Response) {
    const settings = await settingsService.updateSettings(req.body);
    res.json(settings);
  }
}
