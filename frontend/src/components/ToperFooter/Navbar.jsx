import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Img/Logo.png"; 
import Logo2 from "../../assets/Img/Logo2.png"; 

import SearchBar from "../Searchbar";


function Navbar() {
  return (
    <header className="shadow-sm bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-t-lg">
      <div className="max-w-1xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <img src={Logo2} alt="EduSolver Logo" className="w-16 h-16 rounded-full object-cover"/>
            <span className="text-2xl font-bold text-white">EduSolver</span>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:bg-white px-4 py-2 rounded transition-colors duration-200">
              Home
            </Link>
            <Link to="/about" className="text-white hover:bg-white px-4 py-2 rounded transition-colors duration-200">
              About
            </Link>
            <Link to="/service" className="text-white hover:bg-white px-4 py-2 rounded transition-colors duration-200">
              Services
            </Link>
            <Link to="/contact" className="text-white hover:bg-white px-4 py-2 rounded transition-colors duration-200">
              Contact
            </Link>
            <SearchBar/>
            <Link to="/login" className="text-white hover:bg-white px-4 py-2 rounded transition-colors duration-200">
             Log In
            </Link>



          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
