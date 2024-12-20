import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setAuthHeader, clearAuth } from "@/redux/slices/authSlice";
import type { RootState } from "@/redux/store";



export const createBaseQuery = (): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authHeader;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.meta?.response) {
      // Log raw response for debugging
      console.log('Raw response:', await result.meta.response.text());

      // Extract and update token if present
      const accessToken = result.meta.response.headers
        .get('Authorization')
        ?.replace('Bearer ', '');
      if (accessToken) {
        api.dispatch(setAuthHeader(accessToken));
      }
    }

    // Handle errors
    const error = result.error as FetchBaseQueryError;
    if (error) {
      if (error.status === 401) {
        console.warn('Unauthorized: Clearing auth');
        api.dispatch(clearAuth());
      } else if (error.status === 'PARSING_ERROR') {
        console.error('Parsing error:', error);
      }
    }

    return result;
  };
};
