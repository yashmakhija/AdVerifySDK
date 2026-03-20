import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'admin123',
      12,
    );
    const admin = await prisma.user.create({
      data: {
        email: process.env.ADMIN_EMAIL || 'admin@adverify.com',
        username: process.env.ADMIN_USERNAME || 'admin',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log(`Admin created: ${admin.email}`);
  } else {
    console.log(`Admin already exists: ${existingAdmin.email}`);
  }

  console.log('Seed complete.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
