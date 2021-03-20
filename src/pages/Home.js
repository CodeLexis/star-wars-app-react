import React, { useEffect, useMemo } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../components/Table';
import { withErrorBoundary, withSkeleton } from '../components/hocs';
import { setCurrentStarWarsMovie } from '../services/redux/actions';
import OpeningScroll from '../components/OpeningScroll';
import { fetchMovieCharacters } from '../services/redux/thunks';

/** Renders the home page
 * @param {Object} props
 * @return {node}
 */
function Home({
  currentStarWarsMovie, fetchMovieCharacters, setCurrentStarWarsMovie,
  starWarsMovies, urlContent,
}) {
  useEffect(() => {
    if (!currentStarWarsMovie) return;

    fetchMovieCharacters(currentStarWarsMovie);
  }, [currentStarWarsMovie?.episode_id]);

  const StarWarsTable = useMemo(() => {
    return withErrorBoundary(
        Table,
        urlContent.didErrorOccurWhileFetching,
        urlContent.isLoading,
        () => fetchMovieCharacters(currentStarWarsMovie),
    );
  }, [
    currentStarWarsMovie,
    urlContent.didErrorOccurWhileFetching,
    urlContent.isLoading,
    fetchMovieCharacters,
  ]);

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

    <StarWarsTable
      fields={['name', 'gender', 'height']}
      data={currentStarWarsMovie?.characters || []}
    />
  </div>;
}


Home.propTypes = {
  currentStarWarsMovie: PropTypes.object,
  fetchMovieCharacters: PropTypes.func,
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
    currentStarWarsMovieCharacters: state.root.currentStarWarsMovieCharacters,
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
    fetchMovieCharacters: (movie) => dispatch(fetchMovieCharacters(movie)),
    retrieveAllStarWarsMovies: () => dispatch(retrieveAllStarWarsMovies()),
    setCurrentStarWarsMovie: (episodeId) => dispatch(
        setCurrentStarWarsMovie(episodeId),
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withSkeleton(
        Home,
        () => <strong style={{color: 'whitesmoke'}}>SKELETON</strong>,
        'root.isLoading',
    ),
);
