import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { FULFILLED_FORGOT_REQUEST_KEY } from '../../utils/constants';

const initialState = {
  isRequestProcessing: false,
  isRequestFailed: false,
  isRequestSucceded: false,
  error: null,
};

export const forgotPassword = createAsyncThunk('forgotPassword', (data) =>
  api.forgotPassword(data).then((res) => res),
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
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
        localStorage.setItem(FULFILLED_FORGOT_REQUEST_KEY, true);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isRequestProcessing = false;
        state.isRequestFailed = true;
        state.error = action.payload.message;
      });
  },
});

export default forgotPasswordSlice.reducer;
