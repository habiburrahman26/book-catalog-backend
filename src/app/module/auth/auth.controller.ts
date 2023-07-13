import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const registration = catchAsync(async (req: Request, res: Response) => {
  const { ...userCredential } = req.body;
  const result = await AuthService.registration(userCredential);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Users register successfully',
    data: result,
  });
});

export const AuthController = {
  registration,
};
