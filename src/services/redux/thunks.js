import { starWarsApiClient } from '../../setup/api';
import { ERROR_STATUS } from '../api/constants';
import {
  onApiCallFailure,
  onApiCallSuccess,
  setIsLoading,
  setStarWarsMovieList,
} from './actions';


/** Retrieves all star wars films and sets them to state
 * @return {function}
*/
export function retrieveMovieDetails() {
  return async function(dispatch) {
    dispatch(setIsLoading(true));

    try {
      const { response, status } = starWarsApiClient.getAllStarWarsFilms();
      if (status === ERROR_STATUS) {
        dispatch(onApiCallFailure());
        return;
      }

      dispatch(setStarWarsMovieList(response));
      dispatch(onApiCallSuccess());
    } catch (error) {
      dispatch(onApiCallFailure());
    }

    dispatch(setIsLoading(false));
  };
}
