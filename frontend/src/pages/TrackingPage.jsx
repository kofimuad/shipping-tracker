import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackingAPI } from '../utils/api';

function TrackingPage({ user }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (user) {
        const response = await trackingAPI.search(trackingNumber);
        setTrackingData(response.data.data);
      } else {
        // Demo data for non-logged-in users
        setTrackingData({
          trackingNumber: trackingNumber,
          status: 'In Transit',
          location: 'Near Newam Hub',
          destination: 'Kumasi',
          lastUpdated: new Date().toISOString(),
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          history: [
            { status: 'In Transit', location: 'Departed Nsawam Hub', date: 'Oct 24, 14:45' },
            { status: 'Processing', location: 'Arrived at Processing Center', date: 'Oct 24, 09:15' },
            { status: 'Picked Up', location: 'Picked up from Sender', date: 'Oct 23, 16:30' }
          ]
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Tracking number not found');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Shipped': 'bg-blue-100 text-blue-800',
      'In Transit': 'bg-purple-100 text-purple-800',
      'In Ghana': 'bg-green-100 text-green-800',
      'Delivered': 'bg-emerald-100 text-emerald-800',
      'Processing': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Shipment</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">Enter your tracking number below to get live updates on your shipment's location and status.</p>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">TRACKING NUMBER</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                placeholder="e.g., GHA-8829-2024X"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg transition font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Search size={20} /> {loading ? 'Searching...' : 'Track Now'}
              </button>
            </div>
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </form>
      </div>

      {/* Tracking Results */}
      {trackingData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tracking Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Status */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm mb-2">Current Status</p>
                  <h2 className="text-3xl font-bold text-gray-900">{trackingData.status}</h2>
                </div>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusColor(trackingData.status)}`}>
                  {trackingData.status}
                </span>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-gray-700">
                  <span className="font-semibold">📍 Location:</span> {trackingData.location}
                </p>
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">🕐 Last Updated:</span> {new Date(trackingData.lastUpdated).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Shipment History</h3>
              <div className="space-y-4">
                {trackingData.history && trackingData.history.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                      {index < trackingData.history.length - 1 && (
                        <div className="w-1 h-12 bg-gray-300"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="font-semibold text-gray-900">{event.status}</p>
                      <p className="text-gray-600 text-sm">{event.location}</p>
                      <p className="text-gray-500 text-xs">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <div className="bg-blue-600 text-white rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">ESTIMATED DELIVERY</h3>
              <div className="text-3xl font-bold mb-2">Friday Oct 26</div>
              <p className="text-blue-100">Before 6:00 PM</p>
              <div className="mt-6 space-y-2 text-sm">
                <p className="text-blue-200">Service Type: Ghana Express</p>
                <p className="text-blue-200">Weight: 4.5 kg</p>
              </div>
            </div>

            {/* Recipient Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Recipient Details</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-600 font-semibold">RECEIVER</p>
                  <p className="text-gray-900">Kwame Mensah</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">DESTINATION ADDRESS</p>
                  <p className="text-gray-900">No. 15 Adam Street, Kumasi</p>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Questions about your shipment? Our team is available 24/7.
              </p>
              <button 
                onClick={() => navigate('/contact')}
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition font-semibold mb-2"
              >
                📞 Call Support
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-semibold">
                💬 Live Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Button */}
      {trackingData && (
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(`/shipment-details/${trackingNumber}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition inline-block"
          >
            View Full Details →
          </button>
        </div>
      )}
    </div>
  );
}

export default TrackingPage;