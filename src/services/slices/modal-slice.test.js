import reducer, { openOrder, closeModals } from './modal-slice';
import { checkout } from './order-slice';

const initialState = {
  order: false,
};

describe('Modal slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('sets order true when openOrder', () => {
    const state = reducer(initialState, openOrder);
    expect(state).toEqual({
      order: true,
    });
  });

  it('sets order false when closeModals', () => {
    const previousState = {
      order: true,
    };
    const state = reducer(previousState, closeModals);
    expect(state).toEqual({
      order: false,
    });
  });

  it('sets order true after checkout', () => {
    const action = {
      type: checkout.fulfilled.type,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      order: true,
    });
  });
});
