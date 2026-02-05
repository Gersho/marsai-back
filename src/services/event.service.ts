import eventModel from '../models/event.model.js';
import type { CreateEventRequest } from '../types/schemas/create-event-request.schema.js';

const create = async (body: CreateEventRequest): Promise<void> => {
  await eventModel.create(body);
};

const eventService = { create };

export default eventService;
