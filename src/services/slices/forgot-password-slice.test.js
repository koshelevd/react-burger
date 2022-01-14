import reducer, { forgotPassword } from './forgot-password-slice';

const initialState = {
  isRequestProcessing: false,
  isRequestFailed: false,
  isRequestSucceded: false,
  error: null,
};

describe('Forgot password slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('sets isRequestProcessing true when forgotPassword is pending', () => {
    const action = { type: forgotPassword.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isRequestProcessing: true,
    });
  });

  it('sets isRequestSucceded true when forgotPassword is successfully fulfilled', () => {
    const previousState = {
      ...initialState,
      isRequestProcessing: true,
    };
    const action = {
      type: forgotPassword.fulfilled.type,
      payload: {
        success: true,
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isRequestProcessing: false,
      isRequestSucceded: true,
    });
  });

  it('sets error when forgotPassword is fulfilled with error', () => {
    const previousState = {
      ...initialState,
      isRequestProcessing: true,
    };
    const action = {
      type: forgotPassword.fulfilled.type,
      payload: {
        success: false,
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'error',
      isRequestProcessing: false,
    });
  });
  it('sets error when forgotPassword is rejected', () => {
    const previousState = {
      ...initialState,
      isRequestProcessing: true,
    };
    const action = {
      type: forgotPassword.rejected.type,
      error: {
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isRequestFailed: true,
      error: 'error',
    });
  });
});
