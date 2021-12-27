import { SerializedError } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { FormEventHandler, RefObject } from 'react';

type TFetchMethod = 'PATCH' | 'POST';
type TRequestBody = string;

export type TFormInfo = {
  linkTitle: string;
  linkUrl: string;
  text: string;
};

export type TUrl = string;

export type TEndpoint = string;

export type TRequestData<TDataKey extends string, TDataType> = {
  [key in TDataKey]: TDataType;
};

export type TIngedientId = string;

export type TOrderData = {
  ingredients: Array<TIngedientId | undefined>;
};

export type TIngredientType = {
  slug: string;
  title: string;
};

export type TCookiesProps = {
  expires?: Date | number | string;
} & { [key: string]: string };

export type TIngredient = {
  id?: TIngedientId;
  index: number;
  uuid?: string;
  count?: number;
  readonly _id: TIngedientId;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TUser = {
  readonly name: string;
  readonly email: string;
  readonly password?: string;
};

export type THeaders = {
  Accept?: string;
  'Content-Type': string;
  authorization?: string;
} & HeadersInit;

export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: THeaders;
};

export interface IEndpointsConf {
  readonly ingredients: TEndpoint;
  readonly checkout: TEndpoint;
  readonly forgotPassword: TEndpoint;
  readonly resetPassword: TEndpoint;
  readonly signUp: TEndpoint;
  readonly signIn: TEndpoint;
  readonly signOut: TEndpoint;
  readonly refreshToken: TEndpoint;
  readonly profile: TEndpoint;
}

export interface IApiOptions {
  readonly method?: TFetchMethod;
  headers: THeaders;
  readonly body?: TRequestBody;
}

export interface IApiResponse extends Response {
  readonly refreshToken?: string;
  readonly accessToken?: string;
  readonly order?: TOrder;
  readonly success: boolean;
  readonly message?: string;
  readonly user?: TUser;
  readonly data?: Array<TIngredient>;
}

export interface IAuthFormProps {
  header: string;
  buttonText: string;
  formInfo?: Array<TFormInfo>;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  isValid: boolean;
  error?: string | null;
}

export interface IDraggableConstructorElementProps {
  item: TIngredient;
  index: number;
}

export interface IIngredientCardProps {
  data: TIngredient;
}

export type TIngredientCount = TIngredient & { count?: number };

export interface IOrderItemProps {
  data: TIngredientCount;
}

export interface IIngredientPreviewProps {
  data: TIngredient;
  count?: number;
}

export interface IOrderCardProps {
  data: TOrder;
}

export interface IModalProps {
  header?: string;
  closeHandler?: () => void;
}

export interface IModalOverlayProps {
  closeHandler?: () => void;
}

export interface IRequireAuthProps {
  redirectTo?: string;
}

export type TOrder = {
  _id: string;
  number: number;
  price: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: 'created' | 'pending' | 'done';
  owner: TUser;
  ingredients: Array<TIngedientId>;
};

export interface IOrderState {
  info: TOrder | undefined;
  isRequestProcessing: boolean;
  isRequestFailed: boolean;
  error: SerializedError | null;
}

type TRequestStatus = {
  isRequestProcessing: boolean;
  isRequestFailed: boolean;
  isRequestSucceded: boolean;
};

export interface IAuthState {
  isLoggedIn: boolean;
  user: TUser | null | undefined;
  profile: TRequestStatus;
  signUp: TRequestStatus;
  signIn: TRequestStatus;
  signOut: TRequestStatus;
  error: string | null | undefined;
}

export interface IWebsocketState {
  wsConnected: boolean;
  wsError: boolean;
}

export interface IPasswordState {
  isRequestProcessing: boolean;
  isRequestFailed: boolean;
  isRequestSucceded: boolean;
  error: string | null | undefined;
  responseError?: string | null | undefined;
}

export interface IFeedState {
  all: Array<TOrder>;
  total: number;
  totalToday: number;
  isRequestProcessing: boolean;
  isRequestFailed: boolean;
  isRequestSucceded: boolean;
  error: string | null | undefined;
}

export interface IIngredientState {
  all: Array<TIngredient> | undefined;
  types: Array<TIngredientType>;
  isRequestProcessing: boolean;
  isRequestFailed: boolean;
  isRequestSucceded: boolean;
  error: string | null | undefined;
}

export interface ICompositionState {
  components: Array<TIngredient>;
  activeBun: TIngredient | null;
}

export interface IUseTopType {
  listRef: RefObject<HTMLDivElement>;
  onScroll: () => void;
  topType: string;
}

export interface TFormValues {
  [fieldName: string]: string;
}

export interface TFormErrors {
  [fieldName: string]: string;
}
