import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import sdkRoutes from './routes/sdk.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// API routes
app.use('/api/sdk', sdkRoutes);
app.use('/api/admin', adminRoutes);

app.listen(env.PORT, () => {
  console.log(`AdVerify Server running on http://localhost:${env.PORT}`);
});
