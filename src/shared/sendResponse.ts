import { Response } from 'express';

type ResponseData<T> = {
  success: boolean;
  statusCode: number;
  message: string | undefined;
  data: T | null;
};

const sendResponse = <T>(res: Response, data: ResponseData<T>) => {
  const responseData = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
