import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="flex items-center max-w-md mx-auto bg-white rounded-full shadow-md overflow-hidden">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 text-gray-700 focus:outline-none"
      />
      <div className="px-4 py-2 text-white">
        <FaSearch />
      </div>
    </div>
  );
}

export default SearchBar;
