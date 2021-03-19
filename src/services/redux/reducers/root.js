import {
  ON_API_CALL_FAILURE,
  ON_API_CALL_SUCCESS,
  SET_CURRENT_STAR_WARS_MOVIE,
  SET_CURRENT_STAR_WARS_MOVIE_CHARACTERS,
  SET_IS_LOADING,
  SET_STAR_WARS_MOVIE_LIST,
} from '../action-types';


const initialState = {
  currentStarWarsMovie: null,
  currentStarWarsMovieCharacters: null,
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
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ON_API_CALL_FAILURE:
      return {
        ...state,
        didErrorOccurWhileFetching: true,
        errorMessage: action.payload,
      };
    case ON_API_CALL_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
      };
    case SET_CURRENT_STAR_WARS_MOVIE:
      return {
        ...state,
        currentStarWarsMovie: state.starWarsMovies.find(
            ({episode_id: episodeId}) => episodeId == action.payload,
        ),
      };
    case SET_IS_LOADING:
      return {
        ...state,
        didErrorOccurWhileFetching: false,
        isLoading: action.payload,
      };
    case SET_STAR_WARS_MOVIE_LIST:
      return {
        ...state,
        starWarsMovies: action.payload,
      };
    case SET_CURRENT_STAR_WARS_MOVIE_CHARACTERS:
      return {
        ...state,
        currentStarWarsMovieCharacters: action.payload,
      };

    default:
      return state;
  }
};
