import AppError from '../helpers/AppError.js';
import { isMysqlError } from '../helpers/is-mysql-error.js';
import juryInviteModel from '../models/jury-invite.model.js';
import juryModel from '../models/jury.model.js';
import type { JuryInviteRequest } from '../types/schemas/invite-jury.schema.js';
import emailService from './email.service.js';

const create = async (juryRequest: JuryInviteRequest): Promise<void> => {
  try {
    const juryExist = await juryModel.findInEmails(juryRequest.juries);
    if (juryExist.length > 0) {
      const match = juryExist.filter((j) =>
        juryRequest.juries.some((req) => req.email === j.email),
      );
      throw new AppError(409, 'Email already used', {
        field: 'email',
        value: match[0]?.email,
      });
    }
    const invites = await Promise.all(
      juryRequest.juries.map((req) => {
        const token = crypto.randomUUID() as string;
        return { email: req.email, token };
      }),
    );
    await juryInviteModel.create(invites);
    await emailService.sendJuryInvites(invites);
  } catch (err) {
    if (isMysqlError(err) && err.errno === 1062) {
      const regex = /'([^']+)'/;
      const match = err.sqlMessage.match(regex);
      let email = '';
      if (match) {
        email = match[1] ?? '';
      }
      throw new AppError(409, 'Email already used', {
        field: 'email',
        value: email,
      });
    }
    throw err;
  }
};

const juryInviteService = { create };

export default juryInviteService;
