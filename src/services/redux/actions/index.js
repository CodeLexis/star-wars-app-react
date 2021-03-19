import {
  ON_API_CALL_FAILURE,
  ON_API_CALL_SUCCESS,
  ON_FETCH_MOVIE_CHARACTERS_FAILURE,
  ON_FETCH_MOVIE_CHARACTERS_START,
  ON_FETCH_MOVIE_CHARACTERS_SUCCESS,
  SET_CURRENT_STAR_WARS_MOVIE,
  SET_CURRENT_STAR_WARS_MOVIE_CHARACTERS,
  SET_IS_LOADING,
  SET_STAR_WARS_MOVIE_LIST,
  SET_URL_RESOURCE_CONTENT,
  SET_URL_RESOURCE_IS_LOADING,
} from '../action-types';


/** Returns the action data for the event of an API Call failure
 * @param {string} errorMessage
 * @return {Object}
 */
export function onApiCallFailure(
    errorMessage=process.env.DEFAULT_API_ERROR_MESSAGE,
) {
  return {
    type: ON_API_CALL_FAILURE,
    payload: errorMessage,
  };
}

/** Returns the action data for the event of an API Call success
 * @param {string} successMessage
 * @return {Object}
 */
export function onApiCallSuccess(successMessage) {
  return {
    type: ON_API_CALL_SUCCESS,
    payload: successMessage,
  };
}

/** Sets the current star wars movie
 * @param {string} episodeId
 * @return {Object}
 */
export function setCurrentStarWarsMovie(episodeId) {
  return {
    type: SET_CURRENT_STAR_WARS_MOVIE,
    payload: episodeId,
  };
}

/** Sets the list of star wars
 * @param {Array} movieList
 * @return {Object}
 */
export function setStarWarsMovieList(movieList) {
  return {
    type: SET_STAR_WARS_MOVIE_LIST,
    payload: movieList,
  };
}

/** Sets the content of a URL resource
 * @param {any} content
 * @param {string} url
 * @return {Object}
 */
export function setUrlResourceContent(content, url) {
  return {
    type: SET_URL_RESOURCE_CONTENT,
    payload: content,
    url,
  };
}

/** Sets isLoading of a URL resource
 * @param {boolean} isLoading
 * @param {string} url
 * @return {Object}
 */
export function setUrlResourceIsLoading(isLoading, url) {
  return {
    type: SET_URL_RESOURCE_IS_LOADING,
    payload: isLoading,
    url,
  };
}

/** Sets isLoading on the global application state
 * @param {boolean} isLoading
 * @param {string} key
 * @return {Object}
 */
export function setIsLoading(isLoading, key) {
  return {
    type: SET_IS_LOADING,
    payload: isLoading,
    key,
  };
}

/** On fetch movie characters failure
 * @return {Object}
 */
export function onFetchMovieCharactersFailure() {
  return {
    type: ON_FETCH_MOVIE_CHARACTERS_FAILURE,
  };
}

/** On fetch movie characters start
 * @return {Object}
 */
export function onFetchMovieCharactersStart() {
  return {
    type: ON_FETCH_MOVIE_CHARACTERS_START,
  };
}

/** On fetch movie characters success
 * @return {Object}
 */
export function onFetchMovieCharactersSuccess() {
  return {
    type: ON_FETCH_MOVIE_CHARACTERS_SUCCESS,
  };
}

/** Sets current movie characters to Redux state
 * @param {Array} characters
 * @return {Object}
 */
export function setCurrentMovieCharacters(characters) {
  return {
    type: SET_CURRENT_STAR_WARS_MOVIE_CHARACTERS,
    payload: characters,
  };
}
