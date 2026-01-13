import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Hero({ 
  title, 
  subtitle, 
  backgroundImage,
  ctaText = "Explore Services",
  ctaLink = "/services"
}) {
  return (
    <div 
      className="relative h-96 md:h-[500px] bg-cover bg-center rounded-2xl overflow-hidden mb-12"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 61, 130, 0.7), rgba(0, 61, 130, 0.7)), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">{title}</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-100">{subtitle}</p>
        <Link 
          to={ctaLink}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2 font-semibold"
        >
          {ctaText} <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}

export default Hero;