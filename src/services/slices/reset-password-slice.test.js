import reducer, { resetPassword } from './reset-password-slice';

const initialState = {
  isRequestProcessing: false,
  isRequestFailed: false,
  isRequestSucceded: false,
  error: null,
};

describe('Reset password slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('sets isRequestProcessing true when resetPassword is pending', () => {
    const action = { type: resetPassword.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isRequestProcessing: true,
    });
  });

  it('sets isRequestSucceded true when resetPassword is successfully fulfilled', () => {
    const previousState = {
      ...initialState,
      isRequestProcessing: true,
    };
    const action = {
      type: resetPassword.fulfilled.type,
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

  it('sets error when resetPassword is fulfilled with error', () => {
    const previousState = {
      ...initialState,
      isRequestProcessing: true,
    };
    const action = {
      type: resetPassword.fulfilled.type,
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
  it('sets error when resetPassword is rejected', () => {
    const previousState = {
      ...initialState,
      isRequestProcessing: true,
    };
    const action = {
      type: resetPassword.rejected.type,
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
