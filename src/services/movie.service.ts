import type MovieResponse from '../types/interfaces/MovieResponse.interface.js';
import movieModel from '../models/movie.model.js';
import type { MovieRequest } from '../types/schemas/MovieRequest.schema.js';
import type Movie from '../types/interfaces/Movie.interface.js';
import db from '../database/connection.js';
import collaboratorModel from '../models/collaborator.model.js';
import imageModel from '../models/image.model.js';
import AppError from '../helpers/AppError.js';
import type { RatingRequest } from '../types/schemas/rating-request.schema.js';
import juryModel from '../models/jury.model.js';

const create = async (movieRequest: MovieRequest): Promise<MovieResponse> => {
  try {
    await db.beginTransaction();
    const movieId = await movieModel.create(movieRequest);
    await collaboratorModel.createDirector(movieRequest.director, movieId);
    await collaboratorModel.create(movieRequest.collaborators, movieId);
    await imageModel.insertMultiple(movieRequest.stillsPath, movieId);
    await db.commit();
    const response: MovieResponse = {
      movieId: movieId,
    };
    return response;
  } catch (err) {
    console.error(err);
    await db.rollback();
    throw err;
  }
};

const getAll = async (page: number): Promise<Movie[]> => {
  return await movieModel.getAll(page);
};
const getById = async (id: number): Promise<Movie> => {
  const movie = await movieModel.getById(id);
  if (!movie) throw new AppError(404, 'film not found');
  return movie;
};

const remove = async (id: number): Promise<void> => {
  try {
    await db.beginTransaction();
    await collaboratorModel.remove(id);
    await imageModel.remove(id);

    const affectedRows = await movieModel.remove(id);

    if (affectedRows === 0) {
      throw new AppError(404, 'film not found');
    }

    await db.commit();
  } catch (err) {
    console.error(err);
    await db.rollback();
    throw err;
  }
};

const ratingPost = async ({ juryId, movieId, rating }: RatingRequest
) => {

  try {
    const affectedRowsMovie = await movieModel.getById(movieId);
    if (affectedRowsMovie === null) {
      throw new AppError(404, 'film not found');
    }

    const affectedRowsJury = await juryModel.findById(juryId);
    if (affectedRowsJury === null) {
      throw new AppError(404, 'jury not found');
    }

    const [existing] = await movieModel.getRateByMovieIdAndJuryId(juryId, movieId);
    if (existing !== undefined && existing.length > 0 ) {
      await movieModel.updateRateByMovieIdAndJuryId(juryId, movieId, rating)
      return { message: 'Note mise à jour' };
    } else {
      await movieModel.createRate(juryId, movieId, rating);
      return { message: 'Note enregistrée' };
    }

  } catch (err) {
    console.error(err); 
    throw err;
  }
};

const movieService = {
  create,
  ratingPost,
  getAll,
  getById,
  remove,
};

export default movieService;
