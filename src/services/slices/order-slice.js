import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  info: {},
  isRequestProcessing: false,
  isRequestFailed: false,
  error: null,
};

export const checkout = createAsyncThunk('order/checkout', (data) =>
  api
    .checkout(data)
    .then((res) => res.order)
    .catch((err) => err),
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.isRequestProcessing = true;
        state.isRequestFailed = false;
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.info = action.payload;
        state.isRequestProcessing = false;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.isRequestProcessing = false;
        state.isRequestFailed = true;
        state.error = action.error;
      });
  },
});

export default orderSlice.reducer;
