import eventModel from '../models/event.model.js';
import type { CreateEventRequest } from '../types/schemas/create-event-request.schema.js';

const create = async (body: CreateEventRequest) => {
  await eventModel.create(body);
  //   console.log(body.date.getFullYear());
};

const eventService = { create };

export default eventService;
