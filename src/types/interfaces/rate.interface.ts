import type { RowDataPacket } from 'mysql2';

export default interface Rate extends RowDataPacket {
  id?: number;
  movie_id: number;
  user_id: number;
  note: number;
  comment?: string;
  created_at?: Date;
  updated_at?: Date;
}
