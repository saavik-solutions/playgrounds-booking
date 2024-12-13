// src/core/api/axios.ts
import axios, { AxiosError, AxiosInstance } from 'axios';
import { store } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';

// Create axios instance
export const createApiInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // For handling cookies
  });

  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth.accessToken;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        store.dispatch(logout());
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const apiInstance = createApiInstance();