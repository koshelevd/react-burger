import feedSlice from './feed-slice';
jest.mock('../store.ts');

const reducer = feedSlice.reducer;

const { request, failed, success, setData } = feedSlice.actions;

const initialState = {
  all: [],
  isRequestProcessing: false,
  isRequestFailed: false,
  isRequestSucceded: false,
  error: null,
  total: 0,
  totalToday: 0,
};

describe('Feed slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('sets isRequestProcessing true when request', () => {
    const state = reducer(initialState, request);
    expect(state).toEqual({
      ...initialState,
      isRequestProcessing: true,
    });
  });

  it('sets isRequestFailed true when failed', () => {
    const state = reducer(initialState, failed);
    expect(state).toEqual({
      ...initialState,
      isRequestFailed: true,
    });
  });

  it('sets isRequestSucceded true when success', () => {
    const state = reducer(initialState, success);
    expect(state).toEqual({
      ...initialState,
      isRequestSucceded: true,
    });
  });

  it('setData sets all, total, totalToday', () => {
    const state = reducer(
      initialState,
      setData({ orders: [], total: 100, totalToday: 1 }),
    );
    expect(state).toEqual({
      ...initialState,
      all: [],
      total: 100,
      totalToday: 1,
    });
  });
});
