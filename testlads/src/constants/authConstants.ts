export const AUTH_ACTIONS = {
  REGISTER: 'auth/register',
  LOGIN: 'auth/login',
    GOOGLE_SIGN_IN: 'auth/google',
    REFRESH_TOKEN: '/auth/refresh-tokens',
    LOGOUT: '/auth/logout/email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    GOOGLE_CALLBACK: '/auth/google/callback',
    GOOGLE_LOGOUT:'api/auth/logout/google'
};

export const AUTH_STATUSES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};
