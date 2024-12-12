import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  role: string | null;
  user: any | null;
}

const initialState: AuthState = {
  accessToken: null,
  role: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
      action: PayloadAction<{ accessToken: string; role: string; user: any }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.user = action.payload.user;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.role = null;
      state.user = null;
    },
  },
});

export const { setAuthState, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
