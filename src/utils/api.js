import { API_URL, INGREDIENTS_ENDPOINT, ERROR_TEXT } from './api-conf';

class Api {
  constructor(baseUrl, endpoint) {
    // Initialize object.
    this.url = baseUrl + endpoint;
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
    return fetch(this.url, {
      headers: this.headers,
    }).then(this._processResponse);
  }
}

const api = new Api(API_URL, INGREDIENTS_ENDPOINT);
export default api;
