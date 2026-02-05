import express from 'express';
import { validate } from '../middlewares/validate.js';
import eventController from '../controllers/event.controller.js';
import { isLogged } from '../middlewares/is-logged.js';
import { isAdmin } from '../middlewares/is-admin.js';
import { CreateEventRequest } from '../types/schemas/create-event-request.schema.js';

const eventRouter = express.Router();

eventRouter.post(
  '/',
  validate(CreateEventRequest),
  isLogged,
  isAdmin,
  eventController.create,
);

export default eventRouter;
