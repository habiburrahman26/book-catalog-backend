/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ErrorMessage } from '../../types/error';
import { Error } from 'mongoose';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import handleMongooseValidationError from '../../errors/handleMongooseValidationError';
import handleZodValidationError from '../../errors/handleZodValidationError';
import ApiError from '../../errors/apiError';
import config from '../../config';

const handleGlobalError: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: ErrorMessage[] = [];

  if (err instanceof Error.ValidationError) {
    const simplifiedError = handleMongooseValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errors;
  } else if (err instanceof Error.CastError) {
    statusCode = StatusCodes.NOT_ACCEPTABLE;
    message = 'Cast Error';
    errorMessages = [{ path: '', message: `Invalid Id` }];
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errors;
  } else if (err.code === 11000) {
    // Handle MongoDB duplicate key error
    statusCode = StatusCodes.CONFLICT;
    message = 'Duplicate key error';
    errorMessages = [{ path: '', message: 'Duplicate key found' }];
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = err.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env!== 'production' ? err?.stack : undefined,
  });
};

export default handleGlobalError;
