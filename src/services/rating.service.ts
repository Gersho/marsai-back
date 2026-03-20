import movieModel from '../models/movie.model.js';
import ratingModel from '../models/rating.model.js';
import AppError from '../helpers/AppError.js';
import type { RatingRequest } from '../types/schemas/rating-request.schema.js';
import type Rate from '../types/interfaces/rate.interface.js';

const rateMovieBySlug = async (
  slug: string,
  userId: number,
  ratingRequest: RatingRequest,
): Promise<void> => {
  const movie = await movieModel.getBySlug(slug);
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

const getRatingsByMovieSlug = async (slug: string): Promise<Rate[]> => {
  const movie = await movieModel.getBySlug(slug);
  if (!movie) {
    throw new AppError(404, 'Movie not found');
  }

  return await ratingModel.findAllByMovieId(movie.id!);
};

const ratingService = {
  rateMovieBySlug,
  getRatingsByMovieSlug,
};

export default ratingService;
