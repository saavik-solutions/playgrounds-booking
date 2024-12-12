import {jwtDecode} from 'jwt-decode';

export interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
  type: string;
  role: string;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};
