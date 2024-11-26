import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Create a ground
 */
const createGround = async (data: {
  groundName: string;
  location: string;
  description?: string;
  type: string;
  media?: string;
}) => {
  return await prisma.ground.create({
    data,
  });
};

/**
 * Add slots to a ground
 */
const addSlotsToGround = async (groundId: number, slots: { timeRange: string; price: number }[]) => {
  const slotData = slots.map(slot => ({ ...slot, groundId }));
  return await prisma.slot.createMany({
    data: slotData,
  });
};

/**
 * Get available slots for a ground on a specific date
 */
const getAvailableSlots = async (groundId: number, date: string) => {
  const bookings = await prisma.booking.findMany({
    where: { groundId, date: new Date(date) },
    select: { slotId: true },
  });

  const bookedSlotIds = bookings.map(booking => booking.slotId);

  return await prisma.slot.findMany({
    where: {
      groundId,
      id: { notIn: bookedSlotIds },
    },
  });
};

/**
 * Book a slot
 */
const bookSlot = async (data: {
  userId: number;
  groundId: number;
  slotId: number;
  date: string;
}) => {
  const { userId, groundId, slotId, date } = data;

  // Check if the slot is already booked
  const existingBooking = await prisma.booking.findFirst({
    where: { groundId, slotId, date: new Date(date) },
  });

  if (existingBooking) {
    throw new Error('Slot is already booked');
  }

  return await prisma.booking.create({
    data: {
      userId,
      groundId,
      slotId,
      date: new Date(date),
    },
  });
};

/**
 * Get all grounds
 */
const getAllGrounds = async () => {
  return await prisma.ground.findMany({
    include: {
      slots: true,
      bookings: true,
    },
  });
};

/**
 * Get bookings for a user
 */
const getUserBookings = async (userId: number) => {
  return await prisma.booking.findMany({
    where: { userId },
    include: {
      ground: true,
      slot: true,
    },
  });
};

/**
 * Export all functions as groundServices
 */
export const groundServices = {
  createGround,
  addSlotsToGround,
  getAvailableSlots,
  bookSlot,
  getAllGrounds,
  getUserBookings,
};
