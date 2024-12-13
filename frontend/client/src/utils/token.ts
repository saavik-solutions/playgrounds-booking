

// src/utils/token.ts
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  sub: string;
  role?: string;
  // Add any other expected claims from your JWT
  exp?: number;
  iat?: number;
}

export const getRoleFromToken = (token: string): string | null => {
  try {
    if (!token) {
      console.warn('No token provided to getRoleFromToken');
      return null;
    }

    const decoded: DecodedToken = jwtDecode(token);
    
    // Check if role exists in the decoded token
    if (!decoded.role) {
      console.warn('No role found in decoded token');
      return null;
    }

    return decoded.role;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};