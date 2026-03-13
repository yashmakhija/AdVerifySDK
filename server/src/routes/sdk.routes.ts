import { Router } from 'express';
import { z } from 'zod';
import { sdkAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { SdkController } from '../controllers/sdk.controller';

const router = Router();
const ctrl = new SdkController();

// PUBLIC — called by your link shortener (no SDK auth needed)
router.post(
  '/generate-pin',
  validate(z.object({ apiKey: z.string(), deviceId: z.string() })),
  (req, res) => ctrl.generatePin(req, res),
);

// SDK authenticated routes
router.use(sdkAuth as any);

router.post(
  '/init',
  validate(z.object({ deviceId: z.string().optional() })),
  (req, res) => ctrl.init(req, res),
);

router.get('/ads', (req, res) => ctrl.getAds(req, res));

router.post(
  '/verify-pin',
  validate(z.object({ pin: z.string(), deviceId: z.string() })),
  (req, res) => ctrl.verifyPin(req, res),
);

router.post(
  '/check-status',
  validate(z.object({ deviceId: z.string() })),
  (req, res) => ctrl.checkStatus(req, res),
);

router.post(
  '/create-link',
  validate(z.object({ deviceId: z.string() })),
  (req, res) => ctrl.createLink(req, res),
);

router.post(
  '/impression',
  validate(z.object({ adId: z.number(), deviceId: z.string().optional() })),
  (req, res) => ctrl.trackImpression(req, res),
);

router.post(
  '/click',
  validate(z.object({ adId: z.number(), deviceId: z.string().optional() })),
  (req, res) => ctrl.trackClick(req, res),
);

export default router;
