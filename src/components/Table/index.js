// @flow
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import { ASCENDING, DESCENDING } from '../../constants';
import TableHead from './TableHead';
import TableRow from './TableRow';

import './style.css';
import { FemaleIcon, MaleIcon } from '../Icons';


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
            if (value == 'gender') {
              if (item[value] == 'female') {
                return <FemaleIcon colour={'FFE81F'} />;
              } else if (item[value] == 'male') {
                return <MaleIcon colour={'FFE81F'} />;
              } else {
                return '--';
              }
            }
            return item[value];
          },
      ),
  );
}


/** Renders a table component
 * @return {node}
 */
export default function Table({ data: initialData, fields, footer }) {
  const [data, setData] = useState(initialData);
  const [sortBy, setSortBy] = useState(SORT_BY_DEFAULT);
  const [sortByDirection, setSortByDirection] = useState(
      SORT_BY_DIRECTION_DEFAULT,
  );

  const tableHeaders = useMemo(
      () => fields || Object.keys(data && data[0] ? data[0] : {}),
      [data, fields],
  );

  const transformedTableData = useMemo(
      () => {
        console.log('SETTING', {data});
        return transformToTableData(data, tableHeaders);
      },
      [data, tableHeaders],
  );

  useEffect(() => {
    setSortByDirection(SORT_BY_DIRECTION_DEFAULT);
  }, [sortBy]);

  useEffect(() => {
    data.sort(
        (a, b) => {
          let valA = a[sortBy];
          let valB = b[sortBy];

          valA = isNaN(valA) ? valA : parseFloat(valA);
          valB = isNaN(valB) ? valB : parseFloat(valB);

          if (valA < valB) {
            return sortByDirection === ASCENDING ? -1 : 1;
          };
          if (valA > valB) {
            return sortByDirection === ASCENDING ? 1 : -1;
          };
          return 0;
        },
    );
    console.log({data});
    setData([...data]);
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
  }, [sortBy, sortByDirection]);

  return (
    <table className="table">
      <thead id="table-head-container">
        <tr>
          {tableHeaders.map(
              (value, index) => <TableHead
                isActive={sortBy === value}
                key={index}
                onClick={() => onTableHeadClick(value)}
                sortByDirection={sortByDirection}
                label={value}
              />,
          )}
        </tr>
      </thead>
      <tbody>
        {transformedTableData.map(
            (rowData, index) => <TableRow rowData={rowData} key={index} />,
        )}
      </tbody>
      <tfoot>
        {footer()}
      </tfoot>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  footer: PropTypes.node,
  fields: PropTypes.array,
};
