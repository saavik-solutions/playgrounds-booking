import { API_ENDPOINTS } from "@/core/constants";
import  { apiInstance } from "@/services/api";

const isDevelopment = process.env.NODE_ENV === 'development';

export const forgotPassword = async (email: string) => {
  try {
    const response = await apiInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  } catch (error) {
    if (isDevelopment) console.error('Forgot password error:', error);
    throw new Error('Error during password reset request');
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await apiInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
    return response.data;
  } catch (error) {
    if (isDevelopment) console.error('Reset password error:', error);
    throw new Error('Error during password reset');
  }
};