import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const service = new UserService();

function paramId(req: Request, name: string): number {
  return parseInt(String(req.params[name]), 10);
}

export class UserController {
  // ─── Users ───

  async getUsers(_req: Request, res: Response) {
    const users = await service.getUsers();
    res.json(users);
  }

  async getUser(req: Request, res: Response) {
    const user = await service.getUserById(paramId(req, 'id'));
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await service.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(409).json({ error: 'Email or username already exists' });
        return;
      }
      throw error;
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await service.updateUser(paramId(req, 'id'), req.body);
      res.json(user);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(409).json({ error: 'Email or username already exists' });
        return;
      }
      throw error;
    }
  }

  async deleteUser(req: Request, res: Response) {
    await service.deleteUser(paramId(req, 'id'));
    res.json({ status: 'deleted' });
  }

  // ─── Plans ───

  async getPlans(_req: Request, res: Response) {
    const plans = await service.getPlans();
    res.json(plans);
  }

  async createPlan(req: Request, res: Response) {
    const plan = await service.createPlan(req.body);
    res.status(201).json(plan);
  }

  async updatePlan(req: Request, res: Response) {
    const plan = await service.updatePlan(paramId(req, 'id'), req.body);
    res.json(plan);
  }

  async deletePlan(req: Request, res: Response) {
    await service.deletePlan(paramId(req, 'id'));
    res.json({ status: 'deleted' });
  }

  // ─── Purchases ───

  async getPurchases(req: Request, res: Response) {
    const userId = req.query.userId ? parseInt(String(req.query.userId), 10) : undefined;
    const purchases = await service.getPurchases(userId);
    res.json(purchases);
  }

  async createPurchase(req: Request, res: Response) {
    try {
      const purchase = await service.createPurchase(req.body);
      res.status(201).json(purchase);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async cancelPurchase(req: Request, res: Response) {
    const purchase = await service.cancelPurchase(paramId(req, 'id'));
    res.json(purchase);
  }

  // ─── Activity Logs ───

  async getActivityLogs(req: Request, res: Response) {
    const userId = req.query.userId ? parseInt(String(req.query.userId), 10) : undefined;
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 100;
    const logs = await service.getActivityLogs(userId, limit);
    res.json(logs);
  }

  // ─── Stats ───

  async getUserStats(_req: Request, res: Response) {
    const stats = await service.getUserStats();
    res.json(stats);
  }
}
