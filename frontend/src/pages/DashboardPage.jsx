import React, { useState, useEffect } from 'react';
import { trackingAPI } from '../utils/api';
import { MapPin, Package, AlertCircle } from 'lucide-react';

function DashboardPage({ user }) {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats] = useState({
    activeShipments: 5,
    totalDelivered: 124,
    pendingInvoices: 2
  });

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await trackingAPI.getAll();
      setShipments(response.data.data);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'text-yellow-600 bg-yellow-50',
      'Shipped': 'text-blue-600 bg-blue-50',
      'In Transit': 'text-purple-600 bg-purple-50',
      'Delivered': 'text-green-600 bg-green-50'
    };
    return colors[status] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.email}</h1>
        <p className="text-gray-600">Here's what's happening with your shipments today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Active Shipments</p>
              <p className="text-4xl font-bold text-gray-900">{stats.activeShipments}</p>
              <p className="text-green-600 text-sm mt-2">↑ 20% vs last month</p>
            </div>
            <Package className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Total Delivered</p>
              <p className="text-4xl font-bold text-gray-900">{stats.totalDelivered}</p>
              <p className="text-green-600 text-sm mt-2">↑ 15% vs last month</p>
            </div>
            <MapPin className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Pending Invoices</p>
              <p className="text-4xl font-bold text-gray-900">{stats.pendingInvoices}</p>
              <p className="text-orange-600 text-sm mt-2">⚠ Requires action</p>
            </div>
            <AlertCircle className="text-orange-600" size={32} />
          </div>
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Shipments</h2>
        
        {loading ? (
          <p className="text-gray-600">Loading shipments...</p>
        ) : shipments.length === 0 ? (
          <p className="text-gray-600">No shipments yet. Create your first shipment to get started!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Tracking ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Destination</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {shipments.slice(0, 5).map((shipment) => (
                  <tr key={shipment._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-blue-600">{shipment.trackingNumber}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{shipment.location}</td>
                    <td className="py-3 px-4 text-gray-600">{shipment.destination}</td>
                    <td className="py-3 px-4 text-gray-600">{shipment.lastUpdated?.split('T')[0]}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;