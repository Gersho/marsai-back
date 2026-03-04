import type { RowDataPacket } from 'mysql2';

export interface Event extends RowDataPacket {
  id: number;
  slug: string;
  status: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  duration: number;
  location: string;
  is_bookable: boolean;
  capacity: number;
  // from event_translation (via JOIN)
  lang: string;
  title: string;
  description: string;
  // computed
  remaining_seats?: number;
}
