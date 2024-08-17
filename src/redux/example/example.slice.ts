import { createSlice } from '@reduxjs/toolkit';
import { exampleReducerLogic, initialState } from './example.action';

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    updateMessage: exampleReducerLogic,
  },
});

export const { updateMessage } = exampleSlice.actions;
export default exampleSlice.reducer;
