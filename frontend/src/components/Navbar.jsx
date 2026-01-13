import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">⬥</span>
            </div>
            <span className="font-bold text-lg text-gray-900">Ghana Logistics Co.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'} pb-2`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`${isActive('/services') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'} pb-2`}
            >
              Services
            </Link>
            <Link 
              to="/tracking" 
              className={`${isActive('/tracking') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'} pb-2`}
            >
              Tracking
            </Link>
            <Link 
              to="/about" 
              className={`${isActive('/about') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'} pb-2`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`${isActive('/contact') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'} pb-2`}
            >
              Contact
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Get a Quote
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block text-gray-700 hover:text-blue-600 py-2">Home</Link>
            <Link to="/services" className="block text-gray-700 hover:text-blue-600 py-2">Services</Link>
            <Link to="/tracking" className="block text-gray-700 hover:text-blue-600 py-2">Tracking</Link>
            <Link to="/about" className="block text-gray-700 hover:text-blue-600 py-2">About Us</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-blue-600 py-2">Contact</Link>
            {user ? (
              <button
                onClick={onLogout}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mt-2"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block text-blue-600 font-semibold py-2">Sign In</Link>
                <Link to="/register" className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition">Get a Quote</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;