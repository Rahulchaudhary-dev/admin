import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from './example/example.slice';
import toastSlice from './toast.slice';
import authSlice from './auth/auth.slice';

const store = configureStore({
  reducer: {
    example: exampleSlice,
    toasts: toastSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
