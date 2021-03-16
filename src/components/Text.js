import React from 'react';

import PropTypes from 'prop-types';


/** Renders a text
 * @param {Object} props
 * @return {node}
*/
export default function Text({children, className}) {
  return (
    <p className={className}>{children}</p>
  );
}

Text.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};
