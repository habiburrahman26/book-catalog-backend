import AuthModel from './auth.modal';
import { Auth } from './auth.type';
import bcrypt from 'bcrypt';

const registration = async (payload: Auth) => {
  // hash password
  const hashPassword = await bcrypt.hash(payload.password, 10);

  const createUser = await AuthModel.create({
    email: payload.email,
    password: hashPassword,
  });

  return createUser;
};

export const AuthService = {
  registration,
};
