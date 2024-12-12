import {jwtDecode} from 'jwt-decode';

export const getRoleFromToken = (token: string): string | null => {
  try {
    const decoded: { role?: string } = jwtDecode(token);
    return decoded.role || null;
  } catch {
    return null;
  }
};
