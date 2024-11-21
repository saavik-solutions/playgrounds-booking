import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { userService } from '../services'; // Corrected to userService
import { tokenService } from '../services'; // Assuming tokenService is exported
import { TokenTypes } from '../config/token'; // Ensure TokenTypes is properly exported
import { stringify } from 'querystring';

/**
 * Authenticate a user by email and password
 */
const loginWithEmailAndPassword = async (email: string, password: string) => {
  const user = await userService.getUsersWithPagination({ email }); // Fetch user by email
  if (!user.results.length) {
    throw new ApiError('Invalid email or password', httpStatus.UNAUTHORIZED);
  }

  const isPasswordValid = await userService.isPasswordMatch(password, user.results[0].password);
  if (!isPasswordValid) {
    throw new ApiError('Invalid email or password', httpStatus.UNAUTHORIZED);
  }

  return user.results[0]; // Return the authenticated user
};

/**
 * Logout user by blacklisting the refresh token
 */
const logout = async (refreshToken: string) => {
  const tokenDoc = await tokenService.verifyToken(refreshToken, TokenTypes.REFRESH);
  if (!tokenDoc) {
    throw new ApiError('Token not found', httpStatus.NOT_FOUND);
  }

  await tokenService.blacklistToken(stringify(tokenDoc.id));
};

/**
 * Refresh access token
 */
const refreshAuth = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, TokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.userId);

    if (!user) {
      throw new ApiError('User not found', httpStatus.UNAUTHORIZED);
    }

    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError('Invalid refresh token', httpStatus.UNAUTHORIZED);
  }
};

/**
 * Reset password using a token
 */
const resetPassword = async (resetToken: string, newPassword: string) => {
  const resetTokenDoc = await tokenService.verifyToken(resetToken, TokenTypes.RESET_PASSWORD);
  const user = await userService.getUserById(resetTokenDoc.userId);

  if (!user) {
    throw new ApiError('User not found', httpStatus.UNAUTHORIZED);
  }

  await userService.updateUser(user.id, { password: newPassword });
  await tokenService.blacklistToken(resetTokenDoc.id); // Blacklist the reset token
};

/**
 * Verify email using a token
 */
const verifyEmail = async (verifyEmailToken: string) => {
  const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, TokenTypes.VERIFY_EMAIL);
  const user = await userService.getUserById(verifyEmailTokenDoc.userId);

  if (!user) {
    throw new ApiError('User not found', httpStatus.UNAUTHORIZED);
  }

  await userService.updateUser(user.id, { isEmailVerified: true });
  await tokenService.blacklistToken(verifyEmailTokenDoc.id); // Blacklist the verification token
};

export const authService = {
  loginWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
