import { Schema, model } from 'mongoose';
import { Auth } from './auth.type';

const authSchema = new Schema<Auth>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AuthModel = model<Auth>('Auth', authSchema);

export default AuthModel;