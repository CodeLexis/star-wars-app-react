import React, { useCallback, useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Text from './Text';

import './index.scss';


/** Renders a scroll
 * @param {Object} props
 * @return {node}
 */
function OpeningScroll({currentStarWarsMovie}) {
  const scrollRef = useRef();

  const pageScroll = useCallback(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollTop + 1;

    setTimeout(pageScroll, 50);
  });

  useEffect(() => {
    if (!scrollRef?.current) return;
    // When another movie is selected, restart the scroll.
    scrollRef.current.scrollTop = 0;

    console.log('TAPPING.. .');
    setTimeout(pageScroll, 1200);
  }, [currentStarWarsMovie?.episode_id]);

  return (
    <div id="opening-scroll" className="animated" ref={scrollRef}>
      {
        Boolean(currentStarWarsMovie) ?
          <div id="opening-scroll-content">
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
          </div> :
          <img
            alt="star-wars-logo"
            className="animated"
            id="star-wars-logo"
            src="https://img.icons8.com/ios/512/FFE81F/star-wars.png"
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
