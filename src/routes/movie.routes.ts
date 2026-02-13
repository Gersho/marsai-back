import express from 'express';
import movieController from '../controllers/movie.controller.js';
import { validate } from '../middlewares/validate.js';
import { MovieRequestSchema } from '../types/schemas/MovieRequest.schema.js';
import { upload } from '../middlewares/upload.js';

const movieRouter = express.Router();

movieRouter.get('/', movieController.getAll);
movieRouter.get('/', movieController.getById);
movieRouter.post(
  '/',
  upload,
  validate(MovieRequestSchema),
  movieController.create,
);

export default movieRouter;
