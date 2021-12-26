import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFeedState, TOrder } from '../../utils/types';
import { useAppDispatch } from '../store';
import websocketSlice from './websocket-slice';
import { WS_API_URL_ALL_ORDERS } from '../../utils/constants';

export const loadFeed = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(
      websocketSlice.actions.wsConnectionStart({ url: WS_API_URL_ALL_ORDERS }),
    );
    dispatch(feedSlice.actions.request());
  };
};

export const closeFeed = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(websocketSlice.actions.wsConnectionStop());
  };
};

const initialState = {
  all: [],
  isRequestProcessing: false,
  isRequestFailed: false,
  isRequestSucceded: false,
  error: null,
  total: 0,
  totalToday: 0,
} as IFeedState;

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    request(state) {
      state.isRequestProcessing = true;
      state.isRequestFailed = false;
      state.isRequestSucceded = false;
    },
    failed(state) {
      state.isRequestFailed = true;
      state.isRequestProcessing = false;
      state.isRequestSucceded = false;
    },
    success(state) {
      state.isRequestSucceded = true;
      state.isRequestProcessing = false;
      state.isRequestFailed = false;
    },
    setData(
      state,
      action: PayloadAction<{
        orders: Array<TOrder>;
        total: number;
        totalToday: number;
      }>,
    ) {
      state.all = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export default feedSlice;
