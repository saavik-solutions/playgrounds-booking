export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-',
    LOGOUT: '/auth/logout/email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    GOOGLE_LOGIN: '/auth/google',
    GOOGLE_CALLBACK: '/auth/google/callback',
    GOOGLE_LOGOUT:'api/auth/logout/google'
  },
  GROUNDS: {
    FETCH_ALL: '/grounds',
    FETCH_SINGLE: '/grounds/:id',
    CREATE_SLOTS: '/grounds/groundId/slots', 
  },
  BOOKINGS: {
    FETCH_ALL: '/bookings',
    FETCH_USER_BOOKINGS: '/bookings/user',
    FETCH_SINGLE_BOOKING: '/bookings/:id', // 
    FETCH_ALL_BOOKING_BY_GROUND: '/bookings/:groundId/bookings',
    FETCH_A_BOOKING_BY_GROUND:'api/bookings/:groundId/bookings/:bookingId'
  },
  PAYMENTS: {
    INITIATE: '/payments/initiate',
    VERIFY: '/payments/verify',
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
