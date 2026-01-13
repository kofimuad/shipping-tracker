import React from 'react';

function ServiceCard({ icon, title, description, link }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-200">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-semibold">
        {link || "Request a Quote"}
      </button>
    </div>
  );
}

export default ServiceCard;