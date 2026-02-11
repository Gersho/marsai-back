import express from 'express';
import { validate } from '../middlewares/validate.js';
import subscriberController from '../controllers/subscriber.controller.js';
import {
  SubscribeRequestSchema,
  UnsubscribeRequestSchema,
} from '../types/schemas/subscriber.schema.js';

const subscriberRouter = express.Router();

subscriberRouter.post(
  '/',
  validate(SubscribeRequestSchema),
  subscriberController.subscribe,
);

subscriberRouter.delete(
  '/',
  validate(UnsubscribeRequestSchema),
  subscriberController.unsubscribe,
);

export default subscriberRouter;
