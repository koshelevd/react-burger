import {
  API_URL,
  INGREDIENTS_ENDPOINT,
  CHECKOUT_ENDPOINT,
  ERROR_TEXT,
} from './api-conf';

class Api {
  constructor(baseUrl, getIngredientsEndpoint, checkoutEndpoint) {
    // Initialize object.
    this.getIngredientsUrl = baseUrl + getIngredientsEndpoint;
    this.checkoutUrl = baseUrl + checkoutEndpoint;
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  _processResponse(response) {
    // Return JSON response if status is ok or generate error.
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`${ERROR_TEXT}: ${response.status}`));
  }

  getIngredients() {
    // Get all ingredients data.
    return fetch(this.getIngredientsUrl, {
      headers: this.headers,
    }).then(this._processResponse);
  }

  checkout(data) {
    // Process checkout: post ingredients.
    return fetch(this.checkoutUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._processResponse);
  }
}

const api = new Api(API_URL, INGREDIENTS_ENDPOINT, CHECKOUT_ENDPOINT);
export default api;
