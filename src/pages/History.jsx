import React, { useState, useEffect } from 'react';
import { Award, ChevronRight, Calendar, Users, TrendingUp, Building, Edit, Shuffle, Zap, CheckCircle } from 'lucide-react';
import heroPomi from '../assets/images/hero-pomi.jpg';
import heroPomi1 from '../assets/images/hero-pomi1.jpg';
import heroPomi2 from '../assets/images/hero-pomi2.jpg';
import heroPomi3 from '../assets/images/hero-pomi3.jpg';
import Footer from '../components/Footer';
// images intentionally omitted in this page; imports removed to avoid unused variable lint errors

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

  @keyframes cardFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(0.5deg); }
  }

  @keyframes iconPulse {
    0%, 100% {
      transform: scale(1);
      filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.3));
    }
    50% {
      transform: scale(1.1);
      filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.6));
    }
  }

  @keyframes timelineGlow {
    0%, 100% {
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      border-color: rgba(59, 130, 246, 0.1);
    }
    50% {
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
      border-color: rgba(59, 130, 246, 0.3);
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

  @keyframes slideInFromSide {
    0% {
      opacity: 0;
      transform: translateX(var(--slide-direction, 50px)) scale(0.9);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes backgroundShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
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

export default function History() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});

  // Hero images for carousel
  const heroImages = [
    {
      url: heroPomi,
      title: 'History of PT. Paiton Operation & Maintenance Indonesia',
      subtitle: 'A world class power generation O&M Company'
    },
    {
      url: heroPomi1,
      title: 'History of PT. Paiton Operation & Maintenance Indonesia',
      subtitle: 'A world class power generation O&M Company'
    },
    {
      url: heroPomi2,
      title: 'History of PT. Paiton Operation & Maintenance Indonesia',
      subtitle: 'A world class power generation O&M Company'
    },
    {
      url: heroPomi3,
      title: 'History of PT. Paiton Operation & Maintenance Indonesia',
      subtitle: 'A world class power generation O&M Company'
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

  const timelineEvents = [
    {
      year: "1996",
      title: "Company Formation",
      description: "Start operating Unit 7 and 8, the company was initially formed with by the establishment of Mission Operations and Maintenance Indonesia (MOMI) as a joint venture between Edison Mission Energy and Mitsul.",
      icon: Building
    },
    {
      year: "1997",
      title: "Name Change to EMOMI",
      description: "The name of MOMI was amended to Edison Mission Operation and Maintenance Indonesia (EMOMI).",
      icon: Edit
    },
    {
      year: "2004",
      title: "Ownership Change",
      description: "Following the takeover of Edison Mission shares by International Power (UK).",
      icon: Shuffle
    },
    {
      year: "2005",
      title: "Name Change to IPMOMI",
      description: "The name of EMOMI was amended to IPM Operations and Maintenance Indonesia (IPMOMI).",
      icon: Edit
    },
    {
      year: "2012",
      title: "Unit 3 Commercial Operations",
      description: "Unit 3, the first highly efficient 815 MW coal-fired super critical power plant in Indonesia, started commercial operations.",
      icon: Zap
    },
    {
      year: "2017",
      title: "Final Name Change to PT. POMI",
      description: "The name of IPMOMI was amended to PT. Paiton Operation & Maintenance Indonesia (PT. POMI).",
      icon: CheckCircle
    }
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
        
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-gray-800/70 to-slate-900/80" />
        
        {/* Animated overlay patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-slate-400 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Calendar size={16} className="text-slate-300" />
              <span className="text-sm font-medium">Our Journey</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up">
              History
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-100 animate-fade-in-up animation-delay-200">
              PT. Paiton Operation & Maintenance Indonesia
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

      {/* Timeline Section */}
      <div
        id="timeline-section"
        data-section
        className={`py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 transition-all duration-1000 ${
          visibleSections['timeline-section']
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
        style={{
          background: 'linear-gradient(-45deg, #f9fafb, #eff6ff, #f0f9ff, #f9fafb)',
          backgroundSize: '400% 400%',
          animation: 'backgroundShift 15s ease infinite'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 relative">
              Our Journey
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A timeline of significant milestones in the history of PT. Paiton Operation & Maintenance Indonesia (POMI).
            </p>
          </div>

          <div className="relative">
            {/* Timeline line with gradient */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 hidden lg:block rounded-full shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-700 rounded-full animate-pulse"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-ping"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-500/40 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-600/20 rounded-full animate-bounce delay-500"></div>
              <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-400/50 rounded-full animate-pulse delay-2000"></div>
              <div className="absolute top-1/2 left-1/6 w-0.5 h-0.5 bg-blue-300/60 rounded-full animate-ping delay-3000"></div>
            </div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center transition-all duration-700 ${
                    visibleSections['timeline-section']
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  } ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  style={{
                    transitionDelay: visibleSections['timeline-section'] ? `${index * 200}ms` : '0ms',
                    '--slide-direction': index % 2 === 0 ? '50px' : '-50px'
                  }}
                >
                  {/* Timeline dot with glow effect */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full border-4 border-white shadow-xl hidden lg:block animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-ping"></div>
                  </div>

                  {/* Content */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div
                      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 border border-blue-100/50 group relative overflow-hidden"
                      style={{
                        animation: visibleSections['timeline-section'] ? 'fadeInUp 0.8s ease-out forwards, timelineGlow 4s ease-in-out infinite' : 'none',
                        animationDelay: visibleSections['timeline-section'] ? `${index * 200}ms` : '0ms'
                      }}
                    >
                      {/* Background gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Floating particles on hover */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-4 right-4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
                        <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-blue-500 rounded-full animate-pulse delay-500"></div>
                        <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce delay-1000"></div>
                      </div>

                      <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div
                          className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                          style={{
                            animation: 'iconPulse 3s ease-in-out infinite'
                          }}
                        >
                          <event.icon size={24} className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{event.year}</div>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors duration-300 relative z-10">{event.title}</h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 relative z-10">{event.description}</p>

                      {/* Hover effect line */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden lg:block w-2/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}