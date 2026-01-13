import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

function FAQPage() {
  const [activeTab, setActiveTab] = useState('shipping');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = {
    shipping: [
      {
        question: 'What is the average delivery time for local shipments within Ghana?',
        answer: 'For shipments within Accra and Tema, we offer same-day or next-day delivery. Regional deliveries to Kumasi, Takoradi, and Tamale typically take 2-3 business days depending on the service level chosen.'
      },
      {
        question: 'Do you offer door-to-door delivery services?',
        answer: 'Yes, we offer comprehensive door-to-door delivery services for both domestic and international shipments. Our drivers will pick up from your location and deliver directly to the recipient.'
      },
      {
        question: 'What types of items can I ship?',
        answer: 'We ship a wide range of items including documents, parcels, electronics, furniture, and bulk cargo. However, we do not ship hazardous materials, weapons, or prohibited items.'
      },
      {
        question: 'Do you provide packaging materials?',
        answer: 'Yes, we offer professional packaging services for an additional fee. Our team can help ensure your items are properly packaged to prevent damage during transit.'
      }
    ],
    payments: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept bank transfers, mobile money (MTN Mobile Money, Vodafone Cash, AirtelMoney), credit/debit cards, and cash on delivery for local shipments.'
      },
      {
        question: 'How are customs duties and taxes calculated for imports?',
        answer: 'Customs duties and taxes are calculated based on the declared value of goods and the Harmonized System (HS) code. Our team can provide estimates during the booking process.'
      },
      {
        question: 'Can I pay after delivery?',
        answer: 'Yes, we offer cash-on-delivery services for local shipments. However, for international shipments, advance payment is required.'
      },
      {
        question: 'Are there any hidden charges?',
        answer: 'No, we believe in transparent pricing. All charges including fuel surcharges and handling fees are clearly listed before you confirm your shipment.'
      }
    ],
    tracking: [
      {
        question: 'Where can I find my tracking number?',
        answer: 'Your tracking number is provided in the confirmation email sent immediately after booking. You can also find it in your dashboard under "My Shipments".'
      },
      {
        question: 'How often is tracking information updated?',
        answer: 'Tracking information is updated in real-time as your shipment moves through our network. Major milestones include pickup, arrival at hubs, and delivery.'
      },
      {
        question: 'Can I change delivery address after shipment is picked up?',
        answer: 'Changes can be made within 2 hours of pickup. Please contact our support team immediately if you need to modify the delivery location.'
      },
      {
        question: 'Will I receive notifications about my shipment?',
        answer: 'Yes, you will receive email and SMS notifications at each major milestone of your shipment journey.'
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Hero 
        title="Help Center & FAQs"
        subtitle="Find answers to shipping, payments, tracking, and customs regulations for Ghana and beyond."
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200"
      />

      {/* Search */}
      <div className="mb-12">
        <input
          type="text"
          placeholder="Search for shipping questions, payments, or tracking codes..."
          className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        {['shipping', 'payments', 'tracking'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-semibold capitalize transition ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab === 'shipping' ? 'Shipping' : tab === 'payments' ? 'Payments' : 'Tracking'}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4 mb-16">
        {faqs[activeTab].map((faq, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200">
            <button
              onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition"
            >
              <h3 className="text-left font-semibold text-gray-900">{faq.question}</h3>
              <ChevronDown
                size={24}
                className={`text-gray-600 transition flex-shrink-0 ml-4 ${expandedFAQ === index ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedFAQ === index && (
              <div className="px-6 pb-6 bg-gray-50 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still have questions */}
      <div className="bg-gray-50 rounded-lg p-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          Our logistics experts are available 24/7 to help with your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Contact Us
          </Link>
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition font-semibold">
            Call Support: +233 30 200 1234
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQPage;