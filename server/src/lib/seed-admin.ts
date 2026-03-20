import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { env } from '../config/env';

export async function seedAdmin() {
  const existing = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (existing) return;

  const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 12);

  await prisma.user.create({
    data: {
      email: env.ADMIN_EMAIL,
      username: env.ADMIN_USERNAME,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log(`Admin account created: ${env.ADMIN_EMAIL}`);
}
