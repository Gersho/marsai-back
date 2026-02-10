import type { RequestHandler } from 'express';
import movieService from '../services/movie.service.js';
import { removeUploads } from '../helpers/remove-uploads.js';

const create: RequestHandler = async (req, res, next) => {
  try {
    const response = await movieService.create(req.body);
    if (!response) return res.status(400).send({ message: 'Bad Request' });

    return res.send(response);
  } catch (e) {
    removeUploads(req);
    next(e);
  }
};

const movieController = { create };

export default movieController;
