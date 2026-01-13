import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { trackingAPI } from '../utils/api';

function TrackingPage({ user }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
          lastUpdated: new Date().toLocaleString(),
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
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Real-time Shipment Tracking</h1>
      <p className="text-gray-600 mb-8">Enter your tracking number below to get live updates on your shipment.</p>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">TRACKING NUMBER</label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
              placeholder="e.g., GHA-8829-2024X"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 h-fit mt-6 sm:mt-0 disabled:opacity-50"
          >
            <Search size={20} /> {loading ? 'Searching...' : 'Track Now'}
          </button>
        </form>
        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
      </div>

      {/* Tracking Results */}
      {trackingData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tracking Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Status */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-gray-600 text-sm mb-2">Current Status</p>
                  <h2 className="text-3xl font-bold text-gray-900">{trackingData.status}</h2>
                </div>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(trackingData.status)}`}>
                  {trackingData.status}
                </span>
              </div>
              <p className="text-gray-600">
                <span className="font-semibold">Location:</span> {trackingData.location}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Last Updated:</span> {trackingData.lastUpdated}
              </p>
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
              <p className="text-sm text-blue-200 mt-4">Service Type: Ghana Express</p>
              <p className="text-sm text-blue-200">Weight: 4.5 kg</p>
            </div>

            {/* Recipient Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Recipient Details</h3>
              <div className="space-y-3 text-sm">
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
              <button className="w-full border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-semibold mb-2">
                📞 Call Support
              </button>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                💬 Live Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackingPage;