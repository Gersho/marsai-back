import { Router } from 'express';
import movieUpdateController from '../controllers/movie-update.controller.js';

const movieUpdateRouter = Router();

movieUpdateRouter.get('/:token', movieUpdateController.getByToken);

export default movieUpdateRouter;
