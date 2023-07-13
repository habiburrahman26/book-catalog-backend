import ApiError from '../../../errors/apiError';
import AuthModel from './auth.modal';
import { Auth } from './auth.type';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

const registration = async (payload: Auth) => {
  // hash password
  const hashPassword = await bcrypt.hash(payload.password, 10);

  const isUserExist = await AuthModel.findOne({ email: payload.email });

  if (isUserExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'User already exist');
  }

  const createUser = await AuthModel.create({
    email: payload.email,
    password: hashPassword,
  });

  return createUser;
};

export const AuthService = {
  registration,
};
