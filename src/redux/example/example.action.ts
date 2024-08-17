import { createAction, PayloadAction } from '@reduxjs/toolkit';

// Action creators
export const updateMessage = createAction<string>('example/updateMessage');

// Additional logic
export const resetMessage = createAction('example/resetMessage');

export interface ExampleState {
  message: string;
}
export const initialState: ExampleState = {
  message: 'Hello from Redux Toolkit!',
};

type Payload = {
  message: string;
};
// Reducer logic
type ExampleReducer<S> = (state: S, action: PayloadAction<Payload>) => void;

export const exampleReducerLogic: ExampleReducer<Payload> = (state, action) => {
  state.message = action.payload?.message;
};
