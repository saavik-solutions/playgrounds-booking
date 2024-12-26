// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/features/auth/interfaces/auth.types';
import { AUTH_STATUSES } from '@/constants/authConstants';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  googleSignIn, 
  forgotPassword, 
  resetPassword 
} from '@/features/auth/services/authThunks';


const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  role: null,
  status: AUTH_STATUSES.IDLE,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Local logout to clear state (in case of forceful logout)
    forceLogout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.status = AUTH_STATUSES.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for login
      .addCase(loginUser.pending, (state) => {
        state.status = AUTH_STATUSES.LOADING;
        state.error = null;
      })
      // Handle fulfilled state for login
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ accessToken: string; role: string }>) => {
        state.status = AUTH_STATUSES.SUCCEEDED;
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
        state.error = null;
      })
      // Handle rejected state for login
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = AUTH_STATUSES.FAILED;
        state.error = action.payload || 'Failed to login';
      })

      // Handle pending state for registration
      .addCase(registerUser.pending, (state) => {
        state.status = AUTH_STATUSES.LOADING;
        state.error = null;
      })
      // Handle fulfilled state for registration with auto login
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ accessToken: string; role: string }>) => {
        state.status = AUTH_STATUSES.SUCCEEDED;
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
        state.error = null;
      })
      // Handle rejected state for registration
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = AUTH_STATUSES.FAILED;
        state.error = action.payload || 'Failed to register';
      })

      // Handle pending state for logout
      .addCase(logoutUser.pending, (state) => {
        state.status = AUTH_STATUSES.LOADING;
      })
      // Handle fulfilled state for logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.role = null;
        state.status = AUTH_STATUSES.IDLE;
        state.error = null;
      })
      // Handle rejected state for logout
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = AUTH_STATUSES.FAILED;
        state.error = action.payload || 'Failed to logout';
      })

      // Handle pending state for Google Sign-In
      .addCase(googleSignIn.pending, (state) => {
        state.status = AUTH_STATUSES.LOADING;
        state.error = null;
      })
      // Handle fulfilled state for Google Sign-In
      .addCase(googleSignIn.fulfilled, (state, action: PayloadAction<{ accessToken: string; role: string }>) => {
        state.status = AUTH_STATUSES.SUCCEEDED;
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
        state.error = null;
      })
      // Handle rejected state for Google Sign-In
      .addCase(googleSignIn.rejected, (state, action: PayloadAction<any>) => {
        state.status = AUTH_STATUSES.FAILED;
        state.error = action.payload || 'Failed to sign in with Google';
      })

      // Handle pending state for forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.status = AUTH_STATUSES.LOADING;
        state.error = null;
      })
      // Handle fulfilled state for forgot password
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = AUTH_STATUSES.SUCCEEDED;
        state.error = null;
      })
      // Handle rejected state for forgot password
      .addCase(forgotPassword.rejected, (state, action: PayloadAction<any>) => {
        state.status = AUTH_STATUSES.FAILED;
        state.error = action.payload || 'Failed to process forgot password';
      })

      // Handle pending state for reset password
      .addCase(resetPassword.pending, (state) => {
        state.status = AUTH_STATUSES.LOADING;
        state.error = null;
      })
      // Handle fulfilled state for reset password
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = AUTH_STATUSES.SUCCEEDED;
        state.error = null;
      })
      // Handle rejected state for reset password
      .addCase(resetPassword.rejected, (state, action: PayloadAction<any>) => {
        state.status = AUTH_STATUSES.FAILED;
        state.error = action.payload || 'Failed to reset password';
      });
  },
});

export const { forceLogout } = authSlice.actions;
export default authSlice.reducer;
