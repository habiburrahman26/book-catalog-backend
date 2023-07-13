import { AuthController } from './auth.controller';

import express from 'express';

const router = express.Router();

router.post('/auth/registration', AuthController.registration);

export const AuthRouter = router;
