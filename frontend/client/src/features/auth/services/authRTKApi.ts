// src/features/auth/services/authRTKApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINTS } from '@/core/constants';
import {setUserRole } from '@/redux/slices/authSlice';
import type {  LoginCredentials } from '@/types/auth';
import { createBaseQuery } from './baseQuery';
import { User } from '@/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginCredentials>({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Validate response
          if (!data.role) {
            throw new Error('Login response is missing the user role.');
          }

          // Update Redux state with the user role
          const userRole = data.role;
          dispatch(setUserRole(userRole));
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
