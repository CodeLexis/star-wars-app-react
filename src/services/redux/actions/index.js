import {
  ON_API_CALL_FAILURE,
  ON_API_CALL_SUCCESS,
  SET_CURRENT_STAR_WARS_MOVIE,
  SET_IS_LOADING,
  SET_STAR_WARS_MOVIE_LIST,
} from '../action-types';


/** Returns the action data for the event of an API Call failure
 * @param {string} errorMessage
 * @return {Object}
 */
export function onApiCallFailure(errorMessage) {
  return {
    type: ON_API_CALL_FAILURE,
    errorMessage,
  };
}

/** Returns the action data for the event of an API Call success
 * @param {string} successMessage
 * @return {Object}
 */
export function onApiCallSuccess(successMessage) {
  return {
    type: ON_API_CALL_SUCCESS,
    successMessage,
  };
}

/** Sets the current star wars movie
 * @param {Object} movie
 * @return {Object}
 */
export function setCurrentStarWarsMovie(movie) {
  return {
    type: SET_CURRENT_STAR_WARS_MOVIE,
    movie,
  };
}

/** Sets the list of star wars
 * @param {Array} movieList
 * @return {Object}
 */
export function setStarWarsMovieList(movieList) {
  return {
    type: SET_STAR_WARS_MOVIE_LIST,
    movieList,
  };
}

/** Sets isLoading on the global application state
 * @param {boolean} isLoading
 * @return {Object}
 */
export function setIsLoading(isLoading) {
  return {
    type: SET_IS_LOADING,
    isLoading,
  };
}
