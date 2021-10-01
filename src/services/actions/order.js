import api from '../../utils/api';
import { OPEN_ORDER_MODAL } from '.';
export const GET_CHECKOUT_REQUEST = 'GET_CHECKOUT_REQUEST';
export const GET_CHECKOUT_SUCCESS = 'GET_CHECKOUT_SUCCESS';
export const GET_CHECKOUT_FAILED = 'GET_CHECKOUT_FAILED';

export function checkout(data) {
  return function (dispatch) {
    dispatch({
      type: GET_CHECKOUT_REQUEST,
    });
    api
      .checkout(data)
      .then((res) => {
        dispatch({
          type: GET_CHECKOUT_SUCCESS,
          info: res.order,
        });
        dispatch({ type: OPEN_ORDER_MODAL });
      })
      .catch((err) =>
        dispatch({
          type: GET_CHECKOUT_FAILED,
          error: err,
        }),
      );
  };
}