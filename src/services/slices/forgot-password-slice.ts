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

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  (data: TRequestData<string, string>) =>
    api.forgotPassword(data).then((res) => res) as Promise<IApiResponse>,
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isRequestProcessing = true;
        state.isRequestFailed = false;
        state.isRequestSucceded = false;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isRequestSucceded = action.payload.success;
        state.error = action.payload.success ? null : action.payload.message;
        state.isRequestProcessing = false;
        localStorage.setItem(FULFILLED_FORGOT_REQUEST_KEY, 'true');
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isRequestProcessing = false;
        state.isRequestFailed = true;
        state.error = action.error.message;
      });
  },
});

export default forgotPasswordSlice.reducer;
