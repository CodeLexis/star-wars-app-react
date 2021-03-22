import React from 'react';

import PropTypes from 'prop-types';


/** Renders a text
 * @param {Object} props
 * @return {node}
*/
export default function Text({children, className, fontSize}) {
  if (typeof children === 'string') {
    return children.split('\r\n\r\n').map((value, index) => (
      <p
        className={className}
        key={index}
        style={{fontSize: fontSize ? `${fontSize}rem` : undefined}}
      >
        {value}
      </p>
    ));
  }

  return <p
    className={className}
    style={{fontSize: fontSize ? `${fontSize}rem` : undefined}}
  >
    {children}
  </p>;
}

Text.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  fontSize: PropTypes.number,
};
