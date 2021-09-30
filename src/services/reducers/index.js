import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients';
import compositionReducer from './composition';
import {
  CLOSE_MODAL,
  OPEN_INGREDIENT_MODAL,
  OPEN_ORDER_MODAL,
  SET_SELECTED_INGREDIENT,
  UNSET_SELECTED_INGREDIENT,
} from '../actions';

const initialSelectedIngredient = null;
const initialIsModalOpen = {
  ingredient: false,
  order: false,
};

const selectedIngredientReducer = (
  state = initialSelectedIngredient,
  action,
) => {
  switch (action.type) {
    case SET_SELECTED_INGREDIENT: {
      return action.ingredient;
    }
    case UNSET_SELECTED_INGREDIENT: {
      return initialSelectedIngredient;
    }
    default: {
      return state;
    }
  }
};

const isModalOpenReducer = (state = initialIsModalOpen, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...initialIsModalOpen,
        ingredient: true,
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...initialIsModalOpen,
        order: true,
      };
    }
    case CLOSE_MODAL: {
      return initialIsModalOpen;
    }
    default: {
      return state;
    }
  }
};

// const activeBunReducer = (state = initialActiveBun, action) => {
//   switch (action.type) {
//     case SELECT_BUN: {
//       return action.ingredient;
//     }
//     default: {
//       return state;
//     }
//   }
// };

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  composition: compositionReducer,
  selectedIngredient: selectedIngredientReducer,
  isModalOpen: isModalOpenReducer,
  // activeBun: activeBunReducer,
});
