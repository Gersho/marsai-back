import type { RequestHandler } from 'express';
import movieUpdateService from '../services/movie-update.service.js';

const getByToken: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.params;
    const response = await movieUpdateService.getByToken(token as string);
    return res.send(response);
  } catch (e) {
    next(e);
  }
};

const movieUpdateController = {
  getByToken,
};

export default movieUpdateController;
