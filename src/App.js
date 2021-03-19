import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import './App.css';

import Home from './pages/Home';
import { retrieveAllStarWarsMovies } from './services/redux/thunks';


/** App
 * @return {node}
 */
function App({retrieveAllStarWarsMovies}) {
  useEffect(() => {
    retrieveAllStarWarsMovies();
  }, []);

  return <Home />;
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

App.propTypes = {
  retrieveAllStarWarsMovies: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(App);

