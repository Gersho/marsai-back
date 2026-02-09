import type MovieResponse from '../types/interfaces/MovieResponse.interface.js';
import movieModel from '../models/movie.model.js';
import type { MovieRequest } from '../types/schemas/MovieRequest.schema.js';

const create = async (
  movieRequest: MovieRequest,
): Promise<MovieResponse | null> => {
  const newMovie = await movieModel.createMovie(movieRequest);
  if (!newMovie) {
    return null;
  }
  const response: MovieResponse = {
    movieId: newMovie,
  };
  return response;
};

const movieService = {
  create,
};

export default movieService;
