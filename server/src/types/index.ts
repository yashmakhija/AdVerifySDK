import { Request } from 'express';
import { ApiKey } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  apiKeyData?: ApiKey;
}
