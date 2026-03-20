import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { env } from '../config/env';

export class AuthService {
  async login(email: string, password: string, ipAddress: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username: email }],
      },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    // Log login activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'login',
        details: 'User logged in',
        ipAddress,
      },
    });

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: '7d' });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }
}
