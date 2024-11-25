import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

// Centralized error handling middleware
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
   
    error = new ApiError("don't know what's happening", httpStatus.BAD_REQUEST );
  }

  // Log the error (you can add a logging mechanism here)
  console.error(error.stack);

  // Respond to the client
  res.status(error.statusCode).json({
    status: 'error',
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }), // Show stack trace in development
  });
};

export default globalErrorHandler;
