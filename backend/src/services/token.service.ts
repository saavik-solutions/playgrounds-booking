import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import httpStatus from 'http-status';
import config from '../config/config';
import { userService } from '../services';
import { TokenModel } from '../models';
import ApiError from '../utils/ApiError';
import { tokenTypes } from '../config/tokens';
import { ObjectId } from 'mongoose';

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
  type: string;
}

interface AuthTokens {
  access: {
    token: string;
    expires: Date;
  };
  refresh: {
    token: string;
    expires: Date;
  };
}

/**
 * Generate a JWT token
 * @param userId - User ID
 * @param expires - Token expiration time
 * @param type - Type of the token
 * @param secret - Secret key to sign the token
 * @returns A signed JWT token
 */
export const generateToken = (
  userId: ObjectId,
  expires: Moment,
  type: string,
  secret: string = config.jwt.secret
): string => {
  const payload: TokenPayload = {
    sub: userId.toString(),
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token to the database
 * @param token - The JWT token
 * @param userId - Associated user ID
 * @param expires - Expiration time
 * @param type - Type of the token
 * @param blacklisted - Is the token blacklisted
 * @returns The saved token document
 */
export const saveToken = async (
  token: string,
  userId: ObjectId,
  expires: Moment,
  type: string,
  blacklisted: boolean = false
): Promise<typeof TokenModel> => {
  return TokenModel.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
};

/**
 * Verify the validity of a token
 * @param token - The JWT token
 * @param type - Token type
 * @returns The token document if valid
 */
export const verifyToken = async (token: string, type: string): Promise<typeof Token> => {
  try {
    const payload = jwt.verify(token, config.jwt.secret) as TokenPayload;
    const tokenDoc = await TokenModel.findOne({
      token,
      type,
      user: payload.sub,
      blacklisted: false,
    });
    if (!tokenDoc) {
      throw new ApiError('Invalid or expired token',httpStatus.UNAUTHORIZED, );
    }
    return tokenDoc;
  } catch (error) {
    throw new ApiError('Invalid or expired token',httpStatus.UNAUTHORIZED, );
  }
};

/**
 * Generate authentication tokens (access and refresh tokens)
 * @param user - User object
 * @returns An object containing access and refresh tokens
 */
export const generateAuthTokens = async (user: { id: ObjectId }): Promise<AuthTokens> => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');

  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);

  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate a reset password token
 * @param email - User email
 * @returns The reset password token
 */
export const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError('No user found with this email', httpStatus.NOT_FOUND, );
  }

  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);

  await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
  return resetPasswordToken;
};

/**
 * Generate a verify email token
 * @param user - User object
 * @returns The verify email token
 */
export const generateVerifyEmailToken = async (user: { id: ObjectId }): Promise<string> => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);

  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};
