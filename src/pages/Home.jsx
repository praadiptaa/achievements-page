import React, { useState, useEffect, useRef } from 'react';
import { Award, ChevronRight, Play } from 'lucide-react';
import powerplantImage from '../assets/images/powerplant.jpg';
import pomiLogo from '../assets/images/logo-pomi.png';
import heroPomi from '../assets/images/hero-pomi.jpg';
import heroPomi1 from '../assets/images/hero-pomi1.jpg';
import heroPomi2 from '../assets/images/hero-pomi2.jpg';
import heroPomi3 from '../assets/images/hero-pomi3.jpg';
import csr from '../assets/images/csr.jpg';
import envi from '../assets/images/enviroment.jpg';
import safety from '../assets/images/safety.jpg';

<style jsx>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes slideInRight {
    0% {
      transform: translateX(100%) scale(1.1) rotateY(45deg);
      opacity: 0;
    }
    100% {
      transform: translateX(0) scale(1) rotateY(0deg);
      opacity: 1;
    }
  }

  @keyframes slideOutLeft {
    0% {
      transform: translateX(0) scale(1) rotateY(0deg);
      opacity: 1;
    }
    100% {
      transform: translateX(-100%) scale(0.9) rotateY(-45deg);
      opacity: 0;
    }
  }

  @keyframes zoomPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes parallaxMove {
    0% { transform: translateZ(0) scale(1); }
    25% { transform: translateZ(20px) scale(1.02); }
    50% { transform: translateZ(0) scale(1); }
    75% { transform: translateZ(-20px) scale(1.02); }
    100% { transform: translateZ(0) scale(1); }
  }

  @keyframes logoGlow {
    0%, 100% {
      filter: brightness(1.1) drop-shadow(0 0 10px rgba(255,255,255,0.3));
      transform: scale(1);
    }
    50% {
      filter: brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.5));
      transform: scale(1.05);
    }
  }

  @keyframes imageFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-5px) rotate(0.5deg); }
    66% { transform: translateY(5px) rotate(-0.5deg); }
  }

  @keyframes imageGlow {
    0%, 100% {
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      filter: brightness(1) contrast(1);
    }
    50% {
      box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
      filter: brightness(1.1) contrast(1.05);
    }
  }

  @keyframes borderPulse {
    0%, 100% {
      border-color: rgba(59, 130, 246, 0.2);
      border-width: 2px;
    }
    50% {
      border-color: rgba(59, 130, 246, 0.6);
      border-width: 3px;
    }
  }

  @keyframes imageZoom {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
`}</style>

export default function Home({ onNavigate }) {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const heroRef = useRef(null);

  // Hero images for carousel
  const heroImages = [
    {
      url: heroPomi,
      title: 'Welcome to PT. Paiton Operation & Maintenance Indonesia',
      subtitle: 'A world class power generation O&M Company'
    },
    {
      url: heroPomi1,
      title: 'Welcome to PT. Paiton Operation & Maintenance Indonesia',
      subtitle: 'A world class power generation O&M Company'
    },
    {
      url: heroPomi2,
      title: 'Welcome to PT. Paiton Operation & Maintenance Indonesia',
      subtitle: 'A world class power generation O&M Company'
    },
    {
      url: heroPomi3,
      title: 'Welcome to PT. Paiton Operation & Maintenance Indonesia',
      subtitle: 'A world class power generation O&M Company'
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

  // Intersection Observer for all sections
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

    // Observe all sections
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

  const services = [
    {
      title: "Sustainable Development",
      description: "All CSR programs are implemented in an effective and measurable manner.",
      image: csr
    },
    {
      title: "Environment",
      description: "We are committed to creating environmentally friendly energy and with respect for environmental protection and public health laws.",
      image: envi
    },
    {
      title: "Health & Safety",
      description: "Health & Safety, together with environmental protection and quality assurance are our key business drivers.",
      image: safety
    }
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
            <div className="flex items-center gap-3 mb-4">
              <img
                src={pomiLogo}
                alt="PT. POMI Logo"
                className="h-16 w-auto sm:h-20 md:h-24"
                style={{
                  animation: isHeroVisible ? 'logoGlow 3s ease-in-out infinite' : 'none'
                }}
              />
            </div>
            <div className="mb-8">
              <h2 className="text-2xl md:text-4xl font-semibold text-white drop-shadow-2xl mb-2 transform transition-all duration-700 ease-out"
                  style={{
                    animation: isHeroVisible ? 'slideInRight 0.8s ease-out forwards' : 'none',
                    transform: isHeroVisible ? 'translateX(0)' : 'translateX(50px)',
                    opacity: isHeroVisible ? 1 : 0
                  }}>
                {heroImages[currentSlide].title}
              </h2>
              <p className="text-xl md:text-2xl text-white max-w-3xl drop-shadow-2xl transform transition-all duration-700 ease-out delay-300"
                 style={{
                   animation: isHeroVisible ? 'slideInRight 0.8s ease-out 0.3s forwards' : 'none',
                   transform: isHeroVisible ? 'translateX(0)' : 'translateX(50px)',
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

      {/* About Section */}
      <div 
        id="about-section" 
        data-section 
        className={`py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50 transition-all duration-1000 ${
          visibleSections['about-section'] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 delay-200 ${
              visibleSections['about-section'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}>
              ABOUT US
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-400 ${
              visibleSections['about-section'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}>
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
              <div className="mt-8 space-y-4">
                <button 
                  onClick={() => onNavigate('history')}
                  className="block text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-all duration-300 hover:translate-x-2 hover:scale-105"
                >
                  HISTORY
                </button>
                <a href="#ethics" className="block text-blue-600 hover:text-blue-800 font-medium transition-all duration-300 hover:translate-x-2 hover:scale-105">
                  ETHICS
                </a>
                <button 
                  onClick={() => onNavigate('vision-mission')}
                  className="block text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-all duration-300 hover:translate-x-2 hover:scale-105"
                >
                  VISION, MISSION & POLICY
                </button>
                <a href="#awards-certificate" onClick={() => onNavigate('awards')} className="block text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-all duration-300 hover:translate-x-2 hover:scale-105">
                  AWARDS & CERTIFICATE
                </a>
              </div>
            </div>
            <div className="relative group">
              <div
                className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
              ></div>
              <img
                src={powerplantImage}
                alt="Power Plant Operations"
                className="relative rounded-lg shadow-lg w-full transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                style={{
                  animation: visibleSections['about-section']
                    ? 'imageFloat 6s ease-in-out infinite, imageGlow 4s ease-in-out infinite, borderPulse 3s ease-in-out infinite, imageZoom 8s ease-in-out infinite'
                    : 'none',
                  border: '2px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '0.5rem'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <p className="text-sm font-medium drop-shadow-lg">PLTU Paiton Building</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div 
        id="services-section" 
        data-section 
        className={`py-16 bg-gray-50 transition-all duration-1000 ${
          visibleSections['services-section'] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-2 ${
                  visibleSections['services-section'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: visibleSections['services-section'] ? `${index * 200}ms` : '0ms',
                  animation: visibleSections['services-section'] ? `float 6s ease-in-out infinite ${index * 0.5}s` : 'none'
                }}
              >
                <div className="h-48 overflow-hidden relative group">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(service.title);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
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