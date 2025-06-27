import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden h-12">
    <input
      type="text"
      placeholder="Search..."
      className="px-1 py-2 text-gray-700 focus:outline-none text-base h-full"
    />
    <div className="px-1 text-gray-700 h-full flex items-center justify-center">
      <FaSearch />
    </div>
  </div>
  );
}

export default SearchBar;
