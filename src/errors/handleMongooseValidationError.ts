import mongoose from 'mongoose';
import { ErrorMessage } from '../types/error';

const handleMongooseValidationError = (err: mongoose.Error.ValidationError) => {
  const errors: ErrorMessage[] = Object.values(err.errors).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Validation Error',
    errors,
  };
};

export default handleMongooseValidationError;