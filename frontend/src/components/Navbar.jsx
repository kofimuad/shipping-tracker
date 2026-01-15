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
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">⬥</span>
            </div>
            <span className="font-bold text-lg text-gray-900 hidden sm:inline">Ghana Logistics Co.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 lg:gap-8">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm lg:text-base font-medium rounded-md transition ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`px-3 py-2 text-sm lg:text-base font-medium rounded-md transition ${
                isActive('/services') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Services
            </Link>
            <Link 
              to="/tracking" 
              className={`px-3 py-2 text-sm lg:text-base font-medium rounded-md transition ${
                isActive('/tracking') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Tracking
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 text-sm lg:text-base font-medium rounded-md transition ${
                isActive('/about') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 text-sm lg:text-base font-medium rounded-md transition ${
                isActive('/contact') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>

            {/* Employee Upload Link */}
            {user && user.role === 'employee' && (
              <Link 
                to="/upload-shipments" 
                className={`px-3 py-2 text-sm lg:text-base font-medium rounded-md transition ${
                  isActive('/upload-shipments') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Upload
              </Link>
            )}
          </div>

          {/* Right Section - Auth/User */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 font-medium text-sm lg:text-base px-3 py-2 rounded-md hover:bg-gray-50 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-semibold text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm lg:text-base px-3 py-2"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-semibold text-sm"
                >
                  Get a Quote
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium">Home</Link>
            <Link to="/services" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium">Services</Link>
            <Link to="/tracking" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium">Tracking</Link>
            <Link to="/about" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium">About Us</Link>
            <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium">Contact</Link>
            
            {user && user.role === 'employee' && (
              <Link to="/upload-shipments" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium">Upload Shipments</Link>
            )}

            <div className="border-t border-gray-200 pt-4 space-y-2">
              {user ? (
                <>
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium">Dashboard</Link>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-md">Sign In</Link>
                  <Link to="/register" className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold text-center">Get a Quote</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;