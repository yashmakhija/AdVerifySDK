import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3042),
  ADMIN_USERNAME: z.string().default('admin'),
  ADMIN_PASSWORD: z.string().default('admin123'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  ALLOWED_ORIGINS: z.string().default('').transform((s) => s ? s.split(',').map((o) => o.trim()) : []),
  SHORTENER_SECRET: z.string().default('change-me-in-production'),
  SHORTENER_API_URL: z.string().default('https://api.paidappstore.com'),
  SHORTENER_FRONTEND_URL: z.string().default('https://paidappstore.com'),
});

export const env = envSchema.parse(process.env);
