/* eslint-disable no-unused-vars */

import { isHttpError } from 'http-errors';
export const errorHandlerMiddleware = (err, req, res, next) => {
  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      error: err,
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
