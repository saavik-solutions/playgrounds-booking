import { PrismaClient, User as PrismaUser } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { paginate } from '../prismaClient'; // Assuming this is a utility function
import ApiError from '../utils/ApiError'; // Importing ApiError

const prisma = new PrismaClient();

// Utility to transform Prisma user data to JSON-safe object
export const toJSON = <T extends Record<string, any>>(data: T): T => {
  const result = { ...data };

  // Remove private fields, such as password
  const privateFields = ['password'];
  privateFields.forEach((field) => delete result[field]);

  // Remove metadata fields if present (e.g., createdAt, updatedAt)
  delete result.createdAt;
  delete result.updatedAt;

  return result;
};

// User-specific functions
const isEmailTaken = async (email: string, excludeUserId?: number): Promise<boolean> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        NOT: excludeUserId ? { id: excludeUserId } : undefined,
      },
    });
    return !!user;
  } catch (error) {
    throw new ApiError('Error checking email availability', httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}): Promise<PrismaUser> => {
  try {
    if (await isEmailTaken(data.email)) {
      throw new ApiError('Email is already taken', 400, undefined, 'EMAIL_TAKEN');
    }

    const hashedPassword = await bcrypt.hash(data.password, 8);
    const createdUser = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return toJSON(createdUser); // Apply toJSON to the created user
  } catch (error) {
    throw new ApiError('Email already taken', httpStatus.BAD_REQUEST);
  }
};

const isPasswordMatch = async (password: string, userPassword: string): Promise<boolean> => {
  try {
    return bcrypt.compare(password, userPassword);
  } catch (error) {
    throw new ApiError('Error comparing passwords', httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getUsersWithPagination = async (
  filter: Record<string, any> = {},
  options: { page?: number; limit?: number; sortBy?: string } = {}
) => {
  try {
    const paginatedUsers = await paginate<PrismaUser>('user', filter, options);
    paginatedUsers.results = paginatedUsers.results.map(toJSON);

    return paginatedUsers;
  } catch (error) {
    throw new ApiError('Error fetching users with pagination', httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getUserById = async (id: number): Promise<PrismaUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new ApiError('User not found', httpStatus.NOT_FOUND);
    }

    return toJSON(user);
  } catch (error) {
    throw new ApiError('Error fetching user by ID', httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const updateUser = async (
  id: number,
  updateData: Partial<{
    name: string;
    email: string;
    password: string;
    role: string;
    isEmailVerified: boolean;  // Add this property
  }>
): Promise<PrismaUser | null> => {
  try {
    if (updateData.email && (await isEmailTaken(updateData.email, id))) {
      throw new ApiError('Email is already taken', httpStatus.BAD_REQUEST);
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 8);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return toJSON(updatedUser);
  } catch (error) {
    throw new ApiError('Error updating user', httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const deleteUser = async (id: number): Promise<void> => {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    throw new ApiError('Error deleting user', httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};
export const userService = {
  isEmailTaken,
  createUser,
  isPasswordMatch,
  getUsersWithPagination,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
