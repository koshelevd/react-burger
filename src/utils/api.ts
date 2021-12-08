import { API_URL, ENDPOINTS, ERROR_TEXT } from './api-conf';
import { getCookie, setCookie } from './cookies';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from './constants';
import {
  IApiOptions,
  IApiResponse,
  IEndpointsConf,
  THeaders,
  TOrderData,
  TRequestData,
  TResponseBody,
  TUrl,
} from './types';

class Api {
  protected readonly getIngredientsUrl: TUrl;
  protected readonly checkoutUrl: TUrl;
  protected readonly forgotPasswordUrl: TUrl;
  protected readonly resetPasswordUrl: TUrl;
  protected readonly signUpUrl: TUrl;
  protected readonly signInUrl: TUrl;
  protected readonly signOutUrl: TUrl;
  protected readonly refreshTokenUrl: TUrl;
  protected readonly profileUrl: TUrl;
  protected readonly headers: THeaders;

  constructor(baseUrl: TUrl, endpoints: IEndpointsConf) {
    // Initialize object.
    this.getIngredientsUrl = baseUrl + endpoints.ingredients;
    this.checkoutUrl = baseUrl + endpoints.checkout;
    this.forgotPasswordUrl = baseUrl + endpoints.forgotPassword;
    this.resetPasswordUrl = baseUrl + endpoints.resetPassword;
    this.signUpUrl = baseUrl + endpoints.signUp;
    this.signInUrl = baseUrl + endpoints.signIn;
    this.signOutUrl = baseUrl + endpoints.signOut;
    this.refreshTokenUrl = baseUrl + endpoints.refreshToken;
    this.profileUrl = baseUrl + endpoints.profile;
    // this.headers = new Headers();
    // this.headers.set('Accept', 'application/json')
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    };
  }

  protected async _processResponse(response: Response): Promise<IApiResponse> {
    // Return JSON response if status is ok or generate error.
    if (response.ok) {
      return await response.json();
    }
    const responseJSON = await response.json();
    const message = responseJSON.message ?? `${ERROR_TEXT}: ${response.status}`;
    return Promise.reject(new Error(message));
  }

  protected _postRequest(url: TUrl, data: {}): Promise<IApiResponse> {
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._processResponse);
  }

  protected _retriableFetch = async (
    url: TUrl,
    options: IApiOptions,
  ): Promise<IApiResponse> => {
    try {
      const res = await fetch(url, options);
      return await this._processResponse(res);
    } catch (err) {
      if ((err as TResponseBody)?.message === 'jwt expired') {
        const refreshData = await this.refreshToken();
        setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshData.refreshToken);
        setCookie(
          ACCESS_TOKEN_COOKIE_NAME,
          refreshData.accessToken?.split('Bearer ')[1],
        );
        options.headers = options.headers ?? {};
        // options.headers.set('authorization', refreshData.accessToken)
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await this._processResponse(res);
      } else {
        throw err;
      }
    }
  };

  public getUserInfo(): Promise<IApiResponse> {
    // Get user's profile info.
    const token = getCookie(ACCESS_TOKEN_COOKIE_NAME);
    return this._retriableFetch(this.profileUrl, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${token}`,
      },
    });
  }

  public patchUserInfo(data: TRequestData): Promise<IApiResponse> {
    // Change user's profile info.
    const token = getCookie(ACCESS_TOKEN_COOKIE_NAME);
    return this._retriableFetch(this.profileUrl, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  public getIngredients(): Promise<IApiResponse> {
    // Get all ingredients data.
    return fetch(this.getIngredientsUrl, {
      headers: this.headers,
    }).then(this._processResponse);
  }

  public checkout(data: TOrderData): Promise<IApiResponse> {
    // Process checkout: post ingredients.
    const token = getCookie(ACCESS_TOKEN_COOKIE_NAME);
    return this._retriableFetch(this.checkoutUrl, {
      method: 'POST',
      headers: {
        ...this.headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  // Post data to obtain verification token for pass reset.
  public forgotPassword = (data: TRequestData): Promise<IApiResponse> =>
    this._postRequest(this.forgotPasswordUrl, data);

  // Post data to reset password.
  public resetPassword = (data: TRequestData): Promise<IApiResponse> =>
    this._postRequest(this.resetPasswordUrl, data);

  // Post data to register new user.
  public signUp = (data: TRequestData): Promise<IApiResponse> => this._postRequest(this.signUpUrl, data);

  // Post data to login user.
  public signIn = (data: TRequestData): Promise<IApiResponse> => this._postRequest(this.signInUrl, data);

  // Post data to logout user.
  public signOut = (): Promise<IApiResponse> =>
    this._postRequest(this.signOutUrl, {
      token: getCookie(REFRESH_TOKEN_COOKIE_NAME),
    });

  // Post refresh token to retreive fresh access token.
  public refreshToken = (): Promise<IApiResponse> =>
    this._postRequest(this.refreshTokenUrl, {
      token: getCookie(REFRESH_TOKEN_COOKIE_NAME),
    });
}

const api = new Api(API_URL, ENDPOINTS);
export default api;
