import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Package, Calendar, Truck, CheckCircle, AlertCircle, Download, Share2, MessageSquare } from 'lucide-react';
import { trackingAPI } from '../utils/api';

function ShipmentDetailPage({ user }) {
  const { trackingNumber } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchShipmentDetails();
  }, [trackingNumber]);

  const fetchShipmentDetails = async () => {
    try {
      const response = await trackingAPI.search(trackingNumber);
      setShipment(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Shipment not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading shipment details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-red-900">Error</h3>
              <p className="text-red-700">{error}</p>
              <Link to="/tracking" className="text-red-600 hover:text-red-800 text-sm font-semibold mt-2 inline-block">
                ← Back to Tracking
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Shipped': 'bg-blue-100 text-blue-800 border-blue-300',
      'In Transit': 'bg-purple-100 text-purple-800 border-purple-300',
      'In Ghana': 'bg-green-100 text-green-800 border-green-300',
      'Delivered': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Processing': 'bg-orange-100 text-orange-800 border-orange-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': <AlertCircle size={20} />,
      'Shipped': <Package size={20} />,
      'In Transit': <Truck size={20} />,
      'In Ghana': <MapPin size={20} />,
      'Delivered': <CheckCircle size={20} />,
      'Processing': <Truck size={20} />
    };
    return icons[status] || <Package size={20} />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link to="/tracking" className="text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-flex items-center gap-1">
          ← Back to Tracking
        </Link>
        <h1 className="text-4xl font-bold text-gray-900">Shipment Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Status Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase">Tracking Number</p>
                <h2 className="text-3xl font-bold font-mono text-blue-600">{shipment.trackingNumber}</h2>
              </div>
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(shipment.status)}`}>
                {getStatusIcon(shipment.status)}
                {shipment.status}
              </span>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <p className="text-sm text-gray-600 font-semibold mb-1">CURRENT STATUS</p>
              <p className="text-2xl font-bold text-gray-900">{shipment.status}</p>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Shipment Journey</h3>
            <div className="space-y-6">
              {/* Current Location */}
              <div className="flex gap-4 pb-6 border-b-2 border-blue-200">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-blue-100"></div>
                  <div className="w-1 h-16 bg-blue-300 mt-2"></div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-bold text-gray-900 text-lg">Current Location</p>
                  <p className="text-gray-600">{shipment.location}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(shipment.lastUpdated).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Origin */}
              <div className="flex gap-4 pb-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-bold text-gray-900">Origin</p>
                  <p className="text-gray-600">Shipped from warehouse</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(shipment.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Destination */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-bold text-gray-900">Destination</p>
                  <p className="text-gray-600">{shipment.destination || 'To be determined'}</p>
                  <p className="text-sm text-gray-500 mt-1">Expected delivery coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Information */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Shipment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Tracking Number</p>
                <p className="text-lg font-mono text-gray-900 bg-gray-50 p-3 rounded border border-gray-200">
                  {shipment.trackingNumber}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Status</p>
                <span className={`inline-block px-3 py-2 rounded text-sm font-semibold border ${getStatusColor(shipment.status)}`}>
                  {shipment.status}
                </span>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Current Location</p>
                <p className="text-lg text-gray-900">{shipment.location}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Destination</p>
                <p className="text-lg text-gray-900">{shipment.destination || 'TBD'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Last Updated</p>
                <p className="text-lg text-gray-900">
                  {new Date(shipment.lastUpdated).toLocaleDateString()} at{' '}
                  {new Date(shipment.lastUpdated).toLocaleTimeString()}
                </p>
              </div>
              {shipment.phone && (
                <div>
                  <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Contact Number</p>
                  <a href={`tel:${shipment.phone}`} className="text-lg text-blue-600 hover:text-blue-700 font-semibold">
                    {shipment.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
            <h3 className="font-bold text-gray-900 mb-4">Actions</h3>
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
              <Download size={18} />
              Download Label
            </button>
            <button className="w-full flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-lg transition">
              <Share2 size={18} />
              Share Tracking
            </button>
            <button className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg transition">
              <MessageSquare size={18} />
              Message Seller
            </button>
          </div>

          {/* Key Details */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 space-y-4">
            <h3 className="font-bold text-gray-900">Quick Facts</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Calendar className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-gray-600 font-semibold">Shipped On</p>
                  <p className="text-gray-900">{new Date(shipment.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-gray-600 font-semibold">In Transit For</p>
                  <p className="text-gray-900">
                    {Math.floor((new Date() - new Date(shipment.createdAt)) / (1000 * 60 * 60 * 24))} days
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-gray-600 font-semibold">Current Zone</p>
                  <p className="text-gray-900">{shipment.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <h3 className="font-bold text-orange-900 mb-3">Need Help?</h3>
            <p className="text-sm text-orange-800 mb-4">
              Have questions about your shipment? Our support team is available 24/7.
            </p>
            <a
              href="tel:+233302001234"
              className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold transition"
            >
              📞 Call Support
            </a>
            <button className="w-full mt-2 text-center border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-4 py-2 rounded font-semibold transition">
              💬 Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShipmentDetailPage;