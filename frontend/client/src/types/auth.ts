import { User } from "./user";


export interface AuthState {
  accessToken: string | null;
  role: string | null;
    user: User | null;
      isAuthenticated: boolean;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export interface GoogleLoginData {
  token: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface LogoutResponse {
  message: string;
}
