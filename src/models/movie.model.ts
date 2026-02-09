import type { ResultSetHeader } from 'mysql2';
import db from '../database/connection.js';
import type { MovieRequest } from '../types/schemas/MovieRequest.schema.js';

const createMovie = async (newMovie: MovieRequest): Promise<number | null> => {
  const sql = `
    INSERT INTO movie 
    (original_title, english_title, youtube_url, cover_image, duration, isHybrid, language, original_synopsis, english_synopsis, creative_process, ai_tools, has_subs) 
    VALUES 
    (:originalTitle, :englishTitle, :youtubeUrl, :coverImage, :duration, :isHybrid, :language, :originalSynopsis, :englishSynopsis, :creativeProcess, :aiTools, :hasSubs)
  `;

  const [result] = await db.execute<ResultSetHeader>(sql, newMovie);

  return result.insertId;
};

const movieModel = {
  createMovie,
};

export default movieModel;
