import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import healthRoutes from './routes/health.routes';
import sdkRoutes from './routes/sdk.routes';
import adminRoutes from './routes/admin.routes';

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

// API routes
app.use('/api/sdk', sdkRoutes);
app.use('/api/admin', adminRoutes);

app.listen(env.PORT, () => {
  console.log(`AdVerify Server running on http://localhost:${env.PORT}`);
});
