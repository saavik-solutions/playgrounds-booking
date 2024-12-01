export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  NETWORK_ERROR: 'Network error occurred. Please try again',
  TOKEN_EXPIRED: 'Your session has expired. Please login again',
  RATE_LIMIT: 'Too many attempts. Please try again later',
  UNAUTHORIZED: 'You must be logged in to access this resource',
  REGISTRATION_FAILED: 'Registration failed. Please try again',
  RESET_PASSWORD_FAILED: 'Failed to send reset instructions',
} as const;

export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
} as const;

export const API_ROUTES = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  ME: '/api/auth/me',
  RESET_PASSWORD: '/api/auth/reset-password',
} as const;