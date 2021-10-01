import {
  GET_COMPOSITION,
  ADD_COMPOSITION_ITEM,
  REMOVE_COMPOSITION_ITEM,
  SELECT_ACTIVE_BUN,
  SWAP_ITEMS,
} from '../actions/composition';

const initialState = {
  components: [],
  activeBun: null,
};

const compositionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPOSITION: {
      return state;
    }
    case ADD_COMPOSITION_ITEM: {
      return {
        ...state,
        components: [...state.components, action.ingredient],
      };
    }
    case REMOVE_COMPOSITION_ITEM: {
      let result = state.components;
      result.splice(action.index, 1);
      return {
        ...state,
        components: result,
      };
    }
    case SELECT_ACTIVE_BUN: {
      return {
        ...state,
        activeBun: action.ingredient,
      };
    }
    case SWAP_ITEMS: {
      const components = [...state.components];
      components.splice(
        action.hoverIndex,
        0,
        components.splice(action.dragIndex, 1)[0],
      );
      return {
        ...state,
        components: components,
      };
    }
    default: {
      return state;
    }
  }
};

export default compositionReducer;
