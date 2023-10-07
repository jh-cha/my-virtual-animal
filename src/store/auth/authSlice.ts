import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  account: string;
  shortAddress: string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
};

const initialState = {
  account: '',
  shortAddress: '',
  isAuthenticated: false,
  isAuthenticating: false,
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init: () => initialState,
    loginSuccess: (state, action) => {
      state.account = action.payload;
      state.shortAddress = action.payload.slice(0, 4) + '...' + action.payload.slice(-2);
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    },
    logout: (state) => {
      state.account = '';
      state.shortAddress = '';
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    },
  },
});

export const { init, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
