import { createSlice } from '@reduxjs/toolkit';
import { setSelectedIngredient } from './select-ingredient-slice';
import { checkout } from './order-slice';

const initialState = {
  ingredient: false,
  order: false,
};

function showIngredientModal() {
  return {
    ...initialState,
    ingredient: true,
  };
}

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
    openIngredient: showIngredientModal,
    openOrder: showOrderModal,
    closeModals: hideModals,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSelectedIngredient, showIngredientModal)
      .addCase(checkout.fulfilled, showOrderModal);
  },
});

export const { openIngredient, openOrder, closeModals } = modalSlice.actions;

export default modalSlice.reducer;
