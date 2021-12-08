import { IEndpointsConf, TUrl } from "./types";

export const API_URL: TUrl = 'https://norma.nomoreparties.space/api';
export const ENDPOINTS: IEndpointsConf = {
  ingredients: '/ingredients',
  checkout: '/orders',
  forgotPassword: '/password-reset',
  resetPassword: '/password-reset/reset',
  signUp: '/auth/register',
  signIn: '/auth/login',
  signOut: '/auth/logout',
  refreshToken: '/auth/token',
  profile: '/auth/user'
};
export const ERROR_TEXT: string = 'Error';
