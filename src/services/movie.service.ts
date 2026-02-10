import type MovieResponse from '../types/interfaces/MovieResponse.interface.js';
import movieModel from '../models/movie.model.js';
import type { MovieRequest } from '../types/schemas/MovieRequest.schema.js';
import type Movie from '../types/interfaces/Movie.interface.js';

const createMovie = async (
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

const getAllMovies = async (): Promise<Movie[] | null>  => {
  const response = await movieModel.getAllMovies();
  if (!response) return null;
  return response;
}
const movieService = {
  createMovie, getAllMovies
};

export default movieService;
