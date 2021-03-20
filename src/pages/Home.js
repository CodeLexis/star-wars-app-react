import React, { useEffect, useMemo, useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../components/Table';
import { withErrorBoundary, withSkeleton } from '../components/hocs';
import { setCurrentStarWarsMovie } from '../services/redux/actions';
import OpeningScroll from '../components/OpeningScroll';
import { fetchMovieCharacters } from '../services/redux/thunks';

import './style.scss';
import Skeleton from '../components/Skeleton';
import Text from '../components/Text';

const audio = new Audio('./star-wars-theme.mp3');
audio.volume = 0.2;

/** Renders the home page
 * @param {Object} props
 * @return {node}
 */
function Home({
  currentStarWarsMovie, fetchMovieCharacters, setCurrentStarWarsMovie,
  starWarsMovies, urlContent,
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (!currentStarWarsMovie) return;

    if (!isPlayingAudio) {
      audio.play();
      setIsPlayingAudio(true);
    }
    fetchMovieCharacters(currentStarWarsMovie);
  }, [currentStarWarsMovie?.episode_id]);

  const StarWarsTable = useMemo(() => {
    return withErrorBoundary(
        Table,
        () => <Skeleton height={'50rem'} width={'100%'} />,
        urlContent.didErrorOccurWhileFetching,
        urlContent.isLoading,
        () => fetchMovieCharacters(currentStarWarsMovie),
    );
  }, [
    currentStarWarsMovie?.characters,
    urlContent.didErrorOccurWhileFetching,
    urlContent.isLoading,
  ]);

  return <div id="app-container">
    <label id="star-wars-movie-select-label" htmlFor="star-wars-movie-select">
      Select a Star Wars movie:
    </label>
    <select
      id="star-wars-movie-select"
      onChange={(event) => setCurrentStarWarsMovie(event.target.value)}
    >
      <option />
      {starWarsMovies?.map(
          ({title, episode_id: episodeId}, index) => (
            <option key={index} value={episodeId}>
              {title}
            </option>
          ),
      )}
    </select>

    <OpeningScroll />

    {currentStarWarsMovie && <StarWarsTable
      fields={['name', 'gender', 'height']}
      footer={() => <Text>{currentStarWarsMovie.characterHeightSum}</Text>}
      data={currentStarWarsMovie.characters}
    />}
  </div>;
}

/** Renders the home skeleton
 * @param {Object} props
 * @return {node}
*/
function HomeSkeleton(props) {
  return (

    <div id="app-container-skeleton">
      <Skeleton
        height={'3rem'}
        maxWidth={'30ch'}
        minWidth={'15ch'}
        width={'100%'}
      />
      <Skeleton
        height={'25rem'}
        width={'100%'}
      />
      <Skeleton
        height={'25rem'}
        width={'100%'}
      />
    </div>
  );
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
        HomeSkeleton,
        'root.isLoading',
    ),
);
