import { AUTH_ACTIONS } from '@/constants/authConstants';
import axiosInstance from '@/services/axiosInstance';
import { isApiError } from '@/utils/isAPIError';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginData, RegisterData, ForgotPasswordData, ResetPasswordData } from '../interfaces/auth.types';

const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.response?.data?.message || 'An error occurred';
  }
  return 'An unexpected error occurred';
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  AUTH_ACTIONS.LOGIN,
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(AUTH_ACTIONS.LOGIN, data);
      const accessToken = response.headers['authorization']?.split(' ')[1];
      const role = response.data.user.role;
      return { accessToken, role };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const registerUser = createAsyncThunk(
  AUTH_ACTIONS.REGISTER,
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(AUTH_ACTIONS.REGISTER, data);
      const accessToken = response.headers['authorization']?.split(' ')[1];
      const role = response.data.user.role;
      return { accessToken, role }; // Return tokens and role
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


// Async thunk for logout
export const logoutUser = createAsyncThunk(
  AUTH_ACTIONS.LOGOUT,
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post(AUTH_ACTIONS.LOGOUT);
      return true; // Indicate successful logout
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Async thunk for Google sign-in
export const googleSignIn = createAsyncThunk(
  AUTH_ACTIONS.GOOGLE_SIGN_IN,
  async (idToken: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(AUTH_ACTIONS.GOOGLE_SIGN_IN, { idToken });
      const accessToken = response.headers['authorization']?.split(' ')[1];
      const role = response.data.user.role;
      return { accessToken, role };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  AUTH_ACTIONS.FORGOT_PASSWORD,
  async (data: ForgotPasswordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(AUTH_ACTIONS.FORGOT_PASSWORD, data);
      return response.data.message; // Assuming API returns a success message
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Async thunk for reset password
export const resetPassword = createAsyncThunk(
  AUTH_ACTIONS.RESET_PASSWORD,
  async (data: ResetPasswordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(AUTH_ACTIONS.RESET_PASSWORD, data);
      return response.data.message; // Assuming API returns a success message
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
