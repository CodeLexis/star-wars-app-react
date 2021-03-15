// @flow
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import { ASCENDING, DESCENDING } from '../../constants';
import TableHead from './TableHead';
import TableRow from './TableRow';

import './style.css';


const SORT_BY_DEFAULT = null;
const SORT_BY_DIRECTION_DEFAULT = ASCENDING;


/** Transforms data received to table body data
 * @param {Object} data
 * @param {array} fields
 * @return {array}
 */
function transformToTableData(data, fields) {
  return data.map(
      (item) => fields.map(
          (value) => {
            return item[value];
          },
      ),
  );
}


/** Renders a table component
 * @return {node}
 */
export default function Table({ data, fields }) {
  const [sortBy, setSortBy] = useState(SORT_BY_DEFAULT);
  const [sortByDirection, setSortByDirection] = useState(
      SORT_BY_DIRECTION_DEFAULT,
  );
  const [tableData, setTableData] = useState([]);

  const tableHeaders = useMemo(
      () => fields || Object.keys(data[0]),
      [data, fields],
  );

  const transformedTableData = useMemo(
      () => transformToTableData(data, tableHeaders),
      [data, tableHeaders],
  );

  useEffect(() => {
    setSortByDirection(SORT_BY_DIRECTION_DEFAULT);
  }, [sortBy]);

  useEffect(() => {
    setTableData(transformedTableData);
  }, []);

  useEffect(() => {
    // sort the data by parameter and direction
  }, [sortBy, sortByDirection]);

  // On table head click, toggle the direction of the sort or set the
  // value as the sort parameter.
  const onTableHeadClick = useCallback((value) => {
    value === sortBy ?
      setSortByDirection(
          sortByDirection === ASCENDING ?
            DESCENDING :
            ASCENDING,
      ) :
      setSortBy(value);
  }, []);

  return (
    <table className="table">
      <thead id="table-head-container">
        <tr>
          {tableHeaders.map(
              (value, index) => <TableHead
                key={index}
                onClick={() => onTableHeadClick(value)}
                sortByDirection={sortByDirection}
                label={value}
              />,
          )}
        </tr>
      </thead>
      <tbody>
        {tableData.map(
            (rowData, index) => <TableRow rowData={rowData} key={index} />,
        )}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  fields: PropTypes.array,
};
