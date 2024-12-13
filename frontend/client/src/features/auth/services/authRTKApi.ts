// src/features/auth/services/authRTKApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './baseQuery';
import AuthService from './authService';
import type {
  AuthResponse,
  GoogleLoginData,
  LoginCredentials,
  LogoutResponse,
  RegisterUserData
} from '@/types/auth';
import { API_ENDPOINTS } from '@/core/constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await AuthService.handleAuthSuccess(dispatch, data);
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),

    register: builder.mutation<AuthResponse, RegisterUserData>({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.REGISTER,
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await AuthService.handleAuthSuccess(dispatch, data);
        } catch (error) {
          console.error('Registration error:', error);
        }
      },
    }),

    googleLogin: builder.mutation<AuthResponse, GoogleLoginData>({
      query: (tokenData) => ({
        url: API_ENDPOINTS.AUTH.GOOGLE_LOGIN,
        method: 'POST',
        body: tokenData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await AuthService.handleAuthSuccess(dispatch, data);
        } catch (error) {
          console.error('Google login error:', error);
        }
      },
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          AuthService.handleLogout(dispatch);
        } catch (error) {
          console.error('Logout error:', error);
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
