import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserAuthType = {
  isOpen?: boolean;
  isAuthenticated?: boolean;
  isRegistration?: boolean;
  showMsg?: boolean;
  loading?: boolean;
};

const initialState: UserAuthType = {
  isAuthenticated: false,
  isOpen: false,
  isRegistration: false,
  loading: false,
  showMsg: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoadingAuthRdx: (
      state,
      action: PayloadAction<{ loading?: boolean }>
    ) => {
      state['loading'] = action.payload.loading;
    },
    setShowMailBoxMsgAuthRdx: (
      state,
      action: PayloadAction<{ showMsg?: boolean }>
    ) => {
      state['showMsg'] = action.payload.showMsg;
    },
    setToggleAuthModalState: (state, action: PayloadAction<UserAuthType>) => {
      const { isOpen, isRegistration, showMsg } = action.payload;
      state['isOpen'] = !!isOpen;
      state['isRegistration'] = !!isRegistration;
      state['showMsg'] = !!showMsg;
    },
    setAuthenticatedUser: (state, action: PayloadAction<UserAuthType>) => {
      const payload = action?.payload
      state = payload // Warning need to change
      state['isAuthenticated'] = true;
      state['isOpen'] = false;

      state['loading'] = false;
      state['isRegistration'] = false;
    },

    logOutUser: (state) => {
      if (!state['showMsg']) {
        state['isOpen'] = false;
        state['showMsg'] = false;
      }
      state['isAuthenticated'] = false;
      state['isRegistration'] = false;
      state['loading'] = false;
    },
  },
});

export const {
  setToggleAuthModalState,
  setAuthenticatedUser,
  logOutUser,
  setLoadingAuthRdx,
  setShowMailBoxMsgAuthRdx,
} = authSlice.actions;

export default authSlice.reducer;
