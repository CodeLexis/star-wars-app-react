import React from 'react';

import PropTypes from 'prop-types';
import { ASCENDING, DESCENDING } from '../../constants';


/** Renders a clickable table head, used to toggle the sort
 * direction and the sort parameter.
 * @param {Object} props
 * @return {node}
 */
export default function TableHead({label, onClick, sortByDirection}) {
  return (
    <th className="table-head" onClick={onClick}>
      {label}
    </th>
  );
}

TableHead.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  sortByDirection: PropTypes.oneOf([ASCENDING, DESCENDING]),
};
