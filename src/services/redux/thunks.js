import { starWarsApiClient } from '../../setup/api';
import { ERROR_STATUS } from '../api/constants';
import {
  onApiCallFailure,
  onApiCallSuccess,
  onFetchMovieCharactersSuccess,
  setIsLoading,
  setStarWarsMovieList,
  setUrlResourceIsLoading,
  setUrlResourceContent,
  onFetchMovieCharactersStart,
  onFetchMovieCharactersFailure,
  updateMovieDetail,
} from './actions';


/** Retrieves all star wars films and sets them to state
 * @return {function}
*/
export function retrieveAllStarWarsMovies() {
  return async function(dispatch) {
    dispatch(setIsLoading(true));

    try {
      const { response, status } = (
        await starWarsApiClient.getAllStarWarsFilms()
      );

      dispatch(setIsLoading(false));

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
  };
}

/** Retrieves a URL-based resource
 * @param {Object} movie
 * @return {function}
 */
export function fetchMovieCharacters(movie) {
  return async function(dispatch, getState) {
    dispatch(onFetchMovieCharactersStart());

    const promises = movie?.characters?.map((value) => new Promise(
        async (resolve, reject) => {
          if (typeof value === 'object') return resolve(value);

          const urlPath = value.split('http://swapi.dev/api/')[1];
          await dispatch(fetchUrlResource(urlPath, true));
          const { urlContent } = getState();

          const thisUrlContent = urlContent[urlPath];
          const wasFetchSuccessful = Boolean(thisUrlContent?.content);

          if (wasFetchSuccessful) return resolve(thisUrlContent.content);
          return reject(urlPath);
        }),
    );

    Promise.all(promises).then(
        (result) => {
          // TODO refactor this to set the edit the movie payload and add
          // these characters
          dispatch(updateMovieDetail(movie?.episode_id, 'characters', result));
          dispatch(onFetchMovieCharactersSuccess());
        },
        (error) => {
          dispatch(onFetchMovieCharactersFailure(error));
        },
    );
  };
}

/** Retrieves a URL-based resource
 * @param {string} url
 * @param {boolean} silent
 * @return {function}
 */
export function fetchUrlResource(url, silent=false) {
  return async function(dispatch, getState) {
    const { urlContent } = getState();
    const cachedContent = urlContent[url];

    if (cachedContent?.content) {
      return cachedContent.content;
    }

    // dispatch(setIsLoading(true, url));
    dispatch(setUrlResourceIsLoading(true, url));

    try {
      const { response, status } = await starWarsApiClient.fetchResource(url);

      if (status === ERROR_STATUS) {
        !silent && dispatch(onApiCallFailure());
        return;
      }

      dispatch(setUrlResourceContent(response, url));
      dispatch(setUrlResourceIsLoading(false, url));
      !silent && dispatch(onApiCallSuccess());
    } catch {
      !silent && dispatch(onApiCallFailure());
    }

    !silent && dispatch(setIsLoading(false, url));
  };
}
