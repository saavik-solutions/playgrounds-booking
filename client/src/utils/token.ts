import { jwtDecode } from 'jwt-decode';
import { TokenError } from '../core/errors/TokenError';
import Cookies from 'js-cookie'; // Ensure you install this: `npm install js-cookie`
import { API_ENDPOINTS,COOKIES } from '../core/constants';
import { api } from '../services/api';
import { DecodedToken } from '@/core/types/token';

const COOKIE_OPTIONS = {
  path: COOKIES.DEFAULT_PATH,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict' as const, 
};

// Set tokens in cookies
export const setTokens = (authToken: string, refreshToken: string): void => {
  Cookies.set(COOKIES.AUTH_TOKEN, authToken, COOKIE_OPTIONS);
  Cookies.set(COOKIES.REFRESH_TOKEN, refreshToken, COOKIE_OPTIONS);
};

// Clear tokens from cookies
export const clearTokens = (): void => {
  Cookies.remove(COOKIES.AUTH_TOKEN, { path: COOKIES.DEFAULT_PATH });
  Cookies.remove(COOKIES.REFRESH_TOKEN, { path: COOKIES.DEFAULT_PATH });
};

// Get access token from cookies
export const getAccessToken = (): string | null => {
  return Cookies.get(COOKIES.AUTH_TOKEN) || null;
};

// Get refresh token from cookies
export const getRefreshToken = (): string | null => {
  return Cookies.get(COOKIES.REFRESH_TOKEN) || null;
};

// Check if a token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};
export const getRolesFromToken = (token: string): string[] => {
  try {
    const decoded = jwtDecode<DecodedToken>(token); // Decode the JWT
    if (decoded && decoded.roles) {
      return decoded.roles; // Return the roles array
    } else {
      throw new TokenError('No roles found in the token');
    }
  } catch  {
    throw new TokenError('Failed to decode token or retrieve roles');
  }
};
// Refresh the access token using the refresh token
export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new TokenError('No refresh token available');
  }

  try {
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
      refreshToken,
    });
    

    const { accessToken, newRefreshToken } = await response.data;
    setTokens(accessToken, newRefreshToken);
    return accessToken;
  } catch  {
    clearTokens();
    throw new TokenError('Failed to refresh token');
  }
};
