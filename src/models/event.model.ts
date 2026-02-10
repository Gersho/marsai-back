import db from '../database/connection.js';
import type { CreateEventRequest } from '../types/schemas/create-event-request.schema.js';
import type { Event } from '../types/interfaces/event.interface.js';

const create = async (event: CreateEventRequest): Promise<void> => {
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

const findAll = async (): Promise<Event[]> => {
  const [rows] = await db.query('SELECT * FROM event');
  return rows as Event[];
};

const eventModel = { create, findAll };

export default eventModel;
