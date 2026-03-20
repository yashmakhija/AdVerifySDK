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
      role: user.role,
    });
  }
}
