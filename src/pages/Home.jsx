import React, { useState, useEffect, useRef } from 'react';
import { Award, Shield, Users, Leaf, ChevronRight, Play } from 'lucide-react';
import powerplantImage from '../assets/images/powerplant.jpg';

export default function Home({ onNavigate }) {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);

  // Hero images for carousel
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Power Plant Operations',
      subtitle: 'World-class maintenance and operations'
    },
    {
      url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Sustainable Energy',
      subtitle: 'Committed to environmental excellence'
    },
    {
      url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Innovation & Technology',
      subtitle: 'Advanced solutions for power generation'
    },
    {
      url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Safety First',
      subtitle: 'Prioritizing safety in all operations'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const services = [
    {
      icon: Shield,
      title: "Trust",
      description: "Dedicated to safety, health, and environmental stewardship in all our operations."},
    {
      icon: Leaf,
      title: "Empowerment",
      description: "Committed to sustainable practices and minimizing environmental impact."},
    {
      icon: Award,
      title: "Teamwork",
      description: "Collaborative approach to deliver exceptional results for our clients."},
    {
      icon: Users,
      title: "Continuous Improvement",
      description: "Focused on innovation and excellence in power plant operations."}
  ];

  const stats = [
    { number: "15+", label: "Years of Experience" },
    { number: "500+", label: "Professional Staff" },
    { number: "99.9%", label: "Uptime Reliability" },
    { number: "50+", label: "Certifications & Awards" }
  ];

  return (
    <>
      {/* Hero Section with Image Carousel */}
      <div
        ref={heroRef}
        className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] overflow-hidden"
      >
        {/* Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${image.url}')`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div
            className={`transition-all duration-1000 ease-out ${
              isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Award size={40} className="text-blue-200" />
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                PT. POMI
              </h1>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl md:text-4xl font-semibold text-white drop-shadow-lg mb-2">
                {heroImages[currentSlide].title}
              </h2>
              <p className="text-xl md:text-2xl text-white max-w-3xl drop-shadow">
                {heroImages[currentSlide].subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <ChevronRight size={24} className="text-white rotate-90" />
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About PT. POMI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PT. POMI operates 2,035 MW (contracted) of Units 3, 7 and 8.
              Unit 3, the first highly efficient 815 MW coal-fired super critical power plant in Indonesia, started commercial operation on 27 March 2012.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                Paiton Operations & Maintenance Indonesia (POMI) operates and maintains the Paiton Energy Power Plant while promoting safety and environmental best practices, offering sustained financial returns for its Owners and achieving excellence in all that it does.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-gray-600">
                Paiton Operations & Maintenance Indonesia (POMI) will be recognized as a World Class operator of Power Plants.
              </p>
            </div>
            <div className="relative">
              <img
                src={powerplantImage}
                alt="Power Plant Operations"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              We are committed to upholding our core values in every aspect of our operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 POMI - Paiton Operation & Maintenance Indonesia. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}