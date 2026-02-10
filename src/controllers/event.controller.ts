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

const findAll: RequestHandler = async (_, res, next) => {
  try {
    const events = await eventService.findAll();
    return res.json(events);
  } catch (err) {
    next(err);
  }
};

const eventController = { create, findAll };

export default eventController;
