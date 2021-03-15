import React from 'react';

import PropTypes from 'prop-types';


/** Renders the row of the table
 * @param {Object} props
 * @return {node}
 */
export default function TableRow({rowData}) {
  return (
    <tr className="table-row">
      {rowData.map(
          (value, index) => (
            <td className="table-cell" key={index}>{value}</td>
          ),
      )}
    </tr>
  );
}

/** An HOC around TableRow that's tailored towards the StarWars API
 * @param {(class|function)} WrappedComponent
 * @param {url} url
 * @param {Object} state
 * @param {function} dispatch
 * @return {node}
 */
export function withStarWarsApiUrl(WrappedComponent, url, state, dispatch) {
  const rowData = state[url];

  // fetch the data for this url

  return rowData.data ?
    <WrappedComponent {...rowData} /> :
    <React.Fragment />;
}

TableRow.propTypes = {
  rowData: PropTypes.array.isRequired,
};

export const StarWarsTableRow = (url, state, dispatch) => withStarWarsApiUrl(
    TableRow,
    url,
    state,
    dispatch,
);
