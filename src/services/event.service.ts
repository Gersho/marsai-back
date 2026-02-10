import eventModel from '../models/event.model.js';
import type { CreateEventRequest } from '../types/schemas/create-event-request.schema.js';
import type { Event } from '../types/interfaces/event.interface.js';

const create = async (body: CreateEventRequest): Promise<void> => {
  await eventModel.create(body);
};

const findAll = async (): Promise<Event[]> => {
  return await eventModel.findAll();
};

const eventService = { create, findAll };

export default eventService;
