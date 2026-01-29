import type { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import type TokenPayload from '../types/interfaces/token-payload.interface.js';

export const isLogged: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).send({ message: 'Token missing' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    req.user_id = payload.id;
    req.user_roles = payload.roles;
    return next();
  } catch (_) {
    return res.status(403).send({ message: 'Invalid token' });
  }
};
