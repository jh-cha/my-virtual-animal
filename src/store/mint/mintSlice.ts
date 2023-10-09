import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MintFormState = {
  file: any;
  mint: {
    name: string;
    supply: number;
    description: string;
    network: string;
    [key: string]: string | number;
  };
};

const initialState: MintFormState = {
  file: {},
  mint: {
    name: '',
    supply: 1,
    description: '',
    network: '',
  },
};

export const mintSlice = createSlice({
  name: 'mint',
  initialState,
  reducers: {
    init: () => initialState,
    changeValue: (state, action: PayloadAction<{ prop: string; value: string | number }>) => {
      if (typeof action.payload.value === 'string') {
        state.mint[action.payload.prop] = action.payload.value as string;
      } else if (typeof action.payload.value === 'number') {
        state.mint[action.payload.prop] = action.payload.value as number;
      }
    },
    uploadFile: (state, action) => {
      state.file = action.payload;
    },
  },
});

export const { init, changeValue, uploadFile } = mintSlice.actions;
export default mintSlice.reducer;
