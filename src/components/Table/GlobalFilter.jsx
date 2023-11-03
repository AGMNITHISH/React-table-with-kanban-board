import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const handleDebounceChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <div className="text-center mb-2 text-sm font-medium text-gray-900  relative">
      <input
        className="w-1/2 leading-10 px-4  border border-gray-500 rounded-lg bg-gray-50 "
        type="text"
        placeholder="Type Something to search..."
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          handleDebounceChange(e.target.value);
        }}
      />
    </div>
  );
};

export default GlobalFilter;
