import httpStatus from 'http-status';
import { PrismaClient, User } from '@prisma/client';
import ApiError from '../utils/ApiError';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Create a new user
 */
const createUser = async (userBody: { email: string; password: string; name: string }): Promise<User> => {
  const existingUser = await prisma.user.findUnique({ where: { email: userBody.email } });
  if (existingUser) {
    throw new ApiError('Email already taken', httpStatus.BAD_REQUEST);
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(userBody.password, 10);
  const user = { ...userBody, password: hashedPassword };

  return prisma.user.create({ data: user });
};

/**
 * Query users with filters and pagination
 */
const queryUsers = async (
  filter: Record<string, any>,
  options: { sortBy?: string; limit?: number; page?: number }
): Promise<{ results: User[]; page: number; limit: number; totalPages: number; totalResults: number }> => {
  const { sortBy, limit = 10, page = 1 } = options;

  const sortOptions = sortBy
    ? { [sortBy.split(':')[0]]: sortBy.split(':')[1] === 'desc' ? 'desc' : 'asc' }
    : {};

  const totalResults = await prisma.user.count({ where: filter });
  const totalPages = Math.ceil(totalResults / limit);

  const results = await prisma.user.findMany({
    where: filter,
    orderBy: sortOptions,
    skip: (page - 1) * limit,
    take: limit,
  });

  return { results, page, limit, totalPages, totalResults };
};

/**
 * Get a user by their ID
 */
const getUserById = async (id: number): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new ApiError('User not found', httpStatus.NOT_FOUND);
  }
  return user;
};

/**
 * Get a user by their email
 */
const getUserByEmail = async (email: string): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError('User not found with this email', httpStatus.NOT_FOUND);
  }
  return user;
};

/**
 * Verify a user's password
 */
const verifyPassword = async (user: User, password: string): Promise<boolean> => {
  if (!user.password) {
    throw new ApiError('User does not have a password set', httpStatus.UNAUTHORIZED);
  }
  return bcrypt.compare(password, user.password);
};

/**
 * Update a user's information by their ID
 */
const updateUserById = async (userId: number, updateBody: { email?: string; name?: string; password?: string }): Promise<User> => {
  const user = await getUserById(userId);

  if (updateBody.email) {
    const existingUser = await prisma.user.findUnique({ where: { email: updateBody.email } });
    if (existingUser && existingUser.id !== userId) {
      throw new ApiError('Email already taken', httpStatus.BAD_REQUEST);
    }
  }

  if (updateBody.password) {
    updateBody.password = await bcrypt.hash(updateBody.password, 10); // Re-hash the password
  }

  return prisma.user.update({
    where: { id: userId },
    data: updateBody,
  });
};

/**
 * Delete a user by their ID
 */
const deleteUserById = async (userId: number): Promise<User> => {
  await getUserById(userId); // Will throw an error if user is not found
  return prisma.user.delete({ where: { id: userId } });
};

export const userService ={
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  verifyPassword,
};
