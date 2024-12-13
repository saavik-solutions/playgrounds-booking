import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/redux/store';

export const createBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include', // Ensures cookies are sent for refresh tokens
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;

      // Priority 1: Access token from Redux
      const reduxToken = state.auth.accessToken;

      // Priority 2: Fallback to Local Storage if Redux is unavailable
      const token = reduxToken || localStorage.getItem('accessToken');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
