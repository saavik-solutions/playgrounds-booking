// import { Request, Response, NextFunction } from 'express';
// import httpStatus from 'http-status';
// import userService from '../services/user.service';
// import ApiError from '../utils/ApiError';

// /**
//  * Register a new user
//  */
// export const register = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await userService.createUser(req.body);
//     res.status(httpStatus.CREATED).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Login a user
//  */
// export const login = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userService.getUserByEmail(email);
//     const isPasswordValid = await userService.verifyPassword(user, password);

//     if (!isPasswordValid) {
//       throw new ApiError('Invalid email or password', httpStatus.UNAUTHORIZED);
//     }

//     res.status(httpStatus.OK).json({ message: 'Login successful', user });
//   } catch (error) {
//     next(error);
//   }
// };
