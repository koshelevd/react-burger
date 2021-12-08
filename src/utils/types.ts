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

export type TRequestData<TDataKey extends string = '', TDataType = {}> = {
  [key in TDataKey]: TDataType;
};

export type TIngedientId = string;

export type TOrderData = {
  ingredients: Array<TIngedientId>;
};

export type TIngredientType = {
  slug: string;
  title: string;
};

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
  readonly password?: string 
} 

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
  readonly order?: TResponseBody;
  readonly success?: boolean;
  readonly message?: string;
  readonly user?: TUser;
}

export interface IAuthFormProps {
  header: string;
  buttonText: string;
  formInfo?: Array<TFormInfo>;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  isValid: boolean;
  error?: string;
}

export interface IDraggableConstructorElementProps {
  item: TIngredient;
  index: number;
}

export interface IIngredientCardProps {
  data: TIngredient;
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

type TOrder = {
  number?: string;
};

export interface IOrderState {
  info: TOrder;
  isRequestProcessing: boolean;
  isRequestFailed: boolean;
  error: SerializedError | null;
}

export interface IForgotPasswordState {
  isRequestProcessing: boolean;
  isRequestFailed: boolean;
  isRequestSucceded: boolean;
  error: SerializedError | null;
}

type TRequestStatus = {
  isRequestProcessing: boolean;
  isRequestFailed: boolean;
};

export interface IAuthState {
  isLoggedIn: boolean;
  user: TUser;
  profile: TRequestStatus;
  signUp: TRequestStatus;
  signIn: TRequestStatus;
  signOut: TRequestStatus;
  error: SerializedError | null;
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
