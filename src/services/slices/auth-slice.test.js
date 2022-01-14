import authSlice, {
  signIn,
  signUp,
  signOut,
  getProfile,
  patchProfile,
} from './auth-slice';

const reducer = authSlice.reducer;

const initialRequestState = {
  isRequestFailed: false,
  isRequestProcessing: false,
  isRequestSucceded: false,
};

const initialState = {
  error: null,
  isLoggedIn: false,
  profile: { ...initialRequestState },
  signIn: { ...initialRequestState },
  signOut: { ...initialRequestState },
  signUp: { ...initialRequestState },
  user: null,
};

const testUser = {
  name: 'Test User',
  email: 'user@test.net',
};

describe('Auth slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('sets signIn.isRequestProcessing true when signIn is pending', () => {
    const action = { type: signIn.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      signIn: { ...initialRequestState, isRequestProcessing: true },
    });
  });
  it('sets signUp.isRequestProcessing true when signUp is pending', () => {
    const action = { type: signUp.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      signUp: { ...initialRequestState, isRequestProcessing: true },
    });
  });
  it('sets signOut.isRequestProcessing true when signOut is pending', () => {
    const action = { type: signOut.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      signOut: { ...initialRequestState, isRequestProcessing: true },
    });
  });
  it('sets profile.isRequestProcessing true when getProfile is pending', () => {
    const action = { type: getProfile.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      profile: { ...initialRequestState, isRequestProcessing: true },
    });
  });
  it('sets profile.isRequestProcessing true when patchProfile is pending', () => {
    const action = { type: patchProfile.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      profile: { ...initialRequestState, isRequestProcessing: true },
    });
  });

  it('sets user and isLoggedIn true when signIn is successfully fulfilled', () => {
    const previousState = {
      ...initialState,
      signIn: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: signIn.fulfilled.type,
      payload: {
        success: true,
        user: testUser,
        accessToken: 'Bearer 123',
        refreshToken: '456',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: testUser,
    });
  });
  it('sets user and isLoggedIn true when signUp is successfully fulfilled', () => {
    const previousState = {
      ...initialState,
      signUp: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: signUp.fulfilled.type,
      payload: {
        success: true,
        user: testUser,
        accessToken: 'Bearer 123',
        refreshToken: '456',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: testUser,
    });
  });
  it('sets user to null and isLoggedIn false when signOut is successfully fulfilled', () => {
    const previousState = {
      ...initialState,
      isLoggedIn: true,
      user: testUser,
      signOut: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: signOut.fulfilled.type,
      payload: { success: true, message: 'Successful logout' },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: false,
      user: null,
    });
  });
  it('sets user when getProfile is successfully fulfilled', () => {
    const previousState = {
      ...initialState,
      isLoggedIn: true,
      profile: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: getProfile.fulfilled.type,
      payload: { success: true, user: testUser },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: testUser,
    });
  });
  it('sets new user when patchProfile is successfully fulfilled', () => {
    const previousState = {
      ...initialState,
      isLoggedIn: true,
      user: testUser,
      profile: { ...initialRequestState, isRequestProcessing: true },
    };
    const newUser = {
      name: 'Some new user name',
      email: 'new@email.test',
    };
    const action = {
      type: patchProfile.fulfilled.type,
      payload: { success: true, user: newUser },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: newUser,
    });
  });

  it('sets error when signIn is fulfilled with error', () => {
    const previousState = {
      ...initialState,
      signIn: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: signIn.fulfilled.type,
      payload: {
        success: false,
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'error',
    });
  });
  it('sets error when signUp is fulfilled with error', () => {
    const previousState = {
      ...initialState,
      signUp: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: signUp.fulfilled.type,
      payload: {
        success: false,
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'error',
    });
  });
  it('sets error when signOut is fulfilled with error', () => {
    const previousState = {
      ...initialState,
      isLoggedIn: true,
      user: testUser,
      signOut: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: signOut.fulfilled.type,
      payload: {
        success: false,
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: testUser,
      error: 'error',
    });
  });
  it('sets error when getProfile is fulfilled with error', () => {
    const previousState = {
      ...initialState,
      isLoggedIn: true,
      profile: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: getProfile.fulfilled.type,
      payload: {
        success: false,
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      error: 'error',
    });
  });
  it('sets error when patchProfile is fulfilled with error', () => {
    const previousState = {
      ...initialState,
      isLoggedIn: true,
      user: testUser,
      profile: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: patchProfile.fulfilled.type,
      payload: {
        success: false,
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: testUser,
      error: 'error',
    });
  });

  it('sets error when signIn is rejected', () => {
    const previousState = {
      ...initialState,
      signIn: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: signIn.rejected.type,
      error: {
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      signIn: { ...initialRequestState, isRequestFailed: true },
      error: 'error',
    });
  });
  it('sets error when signUp is rejected', () => {
    const previousState = {
      ...initialState,
      signUp: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: signUp.rejected.type,
      error: {
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      signUp: { ...initialRequestState, isRequestFailed: true },
      error: 'error',
    });
  });
  it('sets error when signOut is rejected', () => {
    const previousState = {
      ...initialState,
      isLoggedIn: true,
      user: testUser,
      signOut: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: signOut.rejected.type,
      error: {
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: testUser,
      signOut: { ...initialRequestState, isRequestFailed: true },
      error: 'error',
    });
  });
  it('sets error when getProfile is rejected', () => {
    const previousState = {
      ...initialState,
      isLoggedIn: true,
      profile: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: getProfile.rejected.type,
      error: {
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      profile: { ...initialRequestState, isRequestFailed: true },
      error: 'error',
    });
  });
  it('sets error when patchProfile is rejected', () => {
    const previousState = {
      ...initialState,
      isLoggedIn: true,
      user: testUser,
      profile: { ...initialRequestState, isRequestProcessing: true },
    };
    const action = {
      type: patchProfile.rejected.type,
      error: {
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: testUser,
      profile: { ...initialRequestState, isRequestFailed: true },
      error: 'error',
    });
  });
  it('sets error to null when clearing error', () => {
    const previousState = {
      ...initialState,
      error: 'error',
    };
    const state = reducer(previousState, authSlice.actions.clearError);
    expect(state).toEqual(initialState);
  });
});
