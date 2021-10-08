import ingredientsReducer from './slices/ingredients-slice';
import selectedIngredientReducer from './slices/select-ingredient-slice';
import modalSliceReducer from './slices/modal-slice';
import compositionReducer from './slices/composition-slice';
import orderSliceReducer from './slices/order-slice';

const rootReducer = {
  ingredients: ingredientsReducer,
  selectedIngredient: selectedIngredientReducer,
  isModalOpen: modalSliceReducer,
  composition: compositionReducer,
  order: orderSliceReducer,
};

export default rootReducer;
