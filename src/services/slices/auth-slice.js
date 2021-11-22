import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookies';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../../utils/constants';

const initialState = {
  isLoggedIn: !!getCookie(ACCESS_TOKEN_COOKIE_NAME),
  user: null,
  profile: {
    isRequestProcessing: false,
    isRequestFailed: false,
  },
  signUp: {
    isRequestProcessing: false,
    isRequestFailed: false,
  },
  signIn: {
    isRequestProcessing: false,
    isRequestFailed: false,
  },
  signOut: {
    isRequestProcessing: false,
    isRequestFailed: false,
  },
  error: null,
};

export const signUp = createAsyncThunk('signUp', (data) =>
  api.signUp(data).then((res) => res),
);

export const signIn = createAsyncThunk('signIn', (data) =>
  api.signIn(data).then((res) => res),
);

export const signOut = createAsyncThunk('signOut', (data) =>
  api.signOut(data).then((res) => res),
);

export const getProfile = createAsyncThunk('getProfile', () =>
  api.getUserInfo().then((res) => res),
);

export const patchProfile = createAsyncThunk('patchProfile', (data) =>
  api.patchUserInfo(data).then((res) => res),
);

const setLoggedIn = (state, { payload }) => {
  const authToken = payload?.accessToken.split('Bearer ')[1];
  const refreshToken = payload?.refreshToken;

  if (authToken) {
    setCookie(ACCESS_TOKEN_COOKIE_NAME, authToken);
    state.isLoggedIn = true;
    state.user = payload.user;
  }
  if (refreshToken) {
    setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken);
  }
};

const setLoggedOut = (state) => {
  deleteCookie(ACCESS_TOKEN_COOKIE_NAME);
  deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
  state.isLoggedIn = false;
  state.user = null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.signUp.isRequestSucceded = false;
        state.signUp.isRequestProcessing = true;
        state.signUp.isRequestFailed = false;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (action.payload.success) {
          setLoggedIn(state, action);
        } else {
          state.error = action.payload.message;
        }
        state.signUp.isRequestProcessing = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUp.isRequestProcessing = false;
        state.signUp.isRequestFailed = true;
        state.error = action.payload.message;
      })

      .addCase(signIn.pending, (state) => {
        state.isLoggedIn = false;
        state.signIn.isRequestProcessing = true;
        state.signIn.isRequestFailed = false;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload.success) {
          setLoggedIn(state, action);
        } else {
          state.error = action.payload.message;
        }
        state.signIn.isRequestProcessing = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signIn.isRequestProcessing = false;
        state.signIn.isRequestFailed = true;
        state.error = action.payload.message;
      })

      .addCase(signOut.pending, (state) => {
        state.signOut.isRequestProcessing = true;
        state.signOut.isRequestFailed = false;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        if (action.payload.success) {
          setLoggedOut(state);
        } else {
          state.error = action.payload.message;
        }
        state.signOut.isRequestProcessing = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.signOut.isRequestProcessing = false;
        state.signOut.isRequestFailed = true;
        state.error = action.payload.message;
      })

      .addCase(getProfile.pending, (state) => {
        state.profile.isRequestProcessing = true;
        state.profile.isRequestFailed = false;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
        } else {
          state.error = action.payload.message;
        }
        state.profile.isRequestProcessing = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.profile.isRequestProcessing = false;
        state.profile.isRequestFailed = true;
        state.error = action.payload.message;
      })

      .addCase(patchProfile.pending, (state) => {
        state.profile.isRequestProcessing = true;
        state.profile.isRequestFailed = false;
        state.error = null;
      })
      .addCase(patchProfile.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
        } else {
          state.error = action.payload.message;
        }
        state.profile.isRequestProcessing = false;
      })
      .addCase(patchProfile.rejected, (state, action) => {
        state.profile.isRequestProcessing = false;
        state.profile.isRequestFailed = true;
        state.error = action.payload.message;
      });
  },
});

export default authSlice;
