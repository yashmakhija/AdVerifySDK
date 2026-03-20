import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { adminAuth } from '../middleware/auth';
import { AuthController } from '../controllers/auth.controller';
import { TutorialService } from '../services/tutorial.service';

const router = Router();
const ctrl = new AuthController();
const tutorialService = new TutorialService();

// Public — login with email/username + password
router.post(
  '/login',
  validate(z.object({
    email: z.string().min(1),
    password: z.string().min(1),
  })),
  (req, res) => ctrl.login(req, res),
);

// Protected — requires Bearer token
router.use(adminAuth);

router.get('/me', (req, res) => ctrl.me(req, res));
router.get('/purchases', (req, res) => ctrl.getMyPurchases(req, res));

router.patch(
  '/profile',
  validate(z.object({
    avatar: z.string().url().optional(),
  })),
  (req, res) => ctrl.updateProfile(req, res),
);

router.post(
  '/change-password',
  validate(z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(6),
  })),
  (req, res) => ctrl.changePassword(req, res),
);

// Tutorial — presigned R2 URL (expires in 1 hour)
router.get('/tutorial', async (_req, res) => {
  try {
    const url = await tutorialService.getPresignedUrl();
    res.json({ url });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
