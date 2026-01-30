import db from '../database/connection.js';
import type { CreateEventRequest } from '../types/schemas/create-event-request.schema.js';

const create = async (event: CreateEventRequest) => {
  await db.execute(
    `INSERT INTO event (title, description, status, date, published_at, duration, location) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      event.title,
      event.description,
      'upcoming',
      event.date,
      event.publishedAt,
      event.duration,
      event.location,
    ],
  );
  return;
};

const eventModel = { create };

export default eventModel;
