import { AuthState, User, UserRole } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
  role: null,
  loading: false,
  error: null,
};

interface SetAuthStatePayload {
  accessToken: string;
  user: User;
  role: UserRole;
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<SetAuthStatePayload>) => {
      const { accessToken, user, role } = action.payload;
      state.isAuthenticated = true;
      state.accessToken = accessToken;
      state.user = user;
      state.role = role;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      state.role = null;
      state.error = null;
    },
  },
});

export const { setAuthState, setLoading, setError, logout } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state: { auth: AuthState }) => 
  state.auth.isAuthenticated;
export const selectCurrentUser = (state: { auth: AuthState }) => 
  state.auth.user;
export const selectUserRole = (state: { auth: AuthState }) => 
  state.auth.role;
export const selectAuthError = (state: { auth: AuthState }) => 
  state.auth.error;
export const selectAuthLoading = (state: { auth: AuthState }) => 
  state.auth.loading;

export default authSlice.reducer;