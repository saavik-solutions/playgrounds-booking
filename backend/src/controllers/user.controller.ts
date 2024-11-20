import { userService } from '../services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const parsedOptions = {
    ...options,
    limit: options.limit ? parseInt(options.limit, 10) : undefined,
    page: options.page ? parseInt(options.page, 10) : undefined,
  };

 const result = await userService.queryUsers(filter, parsedOptions);
  res.send(result);
});

const getUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.userId, 10); // Ensure userId is a number
  if (isNaN(userId)) {
        throw new ApiError( 'Invalid user ID',httpStatus.BAD_REQUEST,);
  }
  const user = await userService.getUserById(userId);
  res.send(user);
});

const updateUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.userId, 10); // Ensure userId is a number
  if (isNaN(userId)) {
    throw new ApiError('Invalid user ID', httpStatus.BAD_REQUEST, );
  }
  const user = await userService.updateUserById(userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.userId, 10); // Ensure userId is a number
  if (isNaN(userId)) {
    throw new ApiError('Invalid user ID', httpStatus.BAD_REQUEST);
  }
  await userService.deleteUserById(userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export const userController= {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
