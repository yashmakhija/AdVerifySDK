import { Request } from 'express';
import { ApiKey, User } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  apiKeyData?: ApiKey;
}

export interface AdminRequest extends Request {
  user?: User;
}
