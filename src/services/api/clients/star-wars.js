import Requester from '../requester';


const API_BASE_URL = process.env.SWAPI_BASE_URL;


/** StarWarsApiClient */
export default class StarWarsApiClient {
  /** Constructor
   * @param {Object} props
   */
  constructor(props) {
    this.apiRequester = props ? props.apiRequester || new Requester({
      apiBaseUrl: API_BASE_URL,
    }) : new Requester({
      apiBaseUrl: API_BASE_URL,
    });
  }

  /** Fetches all Star Wars movies.
   * @return {Promise}
   */
  getAllStarWarsFilms() {
    return this.apiRequester.get({
      endpoint: 'films/',
    });
  }

  /** Fetches the details of a person.
   * @param {string} personId
   * @return {Promise}
   */
  getCharacterDetails(personId) {
    return this.apiRequester.get({
      endpoint: `people/${personId}/`,
    });
  }
}
