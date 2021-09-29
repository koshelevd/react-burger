import { INGREDIENTS_TYPES } from '../../utils/data';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from '../actions/ingredients';

const initialState = {
  all: [],
  isRequestProcessing: false,
  isRequestFailed: false,
  error: null,
  types: INGREDIENTS_TYPES,
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        isRequestProcessing: true,
        isRequestFailed: false,
        error: null,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        all: action.ingredients,
        isRequestProcessing: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isRequestFailed: true,
        error: action.error,
        isRequestProcessing: false,
      };
    }
    case ADD_INGREDIENT: {
      const ingredient = action.ingredient;
      let result;
      if (ingredient.type === 'bun') {
        result = state.all.map((i) => {
          if (i._id === ingredient._id) {
            return { ...i, count: 1 };
          } else if (i.type === 'bun') {
            return { ...i, count: 0 };
          }
          return i;
        });
      } else {
        result = state.all.map((i) => {
          if (i._id === ingredient._id && !!i.count) {
            return { ...i, count: i.count + 1 };
          } else if (i._id === ingredient._id) {
            return { ...i, count: 1 };
          }
          return i;
        });
      }
      return {
        ...state,
        all: result,
      };
    }
    case REMOVE_INGREDIENT: {
      const ingredient = action.ingredient;
      let result;
      if (ingredient.type !== 'bun') {
        result = state.all.map((i) => {
          if (i._id === ingredient._id && !!i.count) {
            return { ...i, count: i.count - 1 };
          }
          return i;
        });
      }
      return {
        ...state,
        all: result,
      };
    }
    default: {
      return state;
    }
  }
};

export default ingredientsReducer;
