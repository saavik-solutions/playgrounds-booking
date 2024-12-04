import { API_ENDPOINTS } from '../../../core/constants';
import { api } from '../../../services/api';
import {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from '../types/types';
import { AuthResponse } from '../../../core/types/Auth';
import {
  setAuthHeader,
  setRefreshToken,
  getRefreshToken,
  clearRefreshToken,
  refreshAccessToken,
} from '../../../utils/token'; // Correct import from token.ts

export const authService = {
  /**
   * Authenticate user and set tokens
   * @param endpoint - API endpoint for authentication
   * @param payload - Request payload
   */
 async authenticate(endpoint: string, payload?: object) {
  try {
    const response = await api.post<AuthResponse>(endpoint, payload);
    const { accessToken, refreshToken } = response.data;

    if (!accessToken || !refreshToken) {
      throw new Error('Invalid tokens received');
    }

    setAuthHeader(accessToken); // Set the authorization header with the access token
    setRefreshToken(refreshToken); // Store refresh token in cookies

    return response.data; // Ensure the response data (including tokens) is returned
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Authentication failed'
    );
  }
},


  /**
   * Login user
   * @param payload - User credentials
   */
async login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await this.authenticate(API_ENDPOINTS.AUTH.LOGIN, payload);
  return response; 
},


  /**
   * Register a new user
   * @param payload - User registration details
   */
  async register(payload: RegisterPayload): Promise<void> {
    await this.authenticate(API_ENDPOINTS.AUTH.REGISTER, payload);
  },

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(): Promise<void> {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const newAccessToken = await refreshAccessToken();
      setAuthHeader(newAccessToken); // Update the authorization header with the new access token
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to refresh access token');
    }
  },

  /**
   * Logout the user
   */
  async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT); // Optionally call an API endpoint for logout
    } finally {
      clearRefreshToken(); // Clear the refresh token on logout
    }
  },

  /**
   * Google Login
   */
  async googleLogin(): Promise<void> {
    await api.get(API_ENDPOINTS.AUTH.GOOGLE_LOGIN);
  },

  /**
   * Google Logout
   */
  async googleLogout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.GOOGLE_LOGOUT);
    } finally {
      clearRefreshToken();  // Clear refresh token after Google logout
    }
  },

  /**
   * Request a password reset link
   * @param payload - User email
   */
  async forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, payload);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to send password reset link'
      );
    }
  },

  /**
   * Reset the user's password
   * @param payload - Password reset details
   */
  async resetPassword(payload: ResetPasswordPayload): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, payload);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to reset password'
      );
    }
  },
};
