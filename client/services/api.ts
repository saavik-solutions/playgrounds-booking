import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, refreshAccessToken } from '../utils/token';  
import { NetworkError } from '../core/errors/NetworkError';

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
    // No need to extract token from cookies, it's in the Authorization header already
    const token = getAccessToken();  // This function can still retrieve from wherever it's being stored, typically `Authorization` header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Attach the token to the request if it exists
    }
    return config;
  },
  (error) => {
    return Promise.reject(new NetworkError(error.message));
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,  // If the response is successful, just return it
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
        const token = await refreshAccessToken();  // Refresh the token
        originalRequest.headers.Authorization = `Bearer ${token}`;  // Attach the new token to the request
        return api(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        // If token refresh fails, reject the promise
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
