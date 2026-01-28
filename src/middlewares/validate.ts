import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodError, ZodObject } from 'zod';

export const validate =
  (schema: ZodObject): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.issues,
        });
      }
      next(error);
    }
  };
