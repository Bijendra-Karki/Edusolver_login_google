import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo2 from "../../assets/Img/Logo2.png"; 
import SearchBar from "../Searchbar";
import Button from "../button";
import { LogIn, Menu, X } from 'lucide-react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full shadow-sm bg-gradient-to-r from-blue-600 to-blue-900 text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <img 
              src={Logo2 || "/placeholder.svg"} 
              alt="EduSolver Logo" 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            />
            <span className="text-lg sm:text-2xl font-bold text-white">EduSolver</span>
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Link 
              to="/" 
              className="text-white hover:bg-white/20 hover:text-white px-3 py-2 rounded transition-colors duration-200 text-sm xl:text-base"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:bg-white/20 hover:text-white px-3 py-2 rounded transition-colors duration-200 text-sm xl:text-base"
            >
              About
            </Link>
            <Link 
              to="/service" 
              className="text-white hover:bg-white/20 hover:text-white px-3 py-2 rounded transition-colors duration-200 text-sm xl:text-base"
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:bg-white/20 hover:text-white px-3 py-2 rounded transition-colors duration-200 text-sm xl:text-base"
            >
              Contact
            </Link>
            <div className="hidden xl:block">
              <SearchBar />
            </div>
            <Link to="/login">
              <Button label="LogIn" icon={<LogIn size={16} />} />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <Link to="/login" className="lg:hidden">
              <Button 
                label="Login" 
                icon={<LogIn size={14} />} 
                className="text-xs px-2 py-1"
              />
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 hover:bg-white/20 rounded transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-blue-500 py-4">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-white hover:bg-white/20 px-4 py-3 rounded transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-white hover:bg-white/20 px-4 py-3 rounded transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/service" 
                className="text-white hover:bg-white/20 px-4 py-3 rounded transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:bg-white/20 px-4 py-3 rounded transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4 py-2">
                <SearchBar />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;