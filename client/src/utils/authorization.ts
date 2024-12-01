import { DecodedToken } from '../core/types/token'; 
import { jwtDecode } from 'jwt-decode';
// Function to check if a user has a specific role
export const hasRole = (userRoles: string[], requiredRole: string): boolean => {
  return userRoles.includes(requiredRole);
};

// Function to check if a user has any of the required roles
export const hasAnyRole = (userRoles: string[], requiredRoles: string[]): boolean => {
  return requiredRoles.some((role) => userRoles.includes(role));
};

// Function to decode a JWT and extract roles
export const getRolesFromToken = (token: string): string[] => {
  try {
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
    return decoded.roles || [];
  } catch (error) {
    console.error('Failed to decode token:', error);
    return [];
  }
};
