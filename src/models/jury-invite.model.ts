import type { ResultSetHeader } from 'mysql2';
import db from '../database/connection.js';
import type JuryInvite from '../types/interfaces/jury-invite.interface.js';

const create = async (invites: { email: string; token: string }[]) => {
  const dataToInsert = invites.map((i) => Object.values(i));
  const [res] = await db.query<ResultSetHeader>(
    'INSERT INTO jury_invite (email, token) VALUES ?',
    [dataToInsert],
  );
  return res.insertId;
};

const findByToken = async (token: string): Promise<JuryInvite | null> => {
  const [res] = await db.query<JuryInvite[]>(
    'SELECT * FROM jury_invite WHERE token = ?',
    [token],
  );
  return res[0] ?? null;
};

const deleteByEmail = async (email: string): Promise<number> => {
  const [res] = await db.execute<ResultSetHeader>(
    'DELETE FROM jury_invite WHERE email = ?',
    [email],
  );
  return res.affectedRows;
};

const juryInviteModel = { create, findByToken, deleteByEmail };

export default juryInviteModel;
