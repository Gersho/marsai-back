import AppError from '../helpers/AppError.js';
import movieUpdateModel from '../models/movie_update.model.js';
import type MovieUpdate from '../types/interfaces/movie-update.interface.js';

const getByToken = async (token: string): Promise<MovieUpdate> => {
  const movieUpdate = await movieUpdateModel.findByToken(token);
  if (!movieUpdate) throw new AppError(404, 'movie update token not found');
  return movieUpdate;
};

const movieUpdateService = {
  getByToken,
};

export default movieUpdateService;
