import React, { useState, useEffect, useRef } from 'react';
import { Target, Eye, Shield, Users, Award, CheckCircle, Heart, Leaf, TrendingUp, Building, ChevronRight } from 'lucide-react';
import heroPomi from '../assets/images/hero-pomi.jpg';
import heroPomi1 from '../assets/images/hero-pomi1.jpg';
import heroPomi2 from '../assets/images/hero-pomi2.jpg';
import heroPomi3 from '../assets/images/hero-pomi3.jpg';
import powerplantImage from '../assets/images/powerplant.jpg';
import csr from '../assets/images/csr.jpg';
import envi from '../assets/images/enviroment.jpg';
import safety from '../assets/images/safety.jpg';

<style jsx>{`
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
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const heroRef = useRef(null);

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

  // Manual navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const values = [
    { icon: Shield, title: 'Trust', description: 'Building strong relationships through integrity and reliability' },
    { icon: Users, title: 'Empowerment', description: 'Enabling our team to achieve their full potential' },
    { icon: Heart, title: 'Teamwork', description: 'Collaborating together to achieve common goals' },
    { icon: TrendingUp, title: 'Continuous Improvement', description: 'Always striving for excellence and innovation' }
  ];

  return (
    <>
      {/* Hero Section with Image Carousel */}
      <div
        ref={heroRef}
        className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)'
        }}
      >
        {/* Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
              style={{
                animation: index === currentSlide
                  ? 'parallaxMove 8s ease-in-out infinite, zoomPulse 4s ease-in-out infinite'
                  : index === ((currentSlide - 1 + heroImages.length) % heroImages.length)
                    ? 'slideOutLeft 1s ease-in-out forwards'
                    : 'none',
                transformStyle: 'preserve-3d'
              }}
            >
              <div
                className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
                  index === currentSlide ? 'scale-100' : 'scale-110'
                }`}
                style={{
                  backgroundImage: `linear-gradient(${
                    index === currentSlide
                      ? 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)'
                      : 'rgba(0,0,0,0.6), rgba(0,0,0,0.6)'
                  }), url('${image.url}')`,
                  animation: index === currentSlide ? 'none' : 'slideInRight 1s ease-out forwards',
                  transformOrigin: 'center center'
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
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-2xl mb-2 transform transition-all duration-700 ease-out text-center"
                  style={{
                    animation: isHeroVisible ? 'slideInRight 0.8s ease-out forwards' : 'none',
                    transform: isHeroVisible ? 'translateX(0) translateY(-12px)' : 'translateX(50px) translateY(0)',
                    opacity: isHeroVisible ? 1 : 0
                  }}>
                {heroImages[currentSlide].title}
              </h2>
              <p className="text-lg md:text-xl text-white max-w-3xl drop-shadow-2xl transform transition-all duration-700 ease-out delay-300 mx-auto text-center"
                 style={{
                   animation: isHeroVisible ? 'slideInRight 0.8s ease-out 0.3s forwards' : 'none',
                   transform: isHeroVisible ? 'translateX(0) translateY(-6px)' : 'translateX(50px) translateY(0)',
                   opacity: isHeroVisible ? 1 : 0
                 }}>
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

        {/* Left Navigation Button */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white p-5 rounded-full transition-all duration-300 hover:scale-110 group"
          aria-label="Previous slide"
        >
          <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white p-5 rounded-full transition-all duration-300 hover:scale-110 group"
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <ChevronRight size={24} className="text-white rotate-90" />
        </div>

        {/* Animated overlay particles */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/15 rounded-full animate-bounce delay-500"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-200/25 rounded-full animate-pulse delay-2000"></div>
        </div>
      </div>

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

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white py-12 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-300 text-lg font-medium">
              © 2025 POMI - Paiton Operation & Maintenance Indonesia
            </p>
            <p className="text-gray-500 mt-2">All rights reserved.</p>
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center gap-2 mt-6 opacity-50">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-300"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>
      </footer>
    </>
  );
}