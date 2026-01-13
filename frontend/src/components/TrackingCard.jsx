import React from 'react';

function TrackingCard({ trackingNumber, status, location, destination, lastUpdated }) {
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

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-600 text-sm font-semibold uppercase">Tracking Number</p>
          <p className="text-lg font-mono text-blue-600 font-bold">{trackingNumber}</p>
        </div>
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600 text-sm font-semibold">Current Location</p>
          <p className="text-gray-900 font-semibold">{location}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm font-semibold">Destination</p>
          <p className="text-gray-900 font-semibold">{destination || 'TBD'}</p>
        </div>
      </div>

      <div className="pt-4 border-t">
        <p className="text-gray-600 text-sm">
          <span className="font-semibold">Last Updated:</span> {lastUpdated}
        </p>
      </div>

      <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm">
        View Details
      </button>
    </div>
  );
}

export default TrackingCard;