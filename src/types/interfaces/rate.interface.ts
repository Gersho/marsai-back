import type { RowDataPacket } from 'mysql2';

export default interface Rate extends RowDataPacket {
  id?: number;
  movie_id: number;
  jury_id: number;
  rate: number;
}
