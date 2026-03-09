import type { RowDataPacket } from 'mysql2';

export default interface JuryInvite extends RowDataPacket {
  email: string;
  token: string;
}
