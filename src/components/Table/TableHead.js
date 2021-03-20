import React from 'react';

import PropTypes from 'prop-types';
import { ASCENDING, DESCENDING } from '../../constants';
import { ArrowDownIcon, ArrowUpIcon } from '../Icons';
import { useClassName } from '../../utils/class-name';


/** Renders a clickable table head, used to toggle the sort
 * direction and the sort parameter.
 * @param {Object} props
 * @return {node}
 */
export default function TableHead({isActive, label, onClick, sortByDirection}) {
  const icon = () => sortByDirection === ASCENDING ?
    <ArrowUpIcon colour={'ffffff'} size={14} /> :
    <ArrowDownIcon colour={'ffffff'} size={14} />;

  return (
    <th
      className={useClassName([
        'table-head',
        isActive ? 'table-head--active' : 'table-head--inactive',
      ])}
      onClick={onClick}
    >
      {isActive && <div className="table-head__icon">
        {icon()}
      </div>} {label}
    </th>
  );
}

TableHead.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  sortByDirection: PropTypes.oneOf([ASCENDING, DESCENDING]),
};
