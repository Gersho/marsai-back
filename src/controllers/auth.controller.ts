import type { RequestHandler } from 'express';
import authService from '../services/auth.service.js';

const login: RequestHandler = async (req, res, next) => {
  try {
    const response = await authService.login(req.body);
    if (!response)
      return res.status(401).send({ message: 'Invalid credentials' });

    return res.send(response);
  } catch (e) {
    next(e);
  }
};

const authController = { login };

export default authController;
