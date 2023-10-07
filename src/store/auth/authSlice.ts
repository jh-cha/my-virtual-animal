import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
  value: number;
};

const initialState = {
  value: 0,
} as CounterState;

export const counter = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
  },
});

export const { reset } = counter.actions;
export default counter.reducer;
