import type { ResultSetHeader } from 'mysql2';
import db from '../database/connection.js';
import type { MovieRequest } from '../types/schemas/MovieRequest.schema.js';
import type Movie from '../types/interfaces/Movie.interface.js';



const createMovie = async (newMovie: MovieRequest): Promise<number | null> => {
  const sql = `INSERT INTO movie (original_title, english_title, youtube_url, cover_image, duration, isHybrid, language, original_synopsis, english_synopsis, creative_process, ia_tools, has_subs, srt, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const [result] = await db.execute<ResultSetHeader>(sql, [
    newMovie.originalTitle,
    newMovie.englishTitle,
    newMovie.youtubeUrl,
    newMovie.coverImage,
    newMovie.duration,
    newMovie.isHybrid,
    newMovie.language,
    newMovie.originalSynopsis,
    newMovie.englishSynopsis,
    newMovie.creativeProcess,
    newMovie.iaTools,
    newMovie.hasSubs,
    newMovie.srt,
    newMovie.status,
  ]);

  return result.insertId;
};

const getAllMovies = async (): Promise<Movie[]> => {
  const sql = "SELECT * FROM movie";
  const [result] = await db.query(sql);
  return result as Movie[];
}

const movieModel = {
  createMovie, getAllMovies
};

export default movieModel;
