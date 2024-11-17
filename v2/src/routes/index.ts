// src/routes/index.ts

import { Router } from 'express';
import userRoutes from './userRoutes';
import groundRoutes from './groundRoutes';
import bookingRoutes from './bookingRoutes';
import paymentRoutes from './paymentRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/grounds', groundRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);

export default router;
