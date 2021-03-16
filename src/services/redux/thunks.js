import { starWarsApiClient } from '../../setup/api';
import { ERROR_STATUS } from '../api/constants';
import {
  onApiCallFailure,
  onApiCallSuccess,
  setIsLoading,
  setStarWarsMovieList,
  setUrlResourceIsLoading,
  setUrlResourceContent,
} from './actions';


/** Retrieves all star wars films and sets them to state
 * @return {function}
*/
export function retrieveMovieDetails() {
  return async function(dispatch) {
    dispatch(setIsLoading(true));

    try {
      const { response, status } = (
        await starWarsApiClient.getAllStarWarsFilms()
      );

      if (status === ERROR_STATUS) {
        dispatch(onApiCallFailure());
        return;
      }

      dispatch(
          setStarWarsMovieList(
              response.results.sort((a, b) => a.release_date - b.release_date),
          ),
      );
      dispatch(onApiCallSuccess());
    } catch (error) {
      dispatch(onApiCallFailure());
    }

    dispatch(setIsLoading(false));
  };
}

/** Retrieves a URL-based resource
 * @param {Object} movie
 * @return {function}
 */
export function fetchMovieCharacters(movie) {
  console.log({movie});
  return async function(dispatch, getState) {
    movie?.characters?.map((value) => {
      const urlPath = value.split('http://swapi.dev/api/')[1];
      dispatch(fetchUrlResource(urlPath));
      const { urlContent } = getState();
      console.log('AFTER', {urlPath}, urlContent[urlPath]);
    });
  };
}

/** Retrieves a URL-based resource
 * @param {string} url
 * @return {function}
 */
export function fetchUrlResource(url) {
  console.log({url});
  return async function(dispatch, getState) {
    const { urlContent } = getState();
    const cachedContent = urlContent[url];

    console.log({cachedContent, url});

    if (cachedContent?.content) {
      return cachedContent.content;
    }

    dispatch(setUrlResourceIsLoading(true, url));

    try {
      const { response, status } = await starWarsApiClient.fetchResource(url);

      if (status === ERROR_STATUS) {
        dispatch(onApiCallFailure());
        return;
      }

      dispatch(setUrlResourceContent(response, url));
      dispatch(onApiCallSuccess());
    } catch {
      dispatch(onApiCallFailure());
    }

    dispatch(setIsLoading(false, url));
  };
}
