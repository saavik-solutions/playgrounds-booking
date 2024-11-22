import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import httpStatus from 'http-status';
import { successHandler, errorHandler } from './config/morgan'; 
import compression from 'compression';
import router from './routes'; // Import the router
import ApiError from './utils/ApiError'; // Custom API Error class
import globalErrorHandler from './middlewares/globalErrorHandler';
import {config} from './config/config'
import passport from 'passport';
import { setupJwtStrategy } from './config/passport'

const app: Application = express();

// Middleware
if (config.env !== 'test') {
   app.use(successHandler);
  app.use(errorHandler);
} // Logs HTTP requests
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.options('*', cors());
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(compression()); // Compress response bodies

// Routes
app.use('/api', router);

// jwt authentication
app.use(passport.initialize());

// Setup the JWT strategy
setupJwtStrategy(passport);
// Health check
app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).send({ message: 'API is running' });
});

// Handle 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError('Not Found', httpStatus.NOT_FOUND));
});

// Error handling middleware
app.use(globalErrorHandler);

export default app;
