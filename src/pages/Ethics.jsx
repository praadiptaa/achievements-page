import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';
import Footer from '../components/Footer';
import heroPomi from '../assets/images/hero-pomi.jpg';
import heroPomi1 from '../assets/images/hero-pomi1.jpg';
import heroPomi2 from '../assets/images/hero-pomi2.jpg';
import heroPomi3 from '../assets/images/hero-pomi3.jpg';

<style jsx>{`
  @keyframes slowZoom {
    0%, 100% { transform: scale(1.05); }
    50% { transform: scale(1.1); }
  }

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

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }
    50% {
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
    }
  }
`}</style>

export default function Ethics() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});

  // Hero images for carousel
  const heroImages = [
    {
      url: heroPomi,
      title: 'Ethics',
      subtitle: 'Operating with honesty, integrity and social responsibility'
    },
    {
      url: heroPomi1,
      title: 'Ethics',
      subtitle: 'Operating with honesty, integrity and social responsibility'
    },
    {
      url: heroPomi2,
      title: 'Ethics',
      subtitle: 'Operating with honesty, integrity and social responsibility'
    },
    {
      url: heroPomi3,
      title: 'Ethics',
      subtitle: 'Operating with honesty, integrity and social responsibility'
    }
  ];

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

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
        
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-violet-800/70 to-purple-900/80" />
        
        {/* Animated overlay patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-400 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Scale size={16} className="text-purple-300" />
              <span className="text-sm font-medium">Ethics</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up">
              Ethics
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-purple-100 animate-fade-in-up animation-delay-200">
              Operating with honesty, integrity and social responsibility
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
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

      {/* Main Content Section */}
      <div 
        id="ethics-content" 
        data-section 
        className={`py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden transition-all duration-1000 ${
          visibleSections['ethics-content'] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Floating background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-6 transition-all duration-700 delay-200 ${
              visibleSections['ethics-content'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}>
              Ethics & Code of Business Conduct
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-8 rounded-full"></div>
            <p className={`text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-400 ${
              visibleSections['ethics-content'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}>
              Operating with honesty, integrity and social responsibility
            </p>
          </div>

          {/* Introduction Text */}
          <div className={`max-w-4xl mx-auto mb-16 transition-all duration-700 delay-300 ${
            visibleSections['ethics-content'] 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-100/50">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                POMI does business with organisations as diverse as governments and multi-nationals through to local and small suppliers, all of whom rely on reliability for the generation of electricity to meet their energy requirements.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                POMI is committed to operating consistently, responsibly and ethically. POMI applies uniform standards across all business activities and the Code of Business Conduct sets out the principles to be followed.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Observance of these principles will determine how POMI is judged by shareholders, partners, customers, suppliers, the communities it serves and the governmental agencies and officials that might have jurisdiction over its business.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-semibold">
                POMI's business will be characterised by honesty, integrity and social responsibility. Public knowledge of its business affairs shall not adversely affect its local or international reputation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
