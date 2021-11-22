import { API_URL, ENDPOINTS, ERROR_TEXT } from './api-conf';
import { getCookie, setCookie } from './cookies';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from './constants';

class Api {
  constructor(baseUrl, endpoints) {
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
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    };
  }

  async _processResponse(response) {
    // Return JSON response if status is ok or generate error.
    if (response.ok) {
      return await response.json();
    }
    const responseJSON = await response.json();
    const message = responseJSON.message ?? `${ERROR_TEXT}: ${response.status}`;
    return Promise.reject(new Error(message));
  }

  _postRequest(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._processResponse);
  }

  _retriableFetch = async (url, options = {}) => {
    try {
      const res = await fetch(url, options);
      return await this._processResponse(res);
    } catch (err) {
      if (err.message === 'jwt expired') {
        const refreshData = await this.refreshToken();
        setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshData.refreshToken);
        setCookie(
          ACCESS_TOKEN_COOKIE_NAME,
          refreshData.accessToken.split('Bearer ')[1],
        );
        options.headers = options.headers ?? {};
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await this._processResponse(res);
      } else {
        throw err;
      }
    }
  };

  getUserInfo() {
    // Get user's profile info.
    const token = getCookie(ACCESS_TOKEN_COOKIE_NAME);
    return this._retriableFetch(this.profileUrl, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${token}`,
      },
    });
  }

  patchUserInfo(data) {
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

  getIngredients() {
    // Get all ingredients data.
    return fetch(this.getIngredientsUrl, {
      headers: this.headers,
    }).then(this._processResponse);
  }

  checkout(data) {
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
  forgotPassword = (data) => this._postRequest(this.forgotPasswordUrl, data);

  // Post data to reset password.
  resetPassword = (data) => this._postRequest(this.resetPasswordUrl, data);

  // Post data to register new user.
  signUp = (data) => this._postRequest(this.signUpUrl, data);

  // Post data to login user.
  signIn = (data) => this._postRequest(this.signInUrl, data);

  // Post data to logout user.
  signOut = () =>
    this._postRequest(this.signOutUrl, {
      token: getCookie(REFRESH_TOKEN_COOKIE_NAME),
    });

  // Post refresh token to retreive fresh access token.
  refreshToken = () =>
    this._postRequest(this.refreshTokenUrl, {
      token: getCookie(REFRESH_TOKEN_COOKIE_NAME),
    });
}

const api = new Api(API_URL, ENDPOINTS);
export default api;
