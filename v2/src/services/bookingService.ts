// src/services/bookingService.ts

import prisma from '../models/prismaClient';

// Get all bookings (Admin only)
export const getAllBookings = async () => {
  return await prisma.booking.findMany();
};

// Create a new booking (Authenticated users)
export const createBooking = async (data: {
  userId: number;
  groundId: number;
   date: Date; // Booking date
  slot: string; // Time slot, e.g., '6 AM - 9 AM'
}) => {
  return await prisma.booking.create({
    data:{
      userId: data.userId,
groundId: data.groundId,
    date: data.date,
    slot: data.slot,
    }
  });
};

// Update an existing booking (User owns the booking or Admin)
export const updateBooking = async (
  id: number,
  data: {
    date: Date; // Booking date
  slot: string; // Time slot, e.g., '6 AM - 9 AM'
  }
) => {
  return await prisma.booking.update({
    where: { id },
    data,
  });
};

// Delete a booking (User owns the booking or Admin)
export const deleteBooking = async (id: number) => {
  return await prisma.booking.delete({
    where: { id },
  });
};

// Find a booking by ID
export const findBookingById = async (id: number) => {
  return await prisma.booking.findUnique({
    where: { id },
  });
};
