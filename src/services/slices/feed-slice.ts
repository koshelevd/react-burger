import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFeedState, TOrder } from '../../utils/types';
import { useAppDispatch } from '../store';
import websocketSlice from './websocket-slice';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  WS_API_URL,
  WS_FEED_ENDPOINT,
  WS_USER_ORDERS_ENDPOINT,
} from '../../utils/constants';
import { getCookie } from '../../utils/cookies';

export const loadFeed = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(
      websocketSlice.actions.wsConnectionStart({
        url: `${WS_API_URL}${WS_FEED_ENDPOINT}`,
      }),
    );
    dispatch(feedSlice.actions.request());
  };
};

export const loadUserFeed = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(
      websocketSlice.actions.wsConnectionStart({
        url: `${WS_API_URL}${WS_USER_ORDERS_ENDPOINT}`,
        token: getCookie(ACCESS_TOKEN_COOKIE_NAME),
      }),
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
