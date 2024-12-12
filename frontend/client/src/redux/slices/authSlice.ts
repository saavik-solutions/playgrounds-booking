import { AuthState, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: AuthState = {
  accessToken: null,
  role: null,
  user: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
       action: PayloadAction<{
        accessToken: string;
        role: string;
        user: User;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthState, logout } = authSlice.actions;

export default authSlice.reducer;