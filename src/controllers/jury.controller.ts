import type { RequestHandler } from 'express';
import juryService from '../services/jury.service.js';
import type { CreateJury, Jury } from '../types/schemas/create-jury.schema.js';

const create: RequestHandler<null, void, CreateJury> = async (
  req,
  res,
  next,
) => {
  try {
    const juries = req.body.juries as Jury[];
    await juryService.addJuries(juries);
    res.send();
  } catch (e) {
    next(e);
  }
};

const findAll: RequestHandler = async (_req, res, next) => {
  try {
    const juries = await juryService.findAll();
    res.send(juries);
  } catch (e) {
    next(e);
  }
};

const juryController = { create, findAll };

export default juryController;
