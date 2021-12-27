import { AnyAction, MiddlewareAPI } from 'redux';
import websocketSlice from '../slices/websocket-slice';
import api from '../../utils/api';
import { setCookie } from '../../utils/cookies';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  WS_API_URL_USER_ORDERS,
} from '../../utils/constants';
import feedSlice from '../slices/feed-slice';

const {
  wsConnectionStart,
  wsConnectionStop,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
} = websocketSlice.actions;

export const socketMiddleware = () => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsConnectionStart.type) {
        const wsUrl: string = payload.token
          ? `${payload.url}?token=${payload.token}`
          : `${payload.url}`;      
        socket = new WebSocket(wsUrl);
      }

      if (type === wsConnectionStop.type) {
        socket && socket.close(1000, 'CLOSE_NORMAL');
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsConnectionSuccess());
        };

        socket.onerror = () => {
          dispatch(wsConnectionError());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const { success, ...parsedData } = JSON.parse(data);
          if (success) {
            dispatch(feedSlice.actions.success());
          }
          if (
            parsedData.message &&
            parsedData.message === 'Invalid or missing token'
          ) {
            socket && socket.close(1000, 'CLOSE_NORMAL');
            api
              .refreshToken()
              .then((res) => {
                if (res.success) {
                  const wsToken = res.accessToken?.split('Bearer ')[1];
                  setCookie(ACCESS_TOKEN_COOKIE_NAME, wsToken);
                  setCookie(REFRESH_TOKEN_COOKIE_NAME, res.refreshToken);
                  const wsUrl: string = `${WS_API_URL_USER_ORDERS}?token=${wsToken}`;
                  socket = new WebSocket(wsUrl);
                } else {
                  throw Error(res.message);
                }
              })
              .catch(() => {
                dispatch(wsConnectionError());
              });
          }
          dispatch(feedSlice.actions.setData(parsedData));
        };

        socket.onclose = (event) => {
          dispatch(wsConnectionClosed());
        };
      }

      next(action);
    };
  };
};
