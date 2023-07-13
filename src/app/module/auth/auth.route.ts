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

export const AuthRouter = router;
