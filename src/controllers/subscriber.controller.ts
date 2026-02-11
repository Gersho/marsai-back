import type { RequestHandler } from 'express';
import subscriberModel from '../models/subscriber.model.js';

const subscribe: RequestHandler = async (req, res, next) => {
  try {
    await subscriberModel.subscribe(req.body);
    res.send();
  } catch (e) {
    next(e);
  }
};

const unsubscribe: RequestHandler = async (req, res, next) => {
  try {
    await subscriberModel.unsubscribe(req.body);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

const subscriberController = { subscribe, unsubscribe };

export default subscriberController;
