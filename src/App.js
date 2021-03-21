import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import './App.css';

import Home, { HomeSkeleton } from './pages/Home';
import { retrieveAllStarWarsMovies } from './services/redux/thunks';
import { withErrorBoundary } from './components/hocs';


/** App
 * @return {node}
 */
function App({
  didErrorOccurWhileFetching, isLoading, retrieveAllStarWarsMovies,
}) {
  useEffect(() => {
    retrieveAllStarWarsMovies();
  }, []);

  const Home_ = withErrorBoundary(
      Home,
      HomeSkeleton,
      didErrorOccurWhileFetching,
      isLoading,
      retrieveAllStarWarsMovies,
  );

  return <Home_ />;
}

/** Maps the redux-dispatchable-actions to props
 * @param {function} dispatch
 * @return {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    retrieveAllStarWarsMovies: () => dispatch(retrieveAllStarWarsMovies()),
  };
}

/** Maps the redux-dispatchable-actions to props
 * @param {Object} state
 * @return {Object}
 */
function mapStateToProps(state) {
  return {
    didErrorOccurWhileFetching: state.root.didErrorOccurWhileFetching,
    isLoading: state.root.isLoading,
  };
}

App.propTypes = {
  didErrorOccurWhileFetching: PropTypes.bool,
  isLoading: PropTypes.bool,
  retrieveAllStarWarsMovies: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

