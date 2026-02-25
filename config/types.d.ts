import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user_id: number;
      user_roles: string[];
      uploadedFiles: Record<string, MulterS3File> = {};
    }
  }
}
