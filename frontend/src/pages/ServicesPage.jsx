import React from 'react';
import { MapPin, Zap, Package, Lock } from 'lucide-react';
import Hero from '../components/Hero';

function ServicesPage() {
  const services = [
    {
      id: 1,
      title: 'Domestic Shipping',
      icon: '🚚',
      description: 'Fast and secure inter-city delivery across Ghana',
      details: [
        'Same-day delivery in Accra CBD',
        'Next-day delivery to Kumasi, Takoradi, Tamale',
        'Real-time GPS tracking',
        'Professional drivers and secured vehicles',
        'Signature confirmation'
      ],
      price: 'Starting from GHS 45'
    },
    {
      id: 2,
      title: 'International Cargo',
      icon: '⛴️',
      description: 'Global air and sea freight services',
      details: [
        'Air freight to 150+ countries',
        'Sea freight with competitive rates',
        'Door-to-door pickup and delivery',
        'Customs clearance assistance',
        'Import/export documentation'
      ],
      price: 'Custom pricing'
    },
    {
      id: 3,
      title: 'Express Delivery',
      icon: '🏍️',
      description: 'Urgent door-to-door courier services',
      details: [
        'Same-day delivery (documents & parcels)',
        'Temperature-controlled options',
        'High-value item insurance',
        'Two-hour delivery window',
        'Recipient phone notification'
      ],
      price: 'Starting from GHS 150'
    },
    {
      id: 4,
      title: 'Warehousing',
      icon: '🏭',
      description: 'Secure storage and inventory management',
      details: [
        'Climate-controlled facilities',
        'Pick-and-pack services',
        'Inventory tracking',
        '24/7 CCTV surveillance',
        'Quick retrieval & dispatch'
      ],
      price: 'GHS 50/month per pallet'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Hero 
        title="Our Services"
        subtitle="Comprehensive logistics solutions tailored to your shipping needs"
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200"
      />

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="p-8">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center pt-6 border-t">
                <span className="text-blue-600 font-semibold">{service.price}</span>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Section */}
      <section className="bg-gray-50 rounded-lg p-12 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <Zap className="text-blue-600 mx-auto mb-4" size={40} />
            <h3 className="font-bold text-gray-900 mb-2">Fast Processing</h3>
            <p className="text-gray-600 text-sm">Quick turnaround times with minimal delays</p>
          </div>
          <div className="text-center">
            <Lock className="text-blue-600 mx-auto mb-4" size={40} />
            <h3 className="font-bold text-gray-900 mb-2">Secure Handling</h3>
            <p className="text-gray-600 text-sm">Your cargo protected with insurance coverage</p>
          </div>
          <div className="text-center">
            <MapPin className="text-blue-600 mx-auto mb-4" size={40} />
            <h3 className="font-bold text-gray-900 mb-2">Wide Coverage</h3>
            <p className="text-gray-600 text-sm">Reach customers across Ghana and globally</p>
          </div>
          <div className="text-center">
            <Package className="text-blue-600 mx-auto mb-4" size={40} />
            <h3 className="font-bold text-gray-900 mb-2">Real-time Tracking</h3>
            <p className="text-gray-600 text-sm">Know where your shipment is at all times</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Let us handle your logistics. Get a free quote for your shipment today.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold">
          Get a Free Quote
        </button>
      </section>
    </div>
  );
}

export default ServicesPage;