import type { Request, Response } from 'express';
import authService from '../services/auth.service.js';

const login = async (req: Request, res: Response) => {
  const response = await authService.login(req.body);
  if (!response)
    return res.status(401).send({ message: 'Invalid credentials' });

  return res.send(response);
};

const authController = { login };

export default authController;
