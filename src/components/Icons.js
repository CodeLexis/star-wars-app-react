import React from 'react';

import PropTypes from 'prop-types';

/** Renders an arrow down icon
 * @param {string} colour
 * @return {node}
 */
export function ArrowDownIcon({colour, size}) {
  return (
    <img
      src={`https://img.icons8.com/ios-filled/${size}/${colour}/chevron-down.png`} />
  );
}

ArrowDownIcon.propTypes = {
  colour: PropTypes.string,
  size: PropTypes.number,
};


/** Renders an arrow down icon
 * @param {string} colour
 * @return {node}
 */
export function ArrowUpIcon({colour, size}) {
  return (
    <img
      src={`https://img.icons8.com/ios-filled/${size}/${colour}/chevron-up.png`} />
  );
}

ArrowUpIcon.propTypes = {
  colour: PropTypes.string,
  size: PropTypes.number,
};
