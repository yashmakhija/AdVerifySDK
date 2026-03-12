import { Router } from 'express';
import { z } from 'zod';
import { adminAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { AdminController } from '../controllers/admin.controller';

const router = Router();
const ctrl = new AdminController();

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
router.put('/keys/:id', (req, res) => ctrl.updateKey(req, res));
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
      adType: z.enum(['interstitial', 'banner', 'dialog']).optional(),
      buttonText: z.string().optional(),
      priority: z.number().optional(),
    }),
  ),
  (req, res) => ctrl.createAd(req, res),
);
router.put('/ads/:id', (req, res) => ctrl.updateAd(req, res));
router.delete('/ads/:id', (req, res) => ctrl.deleteAd(req, res));

// PIN Config
router.get('/pin/:apiKeyId', (req, res) => ctrl.getPinConfig(req, res));
router.put('/pin/:apiKeyId', (req, res) => ctrl.upsertPinConfig(req, res));

// User PINs
router.get('/user-pins', (req, res) => ctrl.getUserPins(req, res));
router.delete('/user-pins/:id', (req, res) => ctrl.deleteUserPin(req, res));
router.post('/user-pins/revoke', (req, res) => ctrl.revokeDevice(req, res));

export default router;
