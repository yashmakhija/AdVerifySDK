import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const apiKey = await prisma.apiKey.create({
    data: {
      key: crypto.randomBytes(16).toString('hex'),
      appName: 'Demo App',
      packageName: 'com.adverify.demo',
      pinConfig: {
        create: {
          pinEnabled: false,
          pinCode: '1234',
          pinMessage: 'Enter PIN to continue',
        },
      },
      ads: {
        create: {
          title: 'Welcome Ad',
          description: 'This is a sample ad created by the seed script.',
          adType: 'interstitial',
          buttonText: 'Learn More',
          redirectUrl: 'https://example.com',
        },
      },
    },
  });

  console.log(`Seed complete. API Key: ${apiKey.key}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
