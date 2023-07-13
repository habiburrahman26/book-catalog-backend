import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { StatusCodes } from 'http-status-codes';

const registration = async (req: Request, res: Response) => {
  const { ...userCredential } = req.body;
  const result = await AuthService.registration(userCredential);

  res.status(StatusCodes.CREATED).json({
    message: 'User register successfully',
    status: 'success',
    data: result,
  });
};

export const AuthController = {
  registration,
};
