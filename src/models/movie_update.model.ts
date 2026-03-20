import type { ResultSetHeader } from "mysql2";
import db from "../database/connection.js";
import type MovieUpdate from "../types/interfaces/movie-update.interface.js";

const create = async (movieId: number, token: string): Promise<number> => {
    const sql = `INSERT INTO movie_update (movie_id, token) VALUES (?, ?)`;
    const [res] = await db.query<ResultSetHeader>(sql, [movieId, token]);
    return res.insertId;
};

const findByToken = async (token: string): Promise<MovieUpdate | null> => {
  const [res] = await db.query<MovieUpdate[]>(
    'SELECT * FROM movie_update WHERE token = ?',
    [token],
  );
  return res[0] ?? null;
};

const deleteByToken = async (token: string): Promise<number> => {
  const [res] = await db.execute<ResultSetHeader>(
    'DELETE FROM movie_update WHERE token = ?',
    [token],
  );
  return res.affectedRows;
};

const movieUpdateModel = { create, findByToken, deleteByToken }

export default movieUpdateModel;