import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWebsocketState } from '../../utils/types';

const initialState = {
  wsConnected: false,
  wsError: false,
} as IWebsocketState;

const websocketSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsConnectionStart(
      state,
      action: PayloadAction<{ url: string; token?: string }>,
    ) {},

    wsConnectionStop(state) {
      state.wsConnected = false;
      state.wsError = false;
    },

    wsConnectionSuccess(state) {
      state.wsConnected = true;
      state.wsError = false;
    },

    wsConnectionError(state) {
      state.wsConnected = false;
      state.wsError = true;
    },

    wsConnectionClosed(state) {
      state.wsConnected = false;
      state.wsError = false;
    },
  },
});

export default websocketSlice;
