import movieModel from '../models/movie.model.js';
import ratingModel from '../models/rating.model.js';
import AppError from '../helpers/AppError.js';
import type { RatingRequest } from '../types/schemas/rating-request.schema.js';
import type Rate from '../types/interfaces/rate.interface.js';

const rateMovieById = async (
  id: number,
  userId: number,
  ratingRequest: RatingRequest,
): Promise<void> => {
  const movie = await movieModel.getById(id);
  if (!movie) {
    throw new AppError(404, 'Movie not found');
  }

  const existingRating = await ratingModel.getByMovieIdAndUserId(
    userId,
    movie.id!,
  );

  if (existingRating) {
    await ratingModel.update(
      userId,
      movie.id!,
      ratingRequest.note,
      ratingRequest.comment,
    );
  } else {
    await ratingModel.create(
      userId,
      movie.id!,
      ratingRequest.note,
      ratingRequest.comment,
    );
  }
};

const getRatingsByMovieId = async (id: number): Promise<Rate[]> => {
  const movie = await movieModel.getById(id);
  if (!movie) {
    throw new AppError(404, 'Movie not found');
  }

  return await ratingModel.findAllByMovieId(movie.id!);
};

const ratingService = {
  rateMovieById,
  getRatingsByMovieId,
};

export default ratingService;
