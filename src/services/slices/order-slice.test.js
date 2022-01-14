import reducer, { checkout } from './order-slice';

const initialState = {
  info: {},
  isRequestProcessing: false,
  isRequestFailed: false,
  error: null,
};

const testOrder = {
  _id: '56789',
  number: 12345,
  price: 123,
  name: 'Test name',
  createdAt: 'date',
  updatedAt: 'date',
  status: 'created',
  owner: {},
  ingredients: [],
};

describe('Order slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('sets isRequestProcessing true when checkout is pending', () => {
    const action = { type: checkout.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isRequestProcessing: true,
    });
  });

  it('sets info when checkout is successfully fulfilled', () => {
    const previousState = {
      ...initialState,
      isRequestProcessing: true,
    };
    const action = {
      type: checkout.fulfilled.type,
      payload: {
        order: testOrder,
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isRequestProcessing: false,
      info: testOrder,
    });
  });

  it('sets error when checkout is rejected', () => {
    const previousState = {
      ...initialState,
      isRequestProcessing: true,
    };
    const action = {
      type: checkout.rejected.type,
      error: 'error',
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isRequestFailed: true,
      error: 'error',
    });
  });
});
