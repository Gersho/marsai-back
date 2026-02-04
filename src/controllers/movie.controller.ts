import type { Request, Response } from 'express';
import movieService from '../services/movie.service.js';

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  const response = await movieService.createMovie(req.body);
  if (!response)
    return res.status(400).send({ message: 'Bad Request' });

  return res.send(response);
};

const movieController = { createMovie };

export default movieController;
