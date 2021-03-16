import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import './App.css';

import Home from './pages/Home';
import { retrieveMovieDetails } from './services/redux/thunks';


/** App
 * @return {node}
 */
function App({retrieveMovieDetails}) {
  useEffect(() => {
    retrieveMovieDetails();
  }, []);

  return <Home />;
}

/** Maps the redux-dispatchable-actions to props
 * @param {function} dispatch
 * @return {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    retrieveMovieDetails: () => dispatch(retrieveMovieDetails()),
  };
}

App.propTypes = {
  retrieveMovieDetails: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(App);

