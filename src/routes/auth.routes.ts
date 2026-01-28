import express from 'express';
import authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { AuthRequest } from '../types/schemas/AuthRequest.schema.js';

const authRouter = express.Router();

authRouter.post('/login', validate(AuthRequest), authController.login);

export default authRouter;
