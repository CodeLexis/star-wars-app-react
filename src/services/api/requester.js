import axios from 'axios';

import {
  DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD,
} from './constants';
import {
  deleteAuthToken,
  isAuthTokenExpired,
  refreshAuthToken,
  retrieveAuthToken,
} from './utils';


/** Class for making API requests */
export default class Requester {
  /** Constructor
   * @param {Object} props
  */
  constructor(props) {
    const { apiBaseUrl } = props;
    this.apiBaseUrl = apiBaseUrl;
  }

  /** Resolves the full url for an API endpoint
   * @param {string} endpoint
   * @return {string}
   */
  _getFullUrl(endpoint) {
    return `${this.apiBaseUrl}/${endpoint}`;
  }

  /** Returns the response data for a failed request
   * @param {Object} error
   * @return {Object}
   */
  _handleError(error) {
    return error.response ? error.response.data : {};
  }

  /** Returns the response data for a successful request
   * @param {Object} response
   * @return {Object}
   */
  _handleResponse(response) {
    return response.data.responseData || response.data;
  }

  /** Makes an API request
   * @param {Object} params
   * @return {Object}
   */
  async _makeHttpRequest(params) {
    const {
      url, method, headers={'Content-Type': 'application/json'},
      args, body, auth: isAuthRequired,
    } = params;

    let authToken = null;

    // check if auth token has expired, refresh token if necessary
    if (isAuthRequired) {
      const hasAuthTokenExpired = isAuthTokenExpired();

      if (hasAuthTokenExpired === true) {
        deleteAuthToken();
        await refreshAuthToken();
        const authTokenObj = retrieveAuthToken();
        authToken = authTokenObj.authToken;
      }
    }

    if (authToken && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    if (isAuthRequired === false) {
      delete headers['Authorization'];
    }

    return axios({
      url,
      method,
      headers,
      params: args,
      data: body,
      mode: 'no-cors',
      proxy: {
        host: '172.16.10.20',
        port: 8080,
      },
    });
  }

  /** Makes a POST request
   * @param {Object} params
   * @return {Object}
   */
  async post(params) {
    const { endpoint, headers, body, args, auth } = params;
    try {
      const response = await this._makeHttpRequest({
        url: this._getFullUrl(endpoint),
        method: POST_METHOD,
        headers,
        body: body,
        args: args,
        auth,
      });

      return {
        status: 'SUCCESS',
        response: this._handleResponse(response),
        code: response.status,
      };
    } catch (error) {
      return {
        status: 'ERROR',
        response: this._handleError(error),
        code: error.response ? error.response.status : null,
      };
    }
  }

  /** Makes a GET request
   * @param {Object} params
   * @return {Object}
   */
  async get(params) {
    const { endpoint, headers, args, auth } = params;

    try {
      const response = await this._makeHttpRequest({
        url: this._getFullUrl(endpoint),
        method: GET_METHOD,
        headers: headers,
        args: args,
        body: null,
        auth,
      });

      return {
        status: 'SUCCESS',
        response: this._handleResponse(response),
        code: response.status,
      };
    } catch (error) {
      return {
        status: 'ERROR',
        response: this._handleError(error),
        code: error.response ? error.response.status : null,
      };
    }
  }

  /** Makes a PUT request
   * @param {Object} params
   * @return {Object}
   */
  async put(params) {
    const { endpoint, headers, body, args, auth } = params;

    try {
      const response = await this._makeHttpRequest({
        url: this._getFullUrl(endpoint),
        method: PUT_METHOD,
        headers: headers,
        args: args,
        body: body,
        auth,
      });

      return {
        status: 'SUCCESS',
        response: this._handleResponse(response),
        code: response.status,
      };
    } catch (error) {
      return {
        status: 'ERROR',
        response: this._handleError(error),
        code: error.response ? error.response.status : null,
      };
    }
  }

  /** Makes a DELETE request
   * @param {Object} params
   * @return {Object}
   */
  async delete(params) {
    const { endpoint, headers, body, args, auth } = params;

    try {
      const response = await this._makeHttpRequest({
        url: this._getFullUrl(endpoint),
        method: DELETE_METHOD,
        headers: headers,
        args: args,
        body: body,
        auth,
      });

      return {
        status: 'SUCCESS',
        response: this._handleResponse(response),
        code: response.status,
      };
    } catch (error) {
      return {
        status: 'ERROR',
        response: this._handleError(error),
        code: error.response ? error.response.status : null,
      };
    }
  }
}
