import ingredientsReducer from './slices/ingredients-slice';
import modalSliceReducer from './slices/modal-slice';
import compositionReducer from './slices/composition-slice';
import orderSliceReducer from './slices/order-slice';
import forgotPasswordSliceReducer from './slices/forgot-password-slice';
import resetPasswordSliceReducer from './slices/reset-password-slice';
import authSlice from './slices/auth-slice';

const rootReducer = {
  ingredients: ingredientsReducer,
    isModalOpen: modalSliceReducer,
  composition: compositionReducer,
  order: orderSliceReducer,
  forgotPassword: forgotPasswordSliceReducer,
  resetPassword: resetPasswordSliceReducer,
  auth: authSlice.reducer,
};

export default rootReducer;
