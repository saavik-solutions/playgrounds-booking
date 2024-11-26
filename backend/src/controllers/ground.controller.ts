import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { groundServices } from '../services/ground.service';

/**
 * Create a ground
 */
const createGround = catchAsync(async (req, res) => {
  const ground = await groundServices.createGround(req.body);
  res.status(httpStatus.CREATED).send(ground);
});

/**
 * Add slots to a ground
 */
const addSlotsToGround = catchAsync(async (req, res) => {
  const { groundId, slots } = req.body;
  const result = await groundServices.addSlotsToGround(groundId, slots);
  res.status(httpStatus.CREATED).send(result);
});

/**
 * Get available slots for a ground
 */
const getAvailableSlots = catchAsync(async (req, res) => {
  const { groundId } = req.params;
  const { date } = req.query;

  if (!date) {
    throw new ApiError('Date is required', httpStatus.BAD_REQUEST);
  }

  const availableSlots = await groundServices.getAvailableSlots(Number(groundId), date as string);
  res.status(httpStatus.OK).send(availableSlots);
});

/**
 * Book a slot
 */
const bookSlot = catchAsync(async (req, res) => {
  const booking = await groundServices.bookSlot(req.body);
  res.status(httpStatus.CREATED).send(booking);
});

/**
 * Get all grounds
 */
const getAllGrounds = catchAsync(async (req, res) => {
  const grounds = await groundServices.getAllGrounds();
  res.status(httpStatus.OK).send(grounds);
});

/**
 * Get bookings for a user
 */
const getUserBookings = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const bookings = await groundServices.getUserBookings(Number(userId));
  res.status(httpStatus.OK).send(bookings);
});

/**
 * Export all controllers individually
 */
export const groundController = {
  createGround,
  addSlotsToGround,
  getAvailableSlots,
  bookSlot,
  getAllGrounds,
  getUserBookings,
};
