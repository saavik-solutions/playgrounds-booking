// src/core/types/authTypes.ts

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user'; // You can expand roles as needed
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthError {
  message: string;
  statusCode: number;
}