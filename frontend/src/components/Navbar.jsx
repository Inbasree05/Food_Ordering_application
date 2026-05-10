import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Utensils } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full z-50 glass-effect transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-full text-white">
                <Utensils size={24} />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">FoodieExpress</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Home</Link>
            <Link to="/menu" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Menu</Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Contact</Link>
          </div>

          {/* Icons & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative text-gray-700 hover:text-orange-500 transition-colors">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Log in
            </Link>
            <Link to="/register" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative text-gray-700 hover:text-orange-500 transition-colors mr-4">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-orange-500 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link to="/" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded-md">Home</Link>
            <Link to="/menu" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded-md">Menu</Link>
            <Link to="/about" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded-md">About Us</Link>
            <div className="border-t border-gray-100 my-2 pt-2"></div>
            <Link to="/login" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded-md">Log in</Link>
            <Link to="/register" onClick={toggleMenu} className="block px-3 py-3 mt-2 text-center text-base font-medium text-white bg-orange-500 rounded-md">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
