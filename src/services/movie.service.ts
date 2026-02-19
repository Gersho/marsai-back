import type MovieResponse from '../types/interfaces/MovieResponse.interface.js';
import movieModel from '../models/movie.model.js';
import type { MovieRequest } from '../types/schemas/MovieRequest.schema.js';
import type Movie from '../types/interfaces/Movie.interface.js';
import db from '../database/connection.js';
import collaboratorModel from '../models/collaborator.model.js';
import imageModel from '../models/image.model.js';

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

const deleteMovie = async (id: number): Promise<void> => {
  try {
    await db.beginTransaction();
    await collaboratorModel.deleteMovie(id);
    await imageModel.deleteMovie(id);

    const affectedRows = await movieModel.deleteMovie(id);

    if (affectedRows === 0) {
      await db.rollback();
      const err = new Error('Not Found.');
      err.name = 'NotFoundError';
      throw err;
    }

    await db.commit();
  } catch (err) {
    console.error(err);
    await db.rollback();
    throw err;
  }
};

const movieService = {
  create,
  getAll,
  deleteMovie,
};

export default movieService;
