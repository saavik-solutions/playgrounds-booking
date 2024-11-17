import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import cors from 'cors';
import prisma from '@prisma/client';
import helmet from 'helmet';
import { errorHandler } from './middlewares/globalErrorHandler';

const app = express();
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/api', routes);
app.use(helmet());
app.use(errorHandler);
// Add other routes here

// Global error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message,
    });
});

// Gracefully handle shutdown for Prisma client connection
process.on('SIGTERM', async () => {
    await prisma.$disconnect();
});

export default app;