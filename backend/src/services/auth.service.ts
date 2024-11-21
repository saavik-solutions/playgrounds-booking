import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { userService } from '../services'; // Corrected to userService
import { tokenService } from '../services'; // Assuming tokenService is exported
import { TokenTypes } from '../config/token'; // Ensure TokenTypes is properly exported

/**
 * Authenticate a user by email and password
 */
const loginWithEmailAndPassword = async (email: string, password: string) => {
  const user = await userService.getUsersWithPagination({ email }); // Fetch user by email
  if (!user.results.length) {
    throw new ApiError('Invalid email or password', httpStatus.UNAUTHORIZED);
  }

  const isPasswordValid = await bcrypt.compare(password, user.results[0].password); // Using bcrypt to compare hashes
  if (!isPasswordValid) {
    throw new ApiError('Invalid email or password', httpStatus.UNAUTHORIZED);
  }

  return user.results[0]; // Return the authenticated user
};

/**
 * Logout user by blacklisting the refresh token
 */
const logout = async (refreshToken: string) => {
  try {
    const tokenDoc = await tokenService.verifyToken(refreshToken, TokenTypes.REFRESH);
    if (!tokenDoc) {
      throw new ApiError('Token not found', httpStatus.NOT_FOUND);
    }

    // Blacklist the refresh token
    await tokenService.blacklistToken(String(tokenDoc.id)); // Ensure token ID is passed as a string
  } catch (error) {
    throw new ApiError('Error blacklisting token', httpStatus.INTERNAL_SERVER_ERROR);
  }
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

    return tokenService.generateAuthTokens(user); // Generate new access and refresh tokens
  } catch (error) {
    throw new ApiError('Invalid refresh token', httpStatus.UNAUTHORIZED);
  }
};

/**
 * Reset password using a token
 */
const resetPassword = async (resetToken: string, newPassword: string) => {
  try {
    const resetTokenDoc = await tokenService.verifyToken(resetToken, TokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetTokenDoc.userId);

    if (!user) {
      throw new ApiError('User not found', httpStatus.UNAUTHORIZED);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password before saving
    await userService.updateUser(user.id, { password: hashedPassword });
    await tokenService.blacklistToken(String(resetTokenDoc.id)); // Blacklist the reset token
  } catch (error) {
    throw new ApiError('Error resetting password', httpStatus.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Verify email using a token
 */
const verifyEmail = async (verifyEmailToken: string) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, TokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.userId);

    if (!user) {
      throw new ApiError('User not found', httpStatus.UNAUTHORIZED);
    }

    await userService.updateUser(user.id, { isEmailVerified: true }); // Mark email as verified
    await tokenService.blacklistToken(String(verifyEmailTokenDoc.id)); // Blacklist the verification token
  } catch (error) {
    throw new ApiError('Error verifying email', httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const authService = {
  loginWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
