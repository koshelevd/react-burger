import websocketSlice from './websocket-slice';

const reducer = websocketSlice.reducer;

const {
  wsConnectionStop,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
} = websocketSlice.actions;

const initialState = {
  wsConnected: false,
  wsError: false,
};

describe('Feed slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('sets wsConnected and wsError to false when wsConnectionStop', () => {
    const previousState = {
      wsConnected: true,
      wsError: true,
    };
    const state = reducer(previousState, wsConnectionStop);
    expect(state).toEqual(initialState);
  });

  it('sets wsConnected true when wsConnectionSuccess', () => {
    const state = reducer(initialState, wsConnectionSuccess);
    expect(state).toEqual({
      wsConnected: true,
      wsError: false,
    });
  });

  it('sets wsError true when wsConnectionError', () => {
    const state = reducer(initialState, wsConnectionError);
    expect(state).toEqual({
      wsConnected: false,
      wsError: true,
    });
  });

  it('sets wsConnected and wsError to false when wsConnectionClosed', () => {
    const previousState = {
      wsConnected: true,
      wsError: true,
    };
    const state = reducer(previousState, wsConnectionClosed);
    expect(state).toEqual(initialState);
  });
});
