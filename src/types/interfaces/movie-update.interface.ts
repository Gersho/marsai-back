import type { RowDataPacket } from 'mysql2';

export default interface MovieUpdate extends RowDataPacket {
  movieId: number;
  token: string;
}
