import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookies';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../../utils/constants';
import { IAuthState, IApiResponse, TRequestData } from '../../utils/types';

const initialState = {
  isLoggedIn: !!getCookie(ACCESS_TOKEN_COOKIE_NAME),
  user: null,
  profile: {
    isRequestProcessing: false,
    isRequestFailed: false,
    isRequestSucceded: false,
  },
  signUp: {
    isRequestProcessing: false,
    isRequestFailed: false,
    isRequestSucceded: false,
  },
  signIn: {
    isRequestProcessing: false,
    isRequestFailed: false,
    isRequestSucceded: false,
  },
  signOut: {
    isRequestProcessing: false,
    isRequestFailed: false,
    isRequestSucceded: false,
  },
  error: null,
} as IAuthState;

export const signUp = createAsyncThunk(
  'signUp',
  (data: TRequestData<string, string>) =>
    api.signUp(data).then((res) => res) as Promise<IApiResponse>,
);

export const signIn = createAsyncThunk(
  'signIn',
  (data: TRequestData<string, string>) =>
    api.signIn(data).then((res) => res) as Promise<IApiResponse>,
);

export const signOut = createAsyncThunk(
  'signOut',
  () => api.signOut().then((res) => res) as Promise<IApiResponse>,
);

export const getProfile = createAsyncThunk(
  'getProfile',
  () => api.getUserInfo().then((res) => res) as Promise<IApiResponse>,
);

export const patchProfile = createAsyncThunk(
  'patchProfile',
  (data: TRequestData<string, string>) =>
    api.patchUserInfo(data).then((res) => res) as Promise<IApiResponse>,
);

const setLoggedIn = (
  state: IAuthState,
  action: PayloadAction<IApiResponse>,
) => {
  const authToken =
    action.payload.accessToken &&
    action.payload.accessToken.split('Bearer ')[1];
  const refreshToken = action.payload?.refreshToken;

  if (authToken) {
    setCookie(ACCESS_TOKEN_COOKIE_NAME, authToken);
    state.isLoggedIn = true;
    state.user = action.payload.user;
  }
  if (refreshToken) {
    setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken);
  }
};

const setLoggedOut = (state: IAuthState) => {
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
      .addCase(signUp.pending, (state: IAuthState) => {
        state.signUp.isRequestSucceded = false;
        state.signUp.isRequestProcessing = true;
        state.signUp.isRequestFailed = false;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state: IAuthState, action) => {
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
        state.error = action.error.message;
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
        state.error = action.error.message;
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
        state.error = action.error.message;
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  },
});

export default authSlice;
