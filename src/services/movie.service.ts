import type MovieResponse from '../types/interfaces/MovieResponse.interface.js';
import movieModel from '../models/movie.model.js';
import type { MovieRequest } from '../types/schemas/MovieRequest.schema.js';
import type Movie from '../types/interfaces/Movie.interface.js';
import db from '../database/connection.js';
import collaboratorModel from '../models/collaborator.model.js';
import imageModel from '../models/image.model.js';
import AppError from '../helpers/AppError.js';

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

const getAll = async (): Promise<Movie[]> => {
  return await movieModel.getAll();
};
const getById = async (id: number): Promise<Movie> => {
  const movie = await movieModel.getById(id);
  if (!movie) throw new AppError(404, 'film not found')
  return movie
};

const movieService = {
  create,
  getAll,
  getById,
};

export default movieService;
