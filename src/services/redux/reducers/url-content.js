import {
  ON_FETCH_MOVIE_CHARACTERS_FAILURE,
  ON_FETCH_MOVIE_CHARACTERS_SUCCESS,
  ON_FETCH_MOVIE_CHARACTERS_START,
  SET_URL_RESOURCE_CONTENT,
  SET_URL_RESOURCE_DID_ERROR_OCCUR_WHILE_FETCHING,
  SET_URL_RESOURCE_IS_LOADING,
} from '../action-types';

const initialState = {
  currentStarWarsMovie: null,
  didErrorOccurWhileFetching: false,
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
    case ON_FETCH_MOVIE_CHARACTERS_FAILURE:
      return {
        ...state,
        didErrorOccurWhileFetching: true,
        isLoading: false,
      };
    case ON_FETCH_MOVIE_CHARACTERS_SUCCESS:
      return {
        ...state,
        didErrorOccurWhileFetching: false,
        isLoading: false,
      };
    case ON_FETCH_MOVIE_CHARACTERS_START:
      return {
        ...state,
        didErrorOccurWhileFetching: false,
        isLoading: true,

      };
    default:
      return state;
  }
}
