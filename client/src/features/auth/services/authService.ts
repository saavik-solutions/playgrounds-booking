import { API_ENDPOINTS } from '../../../core/constants';
import { api } from '../../../services/api';
import {

  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from '../types/types';
import {
  AuthResponse
  
} from '../../../core/types/Auth';
import { getRefreshToken, setTokens, clearTokens } from '../../../utils/token';

export const authService = {
  /**
   * Login user
   * @param payload - User credentials
   */
  async login(payload: LoginPayload): Promise<void> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);
    const { accessToken, refreshToken } = response.data;
    setTokens(accessToken, refreshToken); 
  },

  /**
   * Register a new user
   * @param payload - User registration details
   */
  async register(payload: RegisterPayload): Promise<void> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, payload);
    const { accessToken, refreshToken } = response.data;
    setTokens(accessToken, refreshToken); 
  },

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(): Promise<void> {
    const refreshToken = getRefreshToken(); // Get refresh token from cookies
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
    const { accessToken, newRefreshToken } = response.data;
   if (!accessToken || !newRefreshToken) {
        throw new Error('Invalid tokens received');
    }
    setTokens(accessToken, newRefreshToken); 
  },

  /**
   * Logout the user
   */
  async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      clearTokens(); // Clear tokens from cookies
    }
  },
async googleLogin(): Promise<void> {
  try {
    // Redirect user to Google OAuth endpoint in the backend
    const response = await api.get<AuthResponse>(API_ENDPOINTS.AUTH.GOOGLE_LOGIN);

    // Extract tokens from the response
    const { accessToken, refreshToken } = response.data;

    if (!accessToken || !refreshToken) {
      throw new Error("Invalid tokens received from Google Login");
    }

    // Set tokens for future API requests
    setTokens(accessToken, refreshToken);
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred during Google Login"
    );
  }
},

  /**
   * Google Logout
   */
  async googleLogout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.GOOGLE_LOGOUT);
    } finally {
      clearTokens(); // Clear tokens from cookies
    }
  },

  /**
   * Request a password reset link
   * @param payload - User email
   */
  async forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
    await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, payload);
  },

  /**
   * Reset the user's password
   * @param payload - Password reset details
   */
  async resetPassword(payload: ResetPasswordPayload): Promise<void> {
    await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, payload);
  },
};
