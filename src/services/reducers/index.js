import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients';
import {
  SELECT_BUN,
  SET_SELECTED_INGREDIENT,
  UNSET_SELECTED_INGREDIENT,
} from '../actions';

const initialSelectedIngredient = null;
const initialActiveBun = null;

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

const compositionReducer = (state, action) => {
  return null;
};

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  compositionReducer,
  selectedIngredient: selectedIngredientReducer,
  // activeBun: activeBunReducer,
});
