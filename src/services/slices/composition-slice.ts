import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { ICompositionState } from '../../utils/types';
import { checkout } from './order-slice';

const initialState = {
  components: [],
  activeBun: null,
} as ICompositionState;

const compositionSlice = createSlice({
  name: 'composition',
  initialState,
  reducers: {
    addCompositionItem(state, action) {
      state.components.push({ ...action.payload, uuid: uuid() });
    },
    removeCompositionItem(state, action) {
      state.components.splice(action.payload.index, 1);
    },
    selectActiveBun(state, action) {
      state.activeBun = action.payload;
    },
    swapItems(state, action) {
      state.components.splice(
        action.payload.hoverIndex,
        0,
        state.components.splice(action.payload.dragIndex, 1)[0],
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkout.fulfilled, () => initialState);
  },
});

export const {
  addCompositionItem,
  removeCompositionItem,
  selectActiveBun,
  swapItems,
} = compositionSlice.actions;

export default compositionSlice.reducer;
