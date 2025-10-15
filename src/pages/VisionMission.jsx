import React, { useState, useEffect } from 'react';
import { Target, Eye, Shield, Users, Award, CheckCircle, Heart, Leaf, TrendingUp, Building, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import heroPomi from '../assets/images/hero-pomi.jpg';
import heroPomi1 from '../assets/images/hero-pomi1.jpg';
import heroPomi2 from '../assets/images/hero-pomi2.jpg';
import heroPomi3 from '../assets/images/hero-pomi3.jpg';
import powerplantImage from '../assets/images/powerplant.jpg';
import csr from '../assets/images/csr.jpg';
import envi from '../assets/images/enviroment.jpg';
import safety from '../assets/images/safety.jpg';

<style jsx>{`
  @keyframes slowZoom {
    0%, 100% { transform: scale(1.05); }
    50% { transform: scale(1.1); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes slideInLeft {
    0% {
      opacity: 0;
      transform: translateX(-50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    0% {
      opacity: 0;
      transform: translateX(50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }
    50% {
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
    }
  }

  @keyframes particleFloat {
    0%, 100% {
      transform: translateY(0px) translateX(0px) rotate(0deg);
      opacity: 0.7;
    }
    33% {
      transform: translateY(-20px) translateX(10px) rotate(120deg);
      opacity: 1;
    }
    66% {
      transform: translateY(-10px) translateX(-10px) rotate(240deg);
      opacity: 0.8;
    }
  }
`}</style>

export default function VisionMission() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});

  // Hero images for carousel
  const heroImages = [
    {
      url: heroPomi,
      title: 'Vision, Mission & Policy',
      subtitle: 'Our commitment to excellence in power plant operations'
    },
    {
      url: heroPomi1,
      title: 'Vision, Mission & Policy',
      subtitle: 'Our commitment to excellence in power plant operations'
    },
    {
      url: heroPomi2,
      title: 'Vision, Mission & Policy',
      subtitle: 'Our commitment to excellence in power plant operations'
    },
    {
      url: heroPomi3,
      title: 'Vision, Mission & Policy',
      subtitle: 'Our commitment to excellence in power plant operations'
    }
  ];

  // Intersection Observer for sections
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => sectionObserver.observe(section));

    return () => sectionObserver.disconnect();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const values = [
    { icon: Shield, title: 'Trust', description: 'Building strong relationships through integrity and reliability' },
    { icon: Users, title: 'Empowerment', description: 'Enabling our team to achieve their full potential' },
    { icon: Heart, title: 'Teamwork', description: 'Collaborating together to achieve common goals' },
    { icon: TrendingUp, title: 'Continuous Improvement', description: 'Always striving for excellence and innovation' }
  ];

  return (
    <>
      {/* Hero Section - Blog Style */}
      <div
        className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] overflow-hidden"
      >
        {/* Background with overlay */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transform scale-105"
                style={{ 
                  backgroundImage: `url('${image.url}')`,
                  animation: index === currentSlide ? 'slow-zoom 20s ease-in-out infinite' : 'none'
                }}
              />
            </div>
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-cyan-800/70 to-teal-900/80" />
        
        {/* Animated overlay patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Target size={16} className="text-teal-300" />
              <span className="text-sm font-medium">Our Direction</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up">
              Vision, Mission & Policy
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-teal-100 animate-fade-in-up animation-delay-200">
              Our commitment to excellence in power plant operations
            </p>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentSlide(index)} 
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75 w-1.5'}`} 
              aria-label={`Go to slide ${index + 1}`} 
            />
          ))}
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-50 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>

      {/* Vision Section */}
      <div
        id="vision-section"
        data-section
        className={`py-20 bg-gradient-to-r from-blue-50 to-white transition-all duration-1000 ${
          visibleSections['vision-section']
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 shadow-lg">
              <Eye size={40} className="text-blue-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Side */}
            <div
              className="order-2 lg:order-1"
              style={{
                animation: visibleSections['vision-section'] ? 'slideInLeft 0.8s ease-out forwards' : 'none'
              }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl border border-blue-200">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">World Class Operator</h3>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  <span className="font-bold text-blue-800 text-xl md:text-2xl">Paiton Operations & Maintenance Indonesia (POMI)</span> will be recognized
                  as a <span className="font-extrabold text-blue-900 text-xl md:text-2xl">World Class operator of Power Plants</span>.
                </p>
                <div className="flex items-center space-x-4 text-blue-700">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Image Content - Right Side */}
            <div
              className="order-1 lg:order-2"
              style={{
                animation: visibleSections['vision-section'] ? 'slideInRight 0.8s ease-out forwards' : 'none'
              }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-2 shadow-2xl">
                  <img
                    src={powerplantImage}
                    alt="Power Plant Operations"
                    className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-300 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div
        id="mission-section"
        data-section
        className={`py-20 bg-gradient-to-r from-white to-green-50 transition-all duration-1000 ${
          visibleSections['mission-section']
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 shadow-lg">
              <Target size={40} className="text-green-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Content - Left Side */}
            <div
              className="order-1"
              style={{
                animation: visibleSections['mission-section'] ? 'slideInLeft 0.8s ease-out forwards' : 'none'
              }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-2 shadow-2xl">
                  <img
                    src={csr}
                    alt="Corporate Social Responsibility"
                    className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-300 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>

            {/* Text Content - Right Side */}
            <div
              className="order-2"
              style={{
                animation: visibleSections['mission-section'] ? 'slideInRight 0.8s ease-out forwards' : 'none'
              }}
            >
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-xl border border-green-200">
                <h3 className="text-2xl md:text-3xl font-bold text-green-900 mb-6">Operational Excellence</h3>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  <span className="font-bold text-green-800 text-xl md:text-2xl">Paiton Operations & Maintenance Indonesia (POMI)</span> operates and
                  maintains the Paiton Energy Power Plant while promoting safety and
                  environmental best practices, offering sustained financial returns for
                  its Owners and achieving excellence in all that it does.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div
        id="values-section"
        data-section
        className={`py-20 bg-gradient-to-r from-purple-50 to-white transition-all duration-1000 ${
          visibleSections['values-section']
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6 shadow-lg">
              <Award size={40} className="text-purple-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Side */}
            <div
              className="order-2 lg:order-1"
              style={{
                animation: visibleSections['values-section'] ? 'slideInLeft 0.8s ease-out forwards' : 'none'
              }}
            >
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg border border-purple-200 transform hover:scale-105 transition-all duration-300"
                    style={{
                      animation: visibleSections['values-section'] ? `fadeInUp 0.8s ease-out ${index * 0.2}s forwards` : 'none'
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg">
                        <value.icon size={24} className="text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-purple-900">{value.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Content - Right Side */}
            <div
              className="order-1 lg:order-2"
              style={{
                animation: visibleSections['values-section'] ? 'slideInRight 0.8s ease-out forwards' : 'none'
              }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-2 shadow-2xl">
                  <img
                    src={safety}
                    alt="Safety and Values"
                    className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-300 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 -right-6 w-4 h-4 bg-purple-400 rounded-full animate-ping delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Policy Section */}
      <div
        id="policy-section"
        data-section
        className={`py-20 bg-gradient-to-r from-white to-red-50 transition-all duration-1000 ${
          visibleSections['policy-section']
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6 shadow-lg">
              <Shield size={40} className="text-red-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Company Policy</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Content - Left Side */}
            <div
              className="order-1"
              style={{
                animation: visibleSections['policy-section'] ? 'slideInLeft 0.8s ease-out forwards' : 'none'
              }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-2xl p-2 shadow-2xl">
                  <img
                    src={envi}
                    alt="Environmental Policy"
                    className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-300 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 -right-6 w-5 h-5 bg-red-400 rounded-full animate-ping delay-500"></div>
              </div>
            </div>

            {/* Text Content - Right Side */}
            <div
              className="order-2"
              style={{
                animation: visibleSections['policy-section'] ? 'slideInRight 0.8s ease-out forwards' : 'none'
              }}
            >
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-xl border border-red-200">
                <h3 className="text-2xl md:text-3xl font-bold text-red-900 mb-6">Our Commitment</h3>

                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <span className="font-bold text-red-800">Paiton Operations & Maintenance Indonesia</span> is committed to operating and
                    maintaining the Paiton Energy 2x615MW and 815MW Coal Fired Power Plant in accordance
                    with the company rules, policies, and procedures.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    In order of priority, the following mandates apply: Safety First. Protect personnel and plant equipment. Environmental compliance with Indonesian Law and PPA's. Operate and maintain all power plant assets for long term profitability for Owners.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    Be a good neighbor. Support the community.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    In order to implement the above, all plant policies and procedures can and should be improved. We should always meet or exceed our stakeholder's expectations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}