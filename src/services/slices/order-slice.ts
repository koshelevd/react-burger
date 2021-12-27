import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { IApiResponse, IOrderState, TOrderData } from '../../utils/types';

const initialState = {
  info: {},
  isRequestProcessing: false,
  isRequestFailed: false,
  error: null,
} as IOrderState;

export const checkout = createAsyncThunk('order/checkout', (data: TOrderData) =>
  api.checkout(data).then((res) => res) as Promise<IApiResponse>,
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.isRequestProcessing = true;
        state.isRequestFailed = false;
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.info = action.payload.order;
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
