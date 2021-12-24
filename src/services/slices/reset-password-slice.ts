import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { FULFILLED_FORGOT_REQUEST_KEY } from '../../utils/constants';
import {
  IPasswordState,
  IApiResponse,
  TRequestData,
} from '../../utils/types';

const initialState = {
  isRequestProcessing: false,
  isRequestFailed: false,
  isRequestSucceded: false,
  error: null,
} as IPasswordState;

export const resetPassword = createAsyncThunk('resetPassword', (data: TRequestData<string, string>) =>
  api.resetPassword(data).then((res) => res) as Promise<IApiResponse>,
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isRequestSucceded = false;
        state.isRequestProcessing = true;
        state.isRequestFailed = false;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isRequestSucceded = action.payload.success;
        state.error = action.payload.success ? null : action.payload.message;
        state.isRequestProcessing = false;
        localStorage.removeItem(FULFILLED_FORGOT_REQUEST_KEY);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isRequestProcessing = false;
        state.isRequestFailed = true;
        state.error = action.error.message;
      });
  },
});

export default resetPasswordSlice.reducer;
