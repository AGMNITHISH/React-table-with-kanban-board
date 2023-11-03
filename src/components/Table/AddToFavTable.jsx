import React, { useMemo } from "react";

import {
  useFilters,
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { BiSolidArrowToLeft, BiSolidArrowToRight } from "react-icons/bi";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";

const AddToFavTable = ({ tblData, tblColumns }) => {
  const COLUMNS = useMemo(() => tblColumns, [tblColumns]);
  const defaultColumns = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    pageOptions,
    canNextPage,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: COLUMNS,
      data: tblData,
      initialState: { pageSize: 5 },
      defaultColumn: defaultColumns,
    },

    useFilters,
    useGlobalFilter,

    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <div>
      {tblData.length > 0 && tblColumns.length > 0 ? (
        <>
          {" "}
          <div className="relative overflow-x-auto shadow-md m-4 sm:rounded-lg">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table
              {...getTableProps()}
              className="w-full text-sm text-left text-gray-500 "
            >
              <thead className="text-xs text-white uppercase bor bg-gray-500">
                {headerGroups?.map((headerGroup, ind) => {
                  return (
                    <tr key={ind} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => {
                        return (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            scope="col"
                            className="px-4 py-2 "
                          >
                            <div className="flex">
                              {column.render("Header")}
                              <span className="ml-2">
                                {column.isSorted ? (
                                  !column.isSortedDesc ? (
                                    <FaSortAlphaUp className="text-grey-300" />
                                  ) : (
                                    <FaSortAlphaDown className="text-grey-300" />
                                  )
                                ) : (
                                  ""
                                )}
                              </span>
                            </div>

                            <div>
                              {column.canFilter
                                ? column.render("Filter")
                                : null}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page?.map((row, ind) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={ind}
                      className="bg-white border-b dark:bg-gray-800"
                    >
                      {row.cells?.map((cell) => {
                        return (
                          <td {...cell.getCellProps()} className="px-4 py-3">
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="my-4 flex justify-center items-center">
              <span className="px-2">
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | go to page:
                <input
                  type="number"
                  className="border border-black rounded mx-1"
                  defaultValue={pageIndex + 1}
                  style={{ width: "60px" }}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                />
              </span>
              <span>
                <select
                  className="border border-black rounded mx-1"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[5, 10, 25, 50, 100].map((pageSize) => {
                    return (
                      <option value={pageSize} key={pageSize}>
                        Show {pageSize}
                      </option>
                    );
                  })}
                </select>
              </span>
              <button
                className=" text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {"<<"}
              </button>
              <button
                className=" ml-2 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <BiSolidArrowToLeft />
              </button>
              <button
                className="ml-2 mr-2 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <BiSolidArrowToRight />
              </button>
              <button
                className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AddToFavTable;
