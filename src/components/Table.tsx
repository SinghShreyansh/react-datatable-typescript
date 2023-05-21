import React from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination, Column } from 'react-table';
import { classNames } from './utils';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowDown } from 'react-icons/ai';
import { MdArrowUpward } from 'react-icons/md';

interface StatusPillProps {
  value: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ value }) => {
  const status = value ? value.toLowerCase() : 'unknown';

  return (
    <div className="text-left">
      <span
        className={classNames(
          'px-3 inline-block w-auto text-left py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
          status.startsWith('active') ? 'bg-green-100 text-green-800' : null,
          status.startsWith('inactive') ? 'bg-yellow-100 text-yellow-800' : null,
          status.startsWith('offline') ? 'bg-red-100 text-red-800' : null
        )}
      >
        • {status}
      </span>
    </div>
  );
};

interface AvatarCellProps {
  value: string;
  column: Column;
  row: any;
}

export const AvatarCell: React.FC<AvatarCellProps> = ({ value, column, row }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img className="h-10 w-10 rounded-full" src={row.original[column.imgAccessor]} alt="" />
      </div>
      <div className="ml-4">
        <div className="text-sm text-left font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{row.original[column.emailAccessor]}</div>
      </div>
    </div>
  );
};

interface TableProps {
  columns: Column[];
  data: any[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  console.log(data);

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page, which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  );

  // Render the UI for your table
  return (
    <>
      {/* table */}
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          scope="col"
                          className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                        >
                          <div className="flex">
                            {column.render('Header')}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <AiOutlineArrowDown size={24} color="gray" />
                                ) : (
                                  <MdArrowUpward size={24} color="gray" />
                                )
                              ) : (
                                '↕️'
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                  {page.map((row, i) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                              role="cell"
                            >
                              {cell.column.Cell.name === 'defaultRenderer' ? (
                                <div className="text-sm text-left text-gray-500">{cell.render('Cell')}</div>
                              ) : (
                                cell.render('Cell')
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-between ">
          <button
            className="border rounded-md bg-white border-gray-300 text-gray-800 text-sm font-medium px-4 hover:cursor-pointer hover:bg-gray-200"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <span className="flex">
              <AiOutlineArrowLeft size={24} color="gray" />
              <span className="ml-2">Previous</span>
            </span>
          </button>

          <div>
            {[0, 1, 2, 3, 4, 5].map(pageIndex => (
              <button
                key={pageIndex}
                className="border bg-white border-gray-200 text-gray-800 text-sm font-medium px-4 py-1 hover:cursor-pointer hover:bg-gray-200"
                onClick={() => gotoPage(pageIndex)}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>

          <button
            className="border rounded-md bg-white border-gray-300 text-gray-800 text-sm font-medium px-4 py-1 hover:cursor-pointer hover:bg-gray-200"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <span className="flex">
              <span className="mr-2">Next</span>
              <AiOutlineArrowRight size={24} color="gray" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
