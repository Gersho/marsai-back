import type { RequestHandler } from 'express';
import movieService from '../services/movie.service.js';
import { removeUploads } from '../helpers/remove-uploads.js';

const create: RequestHandler = async (req, res, next) => {
  try {
    const response = await movieService.create(req.body);
    return res.status(201).send(response);
  } catch (e) {
    removeUploads(req);
    next(e);
  }
};

const getAll: RequestHandler = async (_req, res, next) => {
  try {
    const response = await movieService.getAll();
    return res.send(response);
  } catch (e) {
    next(e);
  }
};

const deleteMovie: RequestHandler = async (req, res, next) => {
  try {
    const movieId = Number(req.params.id); 
    // const affectedRows = await movieService.deleteMovie(id);
    
    //   if (affectedRows === 0) {
    //         return res.status(404).json({ 
    //             message: "film not found" 
    //         });
    //     }
        await movieService.deleteMovie(movieId); 

    return res.status(200).json({message: "film delete with success."});
  } catch (e) {
    const error = (e as Error).name; 
    if (error === 'NotFoundError') {
     return res.status(404).json({ 
        message: "film not found" 
      }),
    removeUploads(req),
    next(e);
  }
}};

const movieController = { getAll, create, deleteMovie };

export default movieController;
