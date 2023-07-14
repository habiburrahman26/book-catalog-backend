import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/apiError';
import { JwtHelpers } from '../../utils/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ApiError(401, 'Unauthorized');
    }

    // verify token
    try {
      const decoded = JwtHelpers.verifyToken(
        token,
        config.jwt_secret as Secret,
      );

      req.user = decoded;
      next();
    } catch (error) {
      throw new ApiError(403, 'Forbidden');
    }
    
  } catch (err) {
    next(err);
  }
};

export default authenticate;
