import { jwtDecode } from 'jwt-decode';
import { storage } from './storage';
import { TokenError } from '../../lib/auth/errors';

interface DecodedToken {
  exp: number;
  sub: string;
}

const TOKEN_KEYS = {
  ACCESS: 'access_token',
  REFRESH: 'refresh_token'
} as const;

export const setTokens = (accessToken: string, refreshToken: string): void => {
  storage.set(TOKEN_KEYS.ACCESS, accessToken);
  storage.set(TOKEN_KEYS.REFRESH, refreshToken);
};

export const clearTokens = (): void => {
  storage.remove(TOKEN_KEYS.ACCESS);
  storage.remove(TOKEN_KEYS.REFRESH);
};

export const getAccessToken = (): string | null => {
  return storage.get(TOKEN_KEYS.ACCESS);
};

export const getRefreshToken = (): string | null => {
  return storage.get(TOKEN_KEYS.REFRESH);
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    throw new TokenError('No refresh token available');
  }

  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new TokenError('Failed to refresh token');
    }

    const { accessToken, newRefreshToken } = await response.json();
    setTokens(accessToken, newRefreshToken);
    return accessToken;
  } catch (error) {
    clearTokens();
    throw error;
  }
};