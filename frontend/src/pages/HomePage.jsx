import React from 'react';
import { TrendingUp, Globe, Zap, Award } from 'lucide-react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <Hero 
        title="Global Logistics, Local Expertise"
        subtitle="Reliable shipping and supply chain solutions tailored for the Ghanaian market and your international business needs."
        backgroundImage="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200"
        ctaText="Explore Services"
        ctaLink="/services"
      />

      {/* Services Preview */}
      <section className="mb-16">
        <div className="mb-8">
          <p className="text-blue-600 font-semibold uppercase mb-2">OUR EXPERTISE</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Solutions</h2>
          <p className="text-gray-600 max-w-2xl">
            We offer a full suite of logistics services designed to simplify your supply chain from origin to destination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard 
            icon="🚚"
            title="Domestic Shipping"
            description="Fast and secure inter-city delivery across Ghana including Accra, Kumasi, and Takoradi. Real-time tracking included."
          />
          <ServiceCard 
            icon="⛴️"
            title="International Cargo"
            description="Global air and sea freight connecting West Africa to major trade hubs in Europe, Asia, and the Americas."
          />
          <ServiceCard 
            icon="🏍️"
            title="Express Delivery"
            description="Urgent door-to-door courier services for critical documents and small parcels with same-day options available."
          />
          <ServiceCard 
            icon="🏭"
            title="Warehousing"
            description="Secure storage, pick-and-pack, and inventory management in our climate-controlled Ghanaian facilities."
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose Ghana Logistics</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          We combine deep local knowledge of the West African landscape with international logistics standards to deliver excellence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-8 rounded-lg">
            <Award className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Handling</h3>
            <p className="text-gray-600">
              Your shipments are protected with 24/7 monitoring and professional cargo insurance for peace of mind.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-lg">
            <Globe className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Global Network</h3>
            <p className="text-gray-600">
              Strategic partnerships in 150+ countries ensure smooth handoffs and efficient customs clearance worldwide.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-lg">
            <TrendingUp className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Customs Certified</h3>
            <p className="text-gray-600">
              Fully licensed with the Ghana Revenue Authority for rapid processing through Tema and Takoradi ports.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white rounded-lg p-12 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">15k+</div>
            <p className="text-blue-100">Shipments</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">200+</div>
            <p className="text-blue-100">Cities Covered</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">99%</div>
            <p className="text-blue-100">On-time Delivery</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <p className="text-blue-100">Support</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to ship?</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Get a specialized quote for your bulk cargo today. Our team will help you find the perfect logistics solution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contact"
            className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
          >
            Start Shipping Now
          </Link>
          <Link 
            to="/tracking"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition font-semibold"
          >
            Track a Shipment
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;