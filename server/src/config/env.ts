import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3042),
  JWT_SECRET: z.string().default('change-me-in-production'),
  ADMIN_EMAIL: z.string().default('admin@adverify.com'),
  ADMIN_USERNAME: z.string().default('admin'),
  ADMIN_PASSWORD: z.string().default('admin123'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  ALLOWED_ORIGINS: z.string().default('').transform((s) => s ? s.split(',').map((o) => o.trim()) : []),
  BASE_URL: z.string().default('https://ads.paidappstore.com'),
  SHORTENER_SECRET: z.string().default('change-me-in-production'),
  SHORTENER_API_URL: z.string().default('https://api.paidappstore.com'),
  SHORTENER_FRONTEND_URL: z.string().default('https://paidappstore.com'),
  // R2 backup config (optional — only needed for db:backup)
  R2_ENDPOINT: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_BUCKET: z.string().default('adverify-backups'),
});

export const env = envSchema.parse(process.env);
