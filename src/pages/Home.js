import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../components/Table';
import { withSkeleton } from '../components/hocs';
import { setCurrentStarWarsMovie } from '../services/redux/actions';
import OpeningScroll from '../components/OpeningScroll';
import {
  fetchMovieCharacters,
  fetchUrlResource,
} from '../services/redux/thunks';


/** Renders the home page
 * @param {Object} props
 * @return {node}
 */
function Home({
  currentStarWarsMovie, fetchMovieCharacters, setCurrentStarWarsMovie,
  starWarsMovies, urlContent,
}) {
  useEffect(() => {
    console.log({currentStarWarsMovie});

    fetchMovieCharacters(currentStarWarsMovie);

    // When all the characters have been fetched, display them on the table.
  }, [currentStarWarsMovie]);

  useEffect(() => {
    console.log({currentStarWarsMovie, urlContent});
    let isAllClear = false;
    let didErrorOccur = false;

    currentStarWarsMovie?.characters.map(
        (value) => {
          const [urlPath] = value.split('http://swapi.dev/api/').reverse();
          isAllClear = Boolean(urlContent[urlPath]?.content);
          didErrorOccur = (
            didErrorOccur || Boolean(
                urlContent[urlPath]?.didErrorOccurWhileFetching,
            )
          );
        },
    );

    if (isAllClear) {
      console.log('YAAAAY!!!');
    }
  }, [currentStarWarsMovie, urlContent]);

  return <div id="app-container">
    <select onChange={(event) => setCurrentStarWarsMovie(event.target.value)}>
      {starWarsMovies?.map(
          ({title, episode_id: episodeId}, index) => (
            <option key={index} value={episodeId}>
              {title}
            </option>
          ),
      )}
    </select>

    <OpeningScroll />

    <Table
      data={[]}
    />
  </div>;
}


Home.propTypes = {
  currentStarWarsMovie: PropTypes.object,
  fetchMovieCharacters: PropTypes.func,
  fetchUrlResource: PropTypes.func,
  setCurrentStarWarsMovie: PropTypes.func,
  starWarsMovies: PropTypes.array,
  urlContent: PropTypes.array,
};

/** Maps the redux-state to props
 * @param {Object} state
 * @return {Object}
 */
function mapStateToProps(state) {
  return {
    currentStarWarsMovie: state.root.currentStarWarsMovie,
    starWarsMovies: state.root.starWarsMovies,
    urlContent: state.urlContent,
  };
}

/** Maps the redux-dispatchable-actions to props
 * @param {function} dispatch
 * @return {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    fetchMovieCharacters: (url) => dispatch(fetchMovieCharacters(url)),
    fetchUrlResource: (url) => dispatch(fetchUrlResource(url)),
    retrieveMovieDetails: () => dispatch(retrieveMovieDetails()),
    setCurrentStarWarsMovie: (episodeId) => dispatch(
        setCurrentStarWarsMovie(episodeId),
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withSkeleton(Home, 'root.isLoading'),
);
