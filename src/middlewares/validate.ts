import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodError, ZodObject } from 'zod';
import { removeUploads } from '../helpers/remove-uploads.js';

export const validate =
  (schema: ZodObject): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate: Record<string, unknown> = {
        ...(req.body as Record<string, unknown>),
        ...((req.files as Record<string, unknown>) || {}),
      };
      // TODO maybe parse async later
      req.body = schema.parse(dataToValidate);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        removeUploads(req);
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.issues,
        });
      }
      next(error);
    }
  };
