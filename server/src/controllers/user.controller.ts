import { Response } from 'express';
import { UserService } from '../services/user.service';
import { AdminRequest } from '../types';

const service = new UserService();

function paramId(req: AdminRequest, name: string): number {
  return parseInt(String(req.params[name]), 10);
}

export class UserController {
  // ─── Users ───

  async getUsers(_req: AdminRequest, res: Response) {
    const users = await service.getUsers();
    res.json(users);
  }

  async getUser(req: AdminRequest, res: Response) {
    const user = await service.getUserById(paramId(req, 'id'));
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  }

  async createUser(req: AdminRequest, res: Response) {
    try {
      const user = await service.createUser({
        ...req.body,
        createdById: req.user!.id,
      });
      res.status(201).json(user);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(409).json({ error: 'Email or username already exists' });
        return;
      }
      throw error;
    }
  }

  async updateUser(req: AdminRequest, res: Response) {
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

  async deleteUser(req: AdminRequest, res: Response) {
    await service.deleteUser(paramId(req, 'id'));
    res.json({ status: 'deleted' });
  }

  // ─── Plans ───

  async getPlans(_req: AdminRequest, res: Response) {
    const plans = await service.getPlans();
    res.json(plans);
  }

  async createPlan(req: AdminRequest, res: Response) {
    const plan = await service.createPlan(req.body);
    res.status(201).json(plan);
  }

  async updatePlan(req: AdminRequest, res: Response) {
    const plan = await service.updatePlan(paramId(req, 'id'), req.body);
    res.json(plan);
  }

  async deletePlan(req: AdminRequest, res: Response) {
    await service.deletePlan(paramId(req, 'id'));
    res.json({ status: 'deleted' });
  }

  // ─── Purchases ───

  async getPurchases(req: AdminRequest, res: Response) {
    const userId = req.query.userId ? parseInt(String(req.query.userId), 10) : undefined;
    const purchases = await service.getPurchases(userId);
    res.json(purchases);
  }

  async createPurchase(req: AdminRequest, res: Response) {
    try {
      const purchase = await service.createPurchase({
        ...req.body,
        assignedById: req.user!.id,
      });
      res.status(201).json(purchase);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async cancelPurchase(req: AdminRequest, res: Response) {
    const purchase = await service.cancelPurchase(paramId(req, 'id'), req.user!.id);
    res.json(purchase);
  }

  // ─── Activity Logs ───

  async getActivityLogs(req: AdminRequest, res: Response) {
    const userId = req.query.userId ? parseInt(String(req.query.userId), 10) : undefined;
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 100;
    const logs = await service.getActivityLogs(userId, limit);
    res.json(logs);
  }

  // ─── Stats ───

  async getUserStats(_req: AdminRequest, res: Response) {
    const stats = await service.getUserStats();
    res.json(stats);
  }
}
