import type { ResultSetHeader } from 'mysql2';
import db from '../database/connection.js';
import type { MovieRequest } from '../types/schemas/MovieRequest.schema.js';
import type Movie from '../types/interfaces/Movie.interface.js';
import type Rate from '../types/interfaces/rate.interface.js';

const create = async (newMovie: MovieRequest): Promise<number> => {
  const sql = `
    INSERT INTO movie 
    (original_title, english_title, cover_path, duration, is_hybrid, language, original_synopsis, english_synopsis, creative_process, ai_tools, has_subs, video_path) 
    VALUES 
    (:originalTitle, :englishTitle, :coverPath, :duration, :isHybrid, :language, :originalSynopsis, :englishSynopsis, :creativeProcess, :aiTools, :hasSubs, :videoPath)
  `;

  const [result] = await db.execute<ResultSetHeader>(sql, newMovie);

  return result.insertId;
};
const getAll = async (page: number): Promise<Movie[]> => {
  const offset: number = (page - 1) * 20;
  const sql =
    'SELECT m.*, \
                    JSON_OBJECT( \
                        "gender", c.gender,\
                        "firstname", c.firstname,\
                        "lastname", c.lastname\
                      )  AS director\
              FROM movie m \
              INNER JOIN collaborator c ON m.id = c.movie_id \
              WHERE c.contribution = "Director"\
              LIMIT 20 OFFSET ?';

  const [result] = await db.query<Movie[]>(sql, [offset]);
  return result as Movie[];
};

const getById = async (id: number): Promise<Movie | null> => {
  const sql = 'SELECT * FROM movie where id = ?';
  const [result] = await db.query<Movie[]>(sql, [id]);
  return result[0] ?? null;
};

const remove = async (id: number): Promise<number> => {
  const sql = 'DELETE FROM movie WHERE id = :id';

  const [result] = await db.execute<ResultSetHeader>(sql, { id });

  return result.affectedRows;
};

const getRateByMovieIdAndJuryId = async (
  juryId: number,
  movieId: number,
): Promise<Rate[]> => {
  const [result] = await db.execute(
    'SELECT id FROM ratings WHERE jury_id = ? AND movie_id = ?',
    [juryId, movieId],
  );

  return result as Rate[];
};

const updateRateByMovieIdAndJuryId = async (
  juryId: number,
  movieId: number,
  rate: number,
): Promise<number> => {
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE ratings SET rating = ? WHERE jury_id = ? AND movie_id = ?',
    [rate, juryId, movieId],
  );

  return result.affectedRows;
};

const createRate = async (
  juryId: number,
  movieId: number,
  rating: number,
): Promise<number> => {
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO ratings (rating, jury_id, movie_id) VALUES (?, ?, ?)',
    [rating, juryId, movieId],
  );
  return result.insertId;
};

const movieModel = {
  create,
  getAll,
  getById,
  remove,
  getRateByMovieIdAndJuryId,
  updateRateByMovieIdAndJuryId,
  createRate,
};

export default movieModel;
