import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAccessToken, logout } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';
import { AuthResponse, GoogleLoginData, LoginCredentials, LogoutResponse, RegisterUserData } from '@/types';
import { API_ENDPOINTS } from '@/core/constants';

// Check if the environment is development
const isDevelopment = process.env.NODE_ENV === 'development';

// Base query for RTK Query
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

// Define the authentication API slice
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled; // Wait for mutation to complete
          if (isDevelopment) {
            console.log('Login successful:', data);
          }
          dispatch(setAccessToken(data.accessToken)); // Store token in Redux state
          localStorage.setItem('accessToken', data.accessToken);
        } catch (error) {
          if (isDevelopment) {
            console.error('Error during login:', error);
          }
        }
      },
    }),
    register: builder.mutation<AuthResponse, RegisterUserData>({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.REGISTER,
        method: 'POST',
        body: userData,
      }),
    }),
    googleLogin: builder.mutation<AuthResponse, GoogleLoginData>({
      query: (tokenData) => ({
        url: API_ENDPOINTS.AUTH.GOOGLE_LOGIN,
        method: 'POST',
        body: tokenData,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled; // Wait for mutation to complete
          if (isDevelopment) {
            console.log('Google login successful:', data);
          }
          dispatch(setAccessToken(data.accessToken)); // Store token in Redux state
          localStorage.setItem('accessToken', data.accessToken);
        } catch (error) {
          if (isDevelopment) {
            console.error('Error during Google login:', error);
          }
        }
      },
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: 'POST',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          if (isDevelopment) {
            console.log('Logout successful');
          }
          dispatch(logout()); // Clear token from Redux
          localStorage.removeItem('accessToken');
        } catch (error) {
          if (isDevelopment) {
            console.error('Error during logout:', error);
          }
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
} = authApi;
