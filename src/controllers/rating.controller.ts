import type { RequestHandler } from 'express';
import ratingService from '../services/rating.service.js';

const rateMovie: RequestHandler = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const userId = req.user_id;
    await ratingService.rateMovieBySlug(slug as string, userId, req.body);
    return res.status(201).json({ message: 'Rating submitted successfully' });
  } catch (e) {
    next(e);
  }
};

const getRatings: RequestHandler = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const ratings = await ratingService.getRatingsByMovieSlug(slug as string);
    return res.status(200).json(ratings);
  } catch (e) {
    next(e);
  }
};

const ratingController = {
  rateMovie,
  getRatings,
};

export default ratingController;
