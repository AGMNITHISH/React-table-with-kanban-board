import React from "react";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div className=" my-2 text-xs font-medium text-gray-900  relative">
      <input
        className=" w-full leading-7 px-2 border border-gray-300 rounded-md bg-gray-50"
        type="text"
        placeholder="Search..."
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default ColumnFilter;
