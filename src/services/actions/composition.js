import { v4 as uuid } from 'uuid';

export const GET_COMPOSITION = 'GET_COMPOSITION';
export const CLEAR_COMPOSITION = 'CLEAR_COMPOSITION';
export const ADD_COMPOSITION_ITEM = 'ADD_COMPOSITION_ITEM';
export const REMOVE_COMPOSITION_ITEM = 'REMOVE_COMPOSITION_ITEM';
export const SELECT_ACTIVE_BUN = 'SELECT_ACTIVE_BUN';
export const SWAP_ITEMS = 'SWAP_ITEMS';

export function addCompositionItem(item) {
  return function (dispatch) {
    const ingredient = {
      ...item,
      uuid: uuid(),
    };

    dispatch({
      type: ADD_COMPOSITION_ITEM,
      ingredient,
    });
  };
}
