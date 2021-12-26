import { combineReducers } from 'redux';
import ingredientsReducer from './slices/ingredients-slice';
import modalSliceReducer from './slices/modal-slice';
import compositionReducer from './slices/composition-slice';
import orderSliceReducer from './slices/order-slice';
import forgotPasswordSliceReducer from './slices/forgot-password-slice';
import resetPasswordSliceReducer from './slices/reset-password-slice';
import authSlice from './slices/auth-slice';
import websocketSlice from './slices/websocket-slice';
import feedSlice from './slices/feed-slice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  isModalOpen: modalSliceReducer,
  composition: compositionReducer,
  order: orderSliceReducer,
  forgotPassword: forgotPasswordSliceReducer,
  resetPassword: resetPasswordSliceReducer,
  auth: authSlice.reducer,
  ws: websocketSlice.reducer,
  feed: feedSlice.reducer,
});

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
