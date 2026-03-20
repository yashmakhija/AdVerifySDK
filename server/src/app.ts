import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import healthRoutes from './routes/health.routes';
import sdkRoutes from './routes/sdk.routes';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import userRoutes from './routes/user.routes';
import patcherRoutes from './routes/patcher.routes';
import { seedAdmin } from './lib/seed-admin';

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    const allowed = [
      env.FRONTEND_URL,
      ...env.ALLOWED_ORIGINS,
    ];
    if (allowed.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

// Public health check
app.use('/api', healthRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Auth routes (public login)
app.use('/api/auth', authRoutes);

// API routes
app.use('/api/sdk', sdkRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/patch', patcherRoutes);

// User management routes (admin only)
app.use('/api/admin/manage', userRoutes);

async function start() {
  try {
    await seedAdmin();
  } catch (err) {
    console.error('Failed to seed admin:', err);
  }

  app.listen(env.PORT, () => {
    console.log(`AdVerify Server running on http://localhost:${env.PORT}`);
  });
}

start();
