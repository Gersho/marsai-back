import type { RequestHandler } from 'express';
import eventService from '../services/event.service.js';

const create: RequestHandler = async (req, res, next) => {
  try {
    await eventService.create(req.body);
    return res.status(201).send();
  } catch (err) {
    next(err);
  }
};

const eventController = { create };

export default eventController;
