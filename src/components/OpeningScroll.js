import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Text from './Text';


/** Renders a scroll
 * @param {Object} props
 * @return {node}
 */
function OpeningScroll({currentStarWarsMovie}) {
  return (
    <div className="opening-scroll">
      {
        Boolean(currentStarWarsMovie) ?
          <React.Fragment>
            <Text className="opening-scroll__heading opening-scroll__text">
              EPISODE {currentStarWarsMovie.episode_id}
            </Text>
            <h1
              className={('opening-scroll__h1 opening-scroll__heading ' +
              'opening-scroll__text')}
            >
              {currentStarWarsMovie.title}
            </h1>
            <Text className="opening-scroll__text">
              {currentStarWarsMovie.opening_crawl}
            </Text>
          </React.Fragment> :
          <img
            alt="star-wars-logo"
            id="star-wars-logo"
            src="https://img.icons8.com/ios/256/FFE81F/star-wars.png"
          />
      }
    </div>
  );
}

/** Adds the redux state to props
 * @param {Object} state
 * @return {Object}
*/
function mapStateToProps(state) {
  return {
    currentStarWarsMovie: state.root.currentStarWarsMovie,
  };
}

OpeningScroll.propTypes = {
  currentStarWarsMovie: PropTypes.object,
};

export default connect(mapStateToProps, null)(OpeningScroll);
