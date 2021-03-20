import {
  convertCentimetresToFeet,
  convertCentimetresToInches,
} from '../../../utils/converters';
import {
  ON_API_CALL_FAILURE,
  ON_API_CALL_SUCCESS,
  SET_CURRENT_STAR_WARS_MOVIE,
  SET_IS_LOADING,
  SET_STAR_WARS_MOVIE_LIST,
  UPDATE_MOVIE_DETAIL,
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
    case UPDATE_MOVIE_DETAIL:
      const { currentStarWarsMovie, starWarsMovies } = state;

      const otherParamsToBeUpdated = {};

      if (action.param === 'characters') {
        let characterHeightSum = 0;

        action.payload.forEach(
            (a) => characterHeightSum += (
              !isNaN(a.height) ? parseInt(a.height) : 0
            ),
        );

        otherParamsToBeUpdated.characterHeightSum = (
          `${characterHeightSum}cm ` +
          `(${convertCentimetresToFeet(characterHeightSum)}ft/` +
          `${convertCentimetresToInches(characterHeightSum)}in)`
        );

        // modify otherParamsToBeUpdated as required
      }

      const updatedStarWarsMovies = starWarsMovies.map((value) => {
        if (value.episode_id != action.movieId) return value;

        return {
          ...value,
          [action.param]: action.payload,
          ...otherParamsToBeUpdated,
        };
      });

      return {
        ...state,
        starWarsMovies: updatedStarWarsMovies,

        // update the currentStarWarsMovie if it is the movie in context
        ...(
          currentStarWarsMovie.episode_id == action.movieId ?
            {currentStarWarsMovie: updatedStarWarsMovies.find(
                ({episode_id: episodeId}) => episodeId == action.movieId,
            )} :
          {}
        ),
      };

    default:
      return state;
  }
};
