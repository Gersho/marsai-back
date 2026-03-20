import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { Role } from '../types/enums/role.enum.js';

/**
 * Must be preceded by isLogged middleware
 */
export const isJury: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user_roles.includes(Role.Jury)) {
    return res.status(403).send({ message: 'Must be a jury' });
  }
  next();
};
