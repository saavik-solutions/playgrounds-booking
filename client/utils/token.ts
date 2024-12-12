import { jwtDecode } from 'jwt-decode'; 
import Cookies from 'js-cookie'; // Ensure you install this: `npm install js-cookie`
import { API_ENDPOINTS, COOKIES } from '../core/constants';
import { api } from '../services/api';
import { DecodedToken } from '@/core/types/token';
import { TokenError } from '../core/errors/TokenError';

const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as 'strict', // 
  path: '/',
};


// Function to get the access token from Authorization header or cookies
export const getAccessToken = (): string | null => {


  // If token isn't found in the Authorization header, check cookies
  const tokenFromCookie = getTokenFromCookie();

  return tokenFromCookie;
};



// Helper function to get token from cookies
const getTokenFromCookie = (): string | null => {
  return Cookies.get(COOKIES.AUTH_TOKEN) || null;  
};

// Store the refresh token in cookies
export const setRefreshToken = (refreshToken: string): void => {
  Cookies.set(COOKIES.REFRESH_TOKEN, refreshToken, COOKIE_OPTIONS);
};

// Clear the refresh token from cookies
export const clearRefreshToken = (): void => {
  Cookies.remove(COOKIES.REFRESH_TOKEN, { path: COOKIES.DEFAULT_PATH });
};

// Get the refresh token from cookies
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

// Extract roles from the access token
export const getRolesFromToken = (token: string): string[] => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded && decoded.roles) {
      return decoded.roles; // Return the roles array
    } else {
      throw new TokenError('No roles found in the token');
    }
  } catch {
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
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {}, {
      withCredentials: true, // Ensure cookies are sent with the request
    });

    const { accessToken, newRefreshToken } = response.data;
    setRefreshToken(newRefreshToken); // Update the refresh token in cookies
    return accessToken; // Return the new access token
  } catch {
    clearRefreshToken(); // Clear refresh token if the request fails
    throw new TokenError('Failed to refresh token');
  }
};

// Use the access token for API requests
export const setAuthHeader = (token: string): void => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
