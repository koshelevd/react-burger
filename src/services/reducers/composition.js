import {
  GET_COMPOSITION,
  ADD_COMPOSITION_ITEM,
  REMOVE_COMPOSITION_ITEM,
} from '../actions/composition';

const initialState = [];

const compositionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPOSITION: {
      return state;
    }
    case ADD_COMPOSITION_ITEM: {
      return [...state, action.ingredient];
    }
    case REMOVE_COMPOSITION_ITEM: {
      let result = state;
      result.splice(action.index, 1);
      return result;
    }
    default: {
      return state;
    }
  }
};

export default compositionReducer;
