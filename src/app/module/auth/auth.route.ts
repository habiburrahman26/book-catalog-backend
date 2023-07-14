import validationRequest from '../../middleware/validationRequest';
import { AuthController } from './auth.controller';

import express from 'express';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/auth/registration',
  validationRequest(AuthValidation.authSchema),
  AuthController.registration,
);

router.post(
  '/auth/login',
  validationRequest(AuthValidation.authSchema),
  AuthController.login,
);

export const AuthRouter = router;
