import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { adminAuth, requireActivePlan } from '../middleware/auth';
import { AuthController } from '../controllers/auth.controller';
import { TutorialService } from '../services/tutorial.service';
import { UserService } from '../services/user.service';
import { ExpiryService } from '../services/expiry.service';
import { AdminRequest } from '../types';

const router = Router();
const ctrl = new AuthController();
const tutorialService = new TutorialService();
const userService = new UserService();
const expiryService = new ExpiryService();

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

// Plan status — shows expiry warning to user
router.get('/plan-status', async (req, res) => {
  const status = await expiryService.getUserExpiryStatus((req as AdminRequest).user!.id);
  res.json(status);
});

// Announcements — active only
router.get('/announcements', async (_req, res) => {
  const announcements = await userService.getActiveAnnouncements();
  res.json(announcements);
});

// Tutorial — requires active plan
router.get('/tutorial', requireActivePlan, async (_req, res) => {
  try {
    const url = await tutorialService.getPresignedUrl();
    res.json({ url });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
