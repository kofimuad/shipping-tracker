import React, { useState } from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import Hero from '../components/Hero';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 2 business hours.');
    setFormData({ fullName: '', email: '', phone: '', inquiryType: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Hero 
        title="Contact Our Team"
        subtitle="Have questions about your shipment? We're here to help you move your cargo smoothly across Ghana and beyond."
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and our logistics experts will get back to you within 2 business hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Kofi Mensah"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="k.mensah@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Inquiry Type</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="domestic">Domestic Shipping</option>
                    <option value="international">International Cargo</option>
                    <option value="express">Express Delivery</option>
                    <option value="warehouse">Warehousing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+233 20 123 4567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your shipping needs..."
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Main Office</h3>
                <p className="text-gray-600 text-sm">
                  Plot 42, Independence Avenue,<br />
                  North Ridge, Accra - Ghana<br />
                  GA-076-4321
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <Phone className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Phone & Support</h3>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold">Main Line:</span> +233 (0) 30 223 4567
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold">Operations:</span> +233 (0) 24 555 0101
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">WhatsApp:</span> +233 (0) 24 555 0101
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <Clock className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Operating Hours</h3>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">Monday - Friday:</span> 08:00 AM - 06:00 PM<br />
                  <span className="font-semibold">Saturday:</span> 09:00 AM - 02:00 PM<br />
                  <span className="font-semibold text-red-600">Sunday & Holidays:</span> <span className="text-red-600">Closed</span>
                </p>
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
            💬 Live Chat
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="bg-gray-300 rounded-lg overflow-hidden h-96 mb-16">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7439029874247!2d-0.1876353!3d5.5570493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sPlot%2042%20Independence%20Avenue!2sAccra!5e0!3m2!1sen!2sgh!4v1234567890"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactPage;