import type { ResultSetHeader } from 'mysql2';
import db from '../database/connection.js';
import type Jury from '../types/interfaces/jury.interface.js';

const create = async (
  jury: Omit<Jury, 'id'> & { password: string },
): Promise<number> => {
  const [res] = await db.query<ResultSetHeader>(
    'INSERT INTO user (email, firstname, lastname, password) VALUES (?, ?, ?, ?)',
    [jury.email, jury.firstname, jury.lastname, jury.password],
  );

  const juryRoleId = 2;

  await db.query('INSERT INTO role_user (user_id, role_id) VALUES (?, ?)', [
    res.insertId,
    juryRoleId,
  ]);

  await db.commit();

  return res.insertId;
};

const findAll = async (): Promise<Jury[]> => {
  const sql =
    'SELECT u.id, u.email, u.firstname, u.lastname FROM user u JOIN role_user ru ON ru.user_id = u.id WHERE ru.role_id = 2';
  const [juries] = await db.query<Jury[]>(sql);
  return juries;
};

const findById = async (juryId: number): Promise<Jury | null> => {
  const sql =
    'SELECT u.id, u.email, u.firstname, u.lastname FROM user u JOIN role_user ru ON ru.user_id = u.id WHERE ru.role_id = 2 AND id = ?';
  const [result] = await db.query<Jury[]>(sql, [juryId]);
  return result[0] ?? null;
};

const findInEmails = async (juries: { email: string }[]): Promise<Jury[]> => {
  const emails = juries.map((j) => j.email);

  const [res] = await db.query(
    'SELECT id, email FROM user WHERE email IN (?)',
    [emails],
  );

  return res as Jury[];
};

const juryModel = { create, findAll, findById, findInEmails };
export default juryModel;
