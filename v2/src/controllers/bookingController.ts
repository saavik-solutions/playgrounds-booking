// src/controllers/bookingController.ts

import { Request, Response } from 'express';
import * as bookingService from '../services/bookingService';

// Get all bookings (Admin only)
export const getAllBookings = async (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
};

// Create a new booking (Authenticated users)
export const createBooking = async (req: Request, res: Response) => {
  const { groundId, startTime, endTime } = req.body;

  try {
    const newBooking = await bookingService.createBooking({
      userId: req.user!.userId, // Assuming `userId` is a number
      groundId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Update a booking (User owns the booking or Admin)
export const updateBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { startTime, endTime } = req.body;

  try {
    const booking = await bookingService.findBookingById(Number(id));

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId !== req.user?.userId && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedBooking = await bookingService.updateBooking(Number(id), {
      startTime: startTime ? new Date(startTime) : undefined,
      endTime: endTime ? new Date(endTime) : undefined,
    });

    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

// Delete a booking (User owns the booking or Admin)
export const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const booking = await bookingService.findBookingById(Number(id));

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId !== req.user?.userId && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await bookingService.deleteBooking(Number(id));
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};
