import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Utensils, User, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-full text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                <Utensils size={24} />
              </div>
              <span className="font-bold text-xl text-slate-50 tracking-tight">FoodieExpress</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-300 hover:text-orange-500 font-medium transition-colors">Home</Link>
            <Link to="/menu" className="text-slate-300 hover:text-orange-500 font-medium transition-colors">Menu</Link>
            <Link to="/about" className="text-slate-300 hover:text-orange-500 font-medium transition-colors">About Us</Link>
            <Link to="/contact" className="text-slate-300 hover:text-orange-500 font-medium transition-colors">Contact</Link>
          </div>

          {/* Icons & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative text-slate-300 hover:text-orange-500 transition-colors">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                0
              </span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-slate-300 gap-2 font-medium">
                  <User size={20} className="text-orange-500" />
                  <span>{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-slate-400 hover:text-red-500 font-medium transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-slate-300 hover:text-orange-500 font-medium transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white px-5 py-2 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] transform hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative text-slate-300 hover:text-orange-500 transition-colors mr-4">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button
              onClick={toggleMenu}
              className="text-slate-300 hover:text-orange-500 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 shadow-lg absolute w-full left-0">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link to="/" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-orange-500 rounded-md">Home</Link>
            <Link to="/menu" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-orange-500 rounded-md">Menu</Link>
            <Link to="/about" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-orange-500 rounded-md">About Us</Link>
            <div className="border-t border-slate-800 my-2 pt-2"></div>
            
            {user ? (
              <>
                <div className="block px-3 py-3 text-base font-medium text-orange-500 flex items-center gap-2">
                  <User size={20} />
                  <span>Hello, {user.name}</span>
                </div>
                <button 
                  onClick={() => { handleLogout(); toggleMenu(); }} 
                  className="w-full text-left block px-3 py-3 text-base font-medium text-slate-400 hover:text-red-500 hover:bg-slate-800 rounded-md flex items-center gap-2"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-orange-500 rounded-md">Log in</Link>
                <Link to="/register" onClick={toggleMenu} className="block px-3 py-3 mt-2 text-center text-base font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-md shadow-[0_0_15px_rgba(239,68,68,0.3)]">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
