import { Request, Response } from 'express';
import httpStatus from 'http-status';
import * as userService from '../services/user.service';

export const register = async (req: Request, res: Response) => {
  const user = await userService.registerUser(req.body);
  res.status(httpStatus.CREATED).send(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const isMatch = await userService.verifyPassword(email, password);
  if (!isMatch) {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid email or password' });
  }
  res.status(httpStatus.OK).send({ message: 'Login successful' });
};
