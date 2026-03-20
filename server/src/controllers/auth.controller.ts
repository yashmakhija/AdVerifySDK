import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AdminRequest } from '../types';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const ipAddress = req.ip || req.headers['x-forwarded-for'] as string || '';
      const result = await authService.login(email, password, ipAddress);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

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

  async updateProfile(req: AdminRequest, res: Response) {
    const user = await authService.updateProfile(req.user!.id, req.body);
    res.json(user);
  }

  async getMyPurchases(req: AdminRequest, res: Response) {
    const purchases = await authService.getMyPurchases(req.user!.id);
    res.json(purchases);
  }

  async changePassword(req: AdminRequest, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body;
      await authService.changePassword(req.user!.id, currentPassword, newPassword);
      res.json({ status: 'password_changed' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
