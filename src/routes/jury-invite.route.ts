import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { isAdmin } from '../middlewares/is-admin.js';
import { isLogged } from '../middlewares/is-logged.js';
import { JuryInviteRequestSchema } from '../types/schemas/invite-jury.schema.js';
import juryInviteController from '../controllers/jury-invite.controller.js';

const juryInviteRouter = Router();

juryInviteRouter.post(
  '/',
  isLogged,
  isAdmin,
  validate(JuryInviteRequestSchema),
  juryInviteController.create,
);
juryInviteRouter.get('/:token', juryInviteController.getInvite);

export default juryInviteRouter;
