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

/** Renders a female icon
 * @param {string} colour
 * @return {node}
 */
export function FemaleIcon({colour, size}) {
  return (
    <img
      src={`https://img.icons8.com/ios-glyphs/${size}/${colour}/female.png`}
    />
  );
}

FemaleIcon.propTypes = {
  colour: PropTypes.string,
  size: PropTypes.number,
};

/** Renders a male icon
 * @param {string} colour
 * @return {node}
 */
export function MaleIcon({colour, size}) {
  return (
    <img
      src={`https://img.icons8.com/ios-glyphs/${size}/${colour}/male.png`}
    />
  );
}

MaleIcon.propTypes = {
  colour: PropTypes.string,
  size: PropTypes.number,
};
