import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import httpStatus from 'http-status';
import { config } from '../config/config';
import { userService } from '../services';
import { TokenModel } from '../models'; // Adjust this import to match your Prisma setup
import ApiError from '../utils/ApiError';
import { TokenTypes } from '../config/token'; // Ensure TokenTypes is properly exported
import { Prisma, Token } from '@prisma/client'; // Assuming Prisma is used

// Define Prisma's TokenModel interface
interface TokenPayload {
  sub: string; // User ID
  iat: number; // Issued At
  exp: number; // Expiration Time
  type: TokenTypes; // Token Type (ACCESS, REFRESH, etc.)
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
 */
export const generateToken = (
  userId: string,
  expires: Moment,
  type: TokenTypes,
  secret: string = config.jwt.secret
): string => {
  const payload: TokenPayload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token to the database
 */
export const saveToken = async (
  token: string,
  userId: string,
  expires: Moment,
  type: TokenTypes,
  blacklisted: boolean = false
): Promise<Token> => {
  return await TokenModel.createToken(
    Number(userId), // Assuming userId needs to be a number
    token,
    type,
    expires.toDate()
  );
};


/**
 * Verify the validity of a token
 */
export const verifyToken = async (token: string, type: TokenTypes): Promise<Token> => {
  try {
    const payload = jwt.verify(token, config.jwt.secret) as TokenPayload;

    const tokenDoc = await TokenModel.getTokenByUserAndType(Number(payload.sub), type); // Adjust `sub` to number if needed

    if (!tokenDoc || tokenDoc.blacklisted) {
      throw new ApiError('Invalid or expired token', httpStatus.UNAUTHORIZED);
    }

    return tokenDoc;
  } catch (error) {
    throw new ApiError('Invalid or expired token', httpStatus.UNAUTHORIZED);
  }
};


/**
 * Generate authentication tokens (access and refresh tokens)
 */
export const generateAuthTokens = async (user: { id: string }): Promise<AuthTokens> => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');

  const accessToken = generateToken(user.id, accessTokenExpires, TokenTypes.ACCESS);
  const refreshToken = generateToken(user.id, refreshTokenExpires, TokenTypes.REFRESH);

  await saveToken(refreshToken, user.id, refreshTokenExpires, TokenTypes.REFRESH);

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
 */
export const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError('No user found with this email', httpStatus.NOT_FOUND);
  }

  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(String(user.id), expires, TokenTypes.RESET_PASSWORD);

  await saveToken(resetPasswordToken, String(user.id), expires, TokenTypes.RESET_PASSWORD);
  return resetPasswordToken;
};

/**
 * Generate a verify email token
 */
export const generateVerifyEmailToken = async (user: { id: string }): Promise<string> => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user.id, expires, TokenTypes.VERIFY_EMAIL);

  await saveToken(verifyEmailToken, user.id, expires, TokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};
