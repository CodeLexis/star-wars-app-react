import { starWarsApiClient } from '../../setup/api';
import { ERROR_STATUS } from '../api/constants';
import { setIsLoading } from './actions';


/** Retrieves all star wars films and sets them to state
 * @return {function}
*/
export function retrieveMovieDetails() {
  return async function(dispatch) {
    dispatch(setIsLoading(true));

    try {
      const { response, status } = starWarsApiClient.getAllStarWarsFilms();
      if (status === ERROR_STATUS) {
        dispatch(apiFailure());
        return;
      }

      dispatch('success occurred', response);
    } catch (error) {
      dispatch('error occured', error);
    }

    dispatch(setIsLoading(false));
  };
}
