import { NextFunction, Request, Response } from 'express';

export const routeHandlerWrapper = (handlerToExecute) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handlerToExecute(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
