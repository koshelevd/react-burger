import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const selectIngredientSlice = createSlice({
  name: 'selectIngredient',
  initialState,
  reducers: {
    setSelectedIngredient(_, action) {
      return action.payload;
    },
    unsetSelectedIngredient() {
      return initialState;
    },
  },
});

export const { setSelectedIngredient, unsetSelectedIngredient } =
  selectIngredientSlice.actions;

export default selectIngredientSlice.reducer;
