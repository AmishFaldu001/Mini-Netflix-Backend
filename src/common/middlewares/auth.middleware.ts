import { NextFunction, Request, Response } from 'express';
import { appConfig } from '../../config/application.config';
import { CustomHttpError } from '../utils/custom-http-error';
import { jwtVerifyPromisified } from '../utils/promisified-jwt-verify';

/**
 * Middleware function to authenticate requests
 * @param req - Express request object
 * @param _res - Express response object
 * @param next - Express next function
 * @returns next handler with either no response or an unauthorized error
 */
export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const jwtToken = req?.headers?.authorization;
  if (!jwtToken) {
    return next(
      new CustomHttpError({
        statuscode: 401,
        message: 'Not authorized to perform operation',
      }),
    );
  }

  try {
    await jwtVerifyPromisified(jwtToken, appConfig.jwtSecretToken, {
      ignoreExpiration: false,
      ignoreNotBefore: false,
    });
  } catch (error) {
    return next(
      new CustomHttpError({
        statuscode: 401,
        message: 'Invalid token',
      }),
    );
  }

  return next();
};
