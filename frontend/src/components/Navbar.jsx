import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-red shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-blue-900">EduSolver</div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/"className="text-blue-900 hover:bg-blue-200 transition-colors px-4 py-2 rounded">
              Home
            </Link>

            <Link to="/about" className="text-blue-900 hover:bg-blue-200 transition-colors px-4 py-2 rounded">
              About
            </Link>

            <Link to="/services" className="text-blue-900 hover:bg-blue-200 transition-colors px-4 py-2 rounded">
              Services
            </Link>

            <Link to="/contact" className="text-blue-900 hover:bg-blue-200 transition-colors px-4 py-2 rounded">
              Contact
            </Link>
            <link rel="stylesheet" href="" />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
