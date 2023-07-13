import { ZodError } from 'zod';
import { ErrorMessage } from '../types/error';

const handleZodValidationError = (err: ZodError) => {
  const errors: ErrorMessage[] = err.issues.map(el => {
    return {
      path: el?.path[el.path.length - 1] as string,
      message: el?.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Zod validation Error',
    errors,
  };
};

export default handleZodValidationError;
