import { Router } from 'express';
import { z } from 'zod';
import { adminAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { AdminController } from '../controllers/admin.controller';

const router = Router();
const ctrl = new AdminController();

// Auth check — verifies token and returns user info
router.get('/me', adminAuth, (req, res) => ctrl.me(req, res));

router.use(adminAuth);

// Dashboard
router.get('/stats', (req, res) => ctrl.getStats(req, res));

// API Keys
router.get('/keys', (req, res) => ctrl.getKeys(req, res));
router.post(
  '/keys',
  validate(z.object({ appName: z.string().min(1), packageName: z.string().optional() })),
  (req, res) => ctrl.createKey(req, res),
);
router.patch('/keys/:id', (req, res) => ctrl.updateKey(req, res));
router.delete('/keys/:id', (req, res) => ctrl.deleteKey(req, res));

// Ads
router.get('/ads', (req, res) => ctrl.getAds(req, res));
router.post(
  '/ads',
  validate(
    z.object({
      apiKeyId: z.number(),
      title: z.string().min(1),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
      redirectUrl: z.string().optional(),
      adType: z.enum(['fullscreen', 'card', 'banner', 'interstitial', 'dialog']).optional(),
      buttonText: z.string().optional(),
      priority: z.number().optional(),
      maxImpressions: z.number().min(0).optional(),
      broadcastToVerified: z.boolean().optional(),
      targetAudience: z.enum(['all', 'verified', 'unverified']).optional(),
      scheduledAt: z.string().nullable().optional(),
    }),
  ),
  (req, res) => ctrl.createAd(req, res),
);
router.patch('/ads/:id', (req, res) => ctrl.updateAd(req, res));
router.delete('/ads/:id', (req, res) => ctrl.deleteAd(req, res));

// PIN Config
router.get('/pin-config', (req, res) => ctrl.listPinConfigs(req, res));
router.post('/pin-config', (req, res) => ctrl.savePinConfig(req, res));

// User PINs
router.get('/user-pins', (req, res) => ctrl.getUserPins(req, res));
router.get('/user-pins/stats', (req, res) => ctrl.getPinStats(req, res));
router.delete('/user-pins/:id', (req, res) => ctrl.deleteUserPin(req, res));
router.post('/user-pins/revoke', (req, res) => ctrl.revokeDevice(req, res));
router.post('/user-pins/:id/expire', (req, res) => ctrl.expirePin(req, res));

// Settings
router.get('/settings', (req, res) => ctrl.getSettings(req, res));
router.post('/settings', (req, res) => ctrl.updateSettings(req, res));

export default router;
