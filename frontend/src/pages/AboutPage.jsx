import React from 'react';
import Hero from '../components/Hero';
import { Award, Users, Globe } from 'lucide-react';

function AboutPage() {
  const milestones = [
    {
      year: '2014',
      title: 'Founded in Accra',
      description: 'Started with a small team of three, focusing on local freight networking and customs clearance for small SMEs.'
    },
    {
      year: '2017',
      title: 'Fleet Expansion',
      description: 'Acquired our first dedicated fleet of long-haul trucks, allowing us to offer door-to-door delivery across West Africa.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched our real-time tracking platform and mobile app, bringing full transparency to every shipment.'
    },
    {
      year: '2024',
      title: '10+ Years & Counting',
      description: 'Now serving 500+ corporate clients with a team of 150+ professionals across Ghana\'s major ports.'
    }
  ];

  const team = [
    {
      name: 'Kwame Mensah',
      role: 'Chief Executive Officer',
      image: '👨‍💼'
    },
    {
      name: 'Asana Addo',
      role: 'Operations Manager',
      image: '👨‍💼'
    },
    {
      name: 'Kofi Boateng',
      role: 'Head of Logistics',
      image: '👨‍💼'
    },
    {
      name: 'Ama Sarwaa',
      role: 'Customer Support Lead',
      image: '👩‍💼'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Hero 
        title="About Ghana Logistics"
        subtitle="Connecting Ghana to the Global Marketplace"
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200"
      />

      {/* Mission & Vision */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our mission is to provide seamless, world-class logistics and shipping solutions that empower Ghanaian businesses to thrive globally. We're committed to reliable, transparent, and innovative services that move commerce forward.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To be West Africa's most trusted logistics partner, recognized for our commitment to excellence, innovation, and customer success. We envision a future where shipping across borders is simple, fast, and secure.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-8 rounded-lg">
            <Award className="text-blue-600 mb-4" size={40} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reliability</h3>
            <p className="text-gray-600">
              We handle your cargo with the utmost care, ensuring it reaches its destination safely and on time, every time.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-lg">
            <Globe className="text-blue-600 mb-4" size={40} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Speed</h3>
            <p className="text-gray-600">
              In logistics, time is everything. Our optimized processes ensure your shipments move quickly without compromise.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-lg">
            <Users className="text-blue-600 mb-4" size={40} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Transparency</h3>
            <p className="text-gray-600">
              No hidden fees, no guesswork. Real-time updates keep you informed every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Over a Decade of Excellence</h2>
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-8 items-start">
              <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                {milestone.year}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center bg-white rounded-lg p-6 shadow-md">
              <div className="text-6xl mb-4">{member.image}</div>
              <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white rounded-lg p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">10+</div>
            <p className="text-blue-100">Years Experience</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">500k+</div>
            <p className="text-blue-100">Successful Deliveries</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">150+</div>
            <p className="text-blue-100">Logistics Experts</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">ISO</div>
            <p className="text-blue-100">Certified</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;