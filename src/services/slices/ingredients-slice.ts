import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { INGREDIENTS_TYPES } from '../../utils/data';
import {
  addCompositionItem,
  removeCompositionItem,
  selectActiveBun,
} from './composition-slice';
import { checkout } from './order-slice';
import api from '../../utils/api';
import { IApiResponse, IIngredientState, TIngredient } from '../../utils/types';

const initialState = {
  all: [],
  isRequestProcessing: false,
  isRequestFailed: false,
  isRequestSucceded: false,
  error: null,
  types: INGREDIENTS_TYPES,
} as IIngredientState;

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  () => api.getIngredients().then((res) => res) as Promise<IApiResponse>,
);

function addIngredient(
  state: IIngredientState,
  action: PayloadAction<TIngredient>,
) {
  const ingredient = action.payload;
  let result;
  if (ingredient.type === 'bun') {
    result = state.all && state.all.map((i) => {
      if (i._id === ingredient._id) {
        return { ...i, count: 2 };
      } else if (i.type === 'bun') {
        return { ...i, count: 0 };
      }
      return i;
    });
  } else {
    result = state.all && state.all.map((i) => {
      if (i._id === ingredient._id && !!i.count) {
        return { ...i, count: i.count + 1 };
      } else if (i._id === ingredient._id) {
        return { ...i, count: 1 };
      }
      return i;
    });
  }
  state.all = result;
}

function removeIngredient(
  state: IIngredientState,
  action: PayloadAction<{ index: number; ingredient: TIngredient }>,
) {
  const ingredient = state.all && state.all.find(
    (i) => i._id === action.payload.ingredient._id,
  );
  if (ingredient && ingredient.count) ingredient.count -= 1;
}

function clearQuantities(state: IIngredientState) {
  state.all && state.all.forEach((ingredient) => {
    ingredient.count = 0;
  });
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isRequestProcessing = true;
        state.isRequestFailed = false;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.all = action.payload.data;
        state.isRequestProcessing = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isRequestProcessing = false;
        state.isRequestFailed = true;
        state.error = action.error.message;
      })
      .addCase(addCompositionItem, addIngredient)
      .addCase(selectActiveBun, addIngredient)
      .addCase(removeCompositionItem, removeIngredient)
      .addCase(checkout.fulfilled, clearQuantities);
  },
});

export default ingredientsSlice.reducer;
