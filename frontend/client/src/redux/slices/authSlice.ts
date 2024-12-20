// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  authHeader: string | null;
  userRole: string | null;
}

const initialState: AuthState = {
  authHeader: null,
  userRole: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthHeader(state, action: PayloadAction<string>) {
      state.authHeader = action.payload;
    },
    setUserRole(state, action: PayloadAction<string>) {
      state.userRole = action.payload;
    },
    clearAuth(state) {
      state.authHeader = null;
      state.userRole = null;
    },
  },
});

export const { setAuthHeader, setUserRole, clearAuth } = authSlice.actions;

export default authSlice.reducer;
