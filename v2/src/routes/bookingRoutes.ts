// src/routes/bookingRoutes.ts

import { Router } from 'express';
import * as bookingController from '../controllers/bookingController';
import { authenticateUser } from '../middlewares/authMiddleware'; // Assuming you have an auth middleware

const router = Router();

// Apply authentication middleware to all booking routes
router.use(authenticateUser);

// Route to get all bookings (Admin only)
router.get('/', bookingController.getAllBookings);

// Route to create a new booking (Authenticated users)
router.post('/', bookingController.createBooking);

// Route to update an existing booking (User owns the booking or Admin)
router.put('/:id', bookingController.updateBooking);

// Route to delete a booking (User owns the booking or Admin)
router.delete('/:id', bookingController.deleteBooking);

export default router;
