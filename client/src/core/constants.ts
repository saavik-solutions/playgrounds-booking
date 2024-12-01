export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH_TOKEN: '/api/auth/refresh-',
    LOGOUT: '/api/auth/logout/email',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
    GOOGLE_LOGIN: '/api/auth/google',
    GOOGLE_CALLBACK: '/api/auth/google/callback',
    GOOGLE_LOGOUT:'api/auth/logout/google'
  },
  GROUNDS: {
    FETCH_ALL: '/api/grounds',
    FETCH_SINGLE: '/api/grounds/:id',
    CREATE_SLOTS: '/api/grounds/groundId/slots', 
  },
  BOOKINGS: {
    FETCH_ALL: '/api/bookings',
    FETCH_USER_BOOKINGS: '/api/bookings/user',
    FETCH_SINGLE_BOOKING: '/api/bookings/:id', // 
    FETCH_ALL_BOOKING_BY_GROUND: 'api/bookings/:groundId/bookings',
    FETCH_A_BOOKING_BY_GROUND:'api/bookings/:groundId/bookings/:bookingId'
  },
  PAYMENTS: {
    INITIATE: '/api/payments/initiate',
    VERIFY: '/api/payments/verify',
  },
};

export const TIMEOUT = 10000; // 10 seconds timeout for API requests

export const AUTH_HEADER = 'Authorization';
export const BEARER_TOKEN_PREFIX = 'Bearer ';

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error, please try again.',
  AUTH_ERROR: 'Authentication error, please login again.',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful.',
  REGISTRATION_SUCCESS: 'Registration successful.',
};
export const COOKIES = {
    AUTH_TOKEN: "authToken", 
    REFRESH_TOKEN: "refreshToken", 
    DEFAULT_PATH: "/", 
};
