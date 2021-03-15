import {
  ON_API_CALL_FAILURE,
  ON_API_CALL_SUCCESS,
  SET_IS_LOADING,
  SET_STAR_WARS_MOVIE_LIST,
} from '../action-types';


const initialState = {
  currentStarWarsMovie: null,
  didErrorOccurWhileFetching: true,
  isLoading: false,
  starWarsMovies: null,
};


/** Default reducer
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ON_API_CALL_FAILURE:
      return {
        ...state,
        didErrorOccurWhileFetching: true,
        errorMessage: action.errorMessage,
      };
    case ON_API_CALL_SUCCESS:
      return {
        ...state,
        successMessage: action.successMessage,
      };
    case SET_CURRENT_STAR_WARS_MOVIE:
      return {
        ...state,
        currentStarWarsMovie: action.data,
      };
    case SET_STAR_WARS_MOVIE_LIST:
      return {
        ...state,
        starWarsMovies: action.data,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        didErrorOccurWhileFetching: false,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};
