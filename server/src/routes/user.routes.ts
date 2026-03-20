import { Router } from 'express';
import { z } from 'zod';
import { adminAuth, requireAdmin } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { UserController } from '../controllers/user.controller';

const router = Router();
const ctrl = new UserController();

// All routes require admin auth + admin role
router.use(adminAuth, requireAdmin);

// ─── Users ───
router.get('/users', (req, res) => ctrl.getUsers(req, res));
router.get('/users/:id', (req, res) => ctrl.getUser(req, res));
router.post(
  '/users',
  validate(z.object({
    email: z.string().email(),
    username: z.string().min(3).max(30),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'USER']).optional(),
  })),
  (req, res) => ctrl.createUser(req, res),
);
router.patch(
  '/users/:id',
  validate(z.object({
    email: z.string().email().optional(),
    username: z.string().min(3).max(30).optional(),
    password: z.string().min(6).optional(),
    isActive: z.boolean().optional(),
  })),
  (req, res) => ctrl.updateUser(req, res),
);
router.delete('/users/:id', (req, res) => ctrl.deleteUser(req, res));

// ─── Plans ───

const featureSchema = z.object({
  text: z.string().min(1),
  included: z.boolean(),
  addon: z.string().optional(),
});

router.get('/plans', (req, res) => ctrl.getPlans(req, res));
router.post(
  '/plans',
  validate(z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().min(0),
    originalPrice: z.number().min(0).optional(),
    currency: z.string().optional(),
    durationDays: z.number().min(1),
    badge: z.string().optional(),
    subtitle: z.string().optional(),
    features: z.array(featureSchema).optional(),
    maxApps: z.number().min(1).optional(),
    maxAds: z.number().min(1).optional(),
    maxSpots: z.number().min(1).optional(),
  })),
  (req, res) => ctrl.createPlan(req, res),
);
router.patch(
  '/plans/:id',
  validate(z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    price: z.number().min(0).optional(),
    originalPrice: z.number().min(0).nullable().optional(),
    currency: z.string().optional(),
    durationDays: z.number().min(1).optional(),
    badge: z.string().optional(),
    subtitle: z.string().optional(),
    features: z.array(featureSchema).optional(),
    maxApps: z.number().min(1).optional(),
    maxAds: z.number().min(1).optional(),
    maxSpots: z.number().min(1).nullable().optional(),
    isActive: z.boolean().optional(),
  })),
  (req, res) => ctrl.updatePlan(req, res),
);
router.delete('/plans/:id', (req, res) => ctrl.deletePlan(req, res));

// ─── Purchases ───
router.get('/purchases', (req, res) => ctrl.getPurchases(req, res));
router.post(
  '/purchases',
  validate(z.object({
    userId: z.number(),
    planId: z.number(),
  })),
  (req, res) => ctrl.createPurchase(req, res),
);
router.post('/purchases/:id/cancel', (req, res) => ctrl.cancelPurchase(req, res));

// ─── Activity Logs ───
router.get('/activity-logs', (req, res) => ctrl.getActivityLogs(req, res));

// ─── Stats ───
router.get('/stats', (req, res) => ctrl.getUserStats(req, res));

export default router;
