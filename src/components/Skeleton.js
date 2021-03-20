import React from 'react';

import PropTypes from 'prop-types';


/** Renders a skeleton
 * @param {Object} props
 * @return {node}
 */
export default function Skeleton({height, maxWidth, minWidth, width}) {
  return (
    <div
      className="skeleton"
      style={{
        animationDelay: `${Math.random()}s`,
        height,
        maxWidth,
        minWidth,
        width,
      }}
    />
  );
}

Skeleton.propTypes = {
  height: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  width: PropTypes.string,
};
