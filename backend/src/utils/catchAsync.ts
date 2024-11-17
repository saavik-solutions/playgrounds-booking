import { Request, Response, NextFunction } from 'express';
import ApiError from './ApiError';

// This utility wraps async functions to handle errors automatically
const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error) => {
      // Pass the error to the next middleware (error handler)
      next(error);
    });
  };
};

export default catchAsync;
