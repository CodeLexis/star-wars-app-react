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

TableRow.propTypes = {
  rowData: PropTypes.array.isRequired,
};
