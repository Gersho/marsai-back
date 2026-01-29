import type { ErrorRequestHandler } from 'express';
import type ErrorResponse from '../types/interfaces/error-response.interface.js';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req,
  res,
  _next,
) => {
  console.error(err);
  const errResponse: ErrorResponse = {
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Internal serve:r error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  };
  return res.status(500).send(errResponse);
};
