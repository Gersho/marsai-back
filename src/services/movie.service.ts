import type MovieResponse from '../types/interfaces/MovieResponse.interface.js';
import movieModel from '../models/movie.model.js';
import type { MovieRequest } from '../types/schemas/MovieRequest.schema.js';
import type Movie from '../types/interfaces/Movie.interface.js';
import db from '../database/connection.js';
import collaboratorModel from '../models/collaborator.model.js';

const create = async (movieRequest: MovieRequest): Promise<MovieResponse> => {
  try {
    await db.beginTransaction();
    const newMovieId = await movieModel.create(movieRequest);
    await collaboratorModel.createDirector(movieRequest.director, newMovieId);
    await collaboratorModel.create(movieRequest.collaborators, newMovieId);
    await db.commit();
    const response: MovieResponse = {
      movieId: newMovieId,
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
const getById = async (): Promise<Movie[]> => {
  return await movieModel.getById();
};

const movieService = {
  create,
  getAll,
  getById,
};

export default movieService;
