import {
  SET_URL_RESOURCE_CONTENT,
  SET_URL_RESOURCE_DID_ERROR_OCCUR_WHILE_FETCHING,
  SET_URL_RESOURCE_IS_LOADING,
} from '../action-types';

const initialState = {
  currentStarWarsMovie: null,
  didErrorOccurWhileFetching: true,
  isLoading: false,
  starWarsMovies: null,
  urlContent: null,
};

/** Default reducer
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default function urlContentReducer(state = initialState, action) {
  let formerUrlResourceContentData = null;
  switch (action.type) {
    case SET_URL_RESOURCE_CONTENT:
      formerUrlResourceContentData = state[action.url] || {};

      return {
        ...state,
        [action.url]: {
          ...formerUrlResourceContentData,
          content: action.payload,
        },
      };
    case SET_URL_RESOURCE_IS_LOADING:
      formerUrlResourceContentData = state[action.url] || {};

      return {
        ...state,
        [action.url]: {
          ...formerUrlResourceContentData,
          content: null,
          didErrorOccurWhileFetching: false,
          isLoading: action.payload,
        },
      };
    case SET_URL_RESOURCE_DID_ERROR_OCCUR_WHILE_FETCHING:
      formerUrlResourceContentData = state[action.url] || {};

      return {
        ...state,
        [action.url]: {
          ...formerUrlResourceContentData,
          content: null,
          didErrorOccurWhileFetching: false,
          isLoading: action.payload,
        },
      };
    default:
      return state;
  }
}
