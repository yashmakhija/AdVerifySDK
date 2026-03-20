import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { adminAuth } from '../middleware/auth';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const ctrl = new AuthController();

// Public — login with email/username + password
router.post(
  '/login',
  validate(z.object({
    email: z.string().min(1),
    password: z.string().min(1),
  })),
  (req, res) => ctrl.login(req, res),
);

// Protected — get current user info
router.get('/me', adminAuth, (req, res) => ctrl.me(req, res));

export default router;
