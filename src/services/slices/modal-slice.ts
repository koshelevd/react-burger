import { createSlice } from '@reduxjs/toolkit';
import { checkout } from './order-slice';

const initialState = {
  order: false,
};

function showOrderModal() {
  return {
    ...initialState,
    order: true,
  };
}

function hideModals() {
  return initialState;
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openOrder: showOrderModal,
    closeModals: hideModals,
  },
  extraReducers: (builder) => {
    builder.addCase(checkout.fulfilled, showOrderModal);
  },
});

export const { openOrder, closeModals } = modalSlice.actions;

export default modalSlice.reducer;
