import { getRoleFromToken } from '@/utils/token';
import { Dispatch } from '@reduxjs/toolkit';
import { setAuthState, logout, setLoading } from '@/redux/slices/authSlice';
import { AuthResponse } from '@/types';

class AuthService {
  static async handleAuthSuccess(dispatch: Dispatch, data: AuthResponse) {
    try {
      dispatch(setLoading(true));

      const { accessToken, user } = data;

      // Guard Clause: Ensure both accessToken and user exist
      if (!accessToken || !user) {
        throw new Error('Invalid authentication response: Missing access token or user');
      }

      const role = getRoleFromToken(accessToken);
      console.log('Role:', role);

      // Update Redux State
      dispatch(
        setAuthState({
          accessToken,
          role,
          user,
          isAuthenticated: true,
        })
      );

      // Persist token in Local Storage
      localStorage.setItem('accessToken', accessToken);

      return { role, user };
    } catch (error) {
      console.error('Error handling auth success:', error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  static handleLogout(dispatch: Dispatch) {
    // Clear Redux and Local Storage
    dispatch(logout());
    localStorage.removeItem('accessToken');
  }
}

export default AuthService;
