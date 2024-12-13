import { getRoleFromToken } from '@/utils/token';
import { Dispatch } from '@reduxjs/toolkit';
import { setAuthState, logout } from '@/redux/slices/authSlice';
import { AuthResponse, UserRole } from '@/types';

const isValidRole = (role: string): role is UserRole => {
  return ['admin', 'user'].includes(role);
};
class AuthService {
  static async handleAuthSuccess(dispatch: Dispatch, data: AuthResponse) {
    try {
      const role = getRoleFromToken(data.accessToken);
      
     if (!role || !isValidRole(role)) {
      throw new Error('Role not found or invalid in token');
    }

      dispatch(setAuthState({
        accessToken: data.accessToken,
        role,
        user: data.user,
       
      }));

      localStorage.setItem('accessToken', data.accessToken);

      return { role, user: data.user };
    } catch (error) {
      console.error('Error handling auth success:', error);
      throw error;
    }
  }

  static handleLogout(dispatch: Dispatch) {
    dispatch(logout());
    localStorage.removeItem('accessToken');
  }
}
 export default AuthService;