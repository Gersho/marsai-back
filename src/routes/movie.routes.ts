import express from 'express';
import movieController from '../controllers/movie.controller.js';
import { validate } from '../middlewares/validate.js';
import { MovieRequestSchema } from '../types/schemas/MovieRequest.schema.js';

const movieRouter = express.Router();

movieRouter.post('/',validate(MovieRequestSchema), movieController.createMovie);

export default movieRouter;
