import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Account = {
  address: string;
  shortAddress: string;
  balance: number;
};

type AuthState = {
  account: Account;
  provider: any;
  signer: any;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  [key: string]: any;
};

const initialState: AuthState = {
  account: {
    address: '',
    shortAddress: '',
    balance: 0,
  },
  provider: {},
  signer: {},
  isAuthenticated: false,
  isAuthenticating: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init: () => initialState,
    loginSuccess: (state, action) => {
      state.account.address = action.payload;
      state.account.shortAddress = action.payload.slice(0, 4) + '...' + action.payload.slice(-2);
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    },
    logout: (state) => {
      state.account.address = '';
      state.account.shortAddress = '';
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    },
    setBalance: (state, action) => {
      state.account.balance = action.payload;
    },
    changeValue: (state, action) => {
      state[action.payload.prop] = action.payload.value;
    },
  },
});

export const { init, loginSuccess, logout, setBalance, changeValue } = authSlice.actions;
export default authSlice.reducer;
