import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import healthRoutes from './routes/health.routes';
import sdkRoutes from './routes/sdk.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// Public health check
app.use('/api', healthRoutes);

// API routes
app.use('/api/sdk', sdkRoutes);
app.use('/api/admin', adminRoutes);

app.listen(env.PORT, () => {
  console.log(`AdVerify Server running on http://localhost:${env.PORT}`);
});
