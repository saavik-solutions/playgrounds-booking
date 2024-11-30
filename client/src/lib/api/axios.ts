import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, refreshAccessToken } from '../../features/utils/token';
import { NetworkError } from '../auth/errors';

// Extend InternalAxiosRequestConfig to include `_retry`
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Create Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Wrap request errors in custom NetworkError
    return Promise.reject(new NetworkError(error.message));
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Handle rate limiting (status code 429)
    if (error.response?.status === 429) {
      return Promise.reject(
        new NetworkError('Too many requests. Please try again later.')
      );
    }

    // Handle token expiration (status code 401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        const token = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        // Token refresh failed, reject the promise
        return Promise.reject(refreshError);
      }
    }

    // For all other errors, reject the promise
    return Promise.reject(error);
  }
);
