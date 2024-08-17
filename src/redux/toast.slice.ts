import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MAX_TTL } from '../utils/constants';

interface Toast {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  ttl?: number;
}

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    addToast: (
      state,
      action: PayloadAction<Omit<Toast, 'id'> & { id?: number }>
    ) => {
      const toast: Toast = {
        id: action.payload.id || new Date().getTime(),
        ttl: action.payload.ttl !== undefined ? action.payload.ttl : MAX_TTL,
        ...action.payload,
      };
      state.toasts.push(toast);
    },
    deleteToast: (state, action: PayloadAction<number>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const { addToast, deleteToast } = toastsSlice.actions;
export default toastsSlice.reducer;
