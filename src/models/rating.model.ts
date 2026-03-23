import type { ResultSetHeader } from 'mysql2';
import db from '../database/connection.js';
import type Rate from '../types/interfaces/rate.interface.js';

const getByMovieIdAndUserId = async (
  userId: number,
  movieId: number,
): Promise<Rate | null> => {
  const [result] = await db.execute<Rate[]>(
    'SELECT * FROM rating WHERE user_id = ? AND movie_id = ?',
    [userId, movieId],
  );

  return result[0] ?? null;
};

const update = async (
  userId: number,
  movieId: number,
  note: number,
  comment?: string,
): Promise<number> => {
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE rating SET note = ?, comment = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND movie_id = ?',
    [note, comment ?? null, userId, movieId],
  );

  return result.affectedRows;
};

const create = async (
  userId: number,
  movieId: number,
  note: number,
  comment?: string,
): Promise<number> => {
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO rating (note, comment, user_id, movie_id) VALUES (?, ?, ?, ?)',
    [note, comment ?? null, userId, movieId],
  );
  return result.insertId;
};

const findAllByMovieId = async (movieId: number): Promise<Rate[]> => {
  const [result] = await db.query<Rate[]>(
    'SELECT * FROM rating WHERE movie_id = ?',
    [movieId],
  );
  return result;
};

const ratingModel = {
  getByMovieIdAndUserId,
  update,
  create,
  findAllByMovieId,
};

export default ratingModel;
