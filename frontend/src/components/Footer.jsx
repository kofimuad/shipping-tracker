import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ghana Logistics Co.</h3>
            <p className="text-gray-400 text-sm">
              Leading logistics provider in West Africa, moving businesses forward with speed and reliability.
            </p>
            <div className="flex gap-4 mt-4">
              <Facebook size={20} className="hover:text-blue-500 cursor-pointer" />
              <Twitter size={20} className="hover:text-blue-400 cursor-pointer" />
              <Linkedin size={20} className="hover:text-blue-600 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link to="/tracking" className="hover:text-white transition">Track Shipment</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} /> +233 30 200 1234
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> info@ghanalogistics.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} /> Ring Road Central, Accra, Ghana
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-3">
              Stay updated with the latest in logistics and trade.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l text-sm"
              />
              <button className="bg-blue-600 px-3 py-2 rounded-r hover:bg-blue-700 transition">
                ✓
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Ghana Logistics Co. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-400 text-sm mt-4 md:mt-0">
            <Link to="/" className="hover:text-white transition">Terms of Service</Link>
            <Link to="/" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition">Customs Guide</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;