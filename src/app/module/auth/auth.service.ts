import config from '../../../config';
import ApiError from '../../../errors/apiError';
import { JwtHelpers } from '../../../utils/jwtHelpers';
import AuthModel from './auth.modal';
import { Auth } from './auth.type';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { Secret } from 'jsonwebtoken';

const registration = async (payload: Auth) => {
  // hash password
  const hashPassword = await bcrypt.hash(payload.password, 10);

  //check user email is exist
  const isUserExist = await AuthModel.findOne({ email: payload.email });
  if (isUserExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'User already exist');
  }

  const createUser = await AuthModel.create({
    email: payload.email,
    password: hashPassword,
  });

  // Exclude password from the returned user object
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = createUser.toObject();

  return userWithoutPassword;
};

const login = async (payload: Auth) => {
  const { email, password } = payload;

  //check user  exist
  const isUserExist = await AuthModel.findOne({ email });

  if (!isUserExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'User not found');
  }

  const checkPassword = await bcrypt.compare(password, isUserExist.password);

  if (!checkPassword) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid password');
  }

  const token = JwtHelpers.createToken(
    { id: isUserExist._id, email },
    config.jwt_secret as Secret,
    config.jwt_expire_in as string,
  );

  return token;
};

export const AuthService = {
  registration,
  login,
};
