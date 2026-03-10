import type { RequestHandler } from 'express';
import juryInviteService from '../services/jury-invite.service.js';
import juryInviteModel from '../models/jury-invite.model.js';
import AppError from '../helpers/AppError.js';

const create: RequestHandler = async (req, res, next) => {
  try {
    await juryInviteService.create(req.body);
    res.status(201).send();
  } catch (e) {
    next(e);
  }
};

const getInvite: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token || typeof token !== 'string') {
      throw new AppError(400, 'Invalid token');
    }
    const invite = await juryInviteModel.findByToken(token);
    if (!invite) {
      throw new AppError(404, 'Invite not found');
    }
    res.send(invite);
  } catch (e) {
    next(e);
  }
};

const juryInviteController = { create, getInvite };

export default juryInviteController;
