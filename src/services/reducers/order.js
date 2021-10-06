import {
  GET_CHECKOUT_REQUEST,
  GET_CHECKOUT_SUCCESS,
  GET_CHECKOUT_FAILED,
} from '../actions/order';

const initialState = {
  info: {},
  isRequestProcessing: false,
  isRequestFailed: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHECKOUT_REQUEST: {
      return {
        ...state,
        isRequestProcessing: true,
        isRequestFailed: false,
        error: null,
      };
    }
    case GET_CHECKOUT_SUCCESS: {
      return {
        ...state,
        info: action.info,
        isRequestProcessing: false,
      };
    }
    case GET_CHECKOUT_FAILED: {
      return {
        ...state,
        isRequestFailed: true,
        error: action.error,
        isRequestProcessing: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default orderReducer;
