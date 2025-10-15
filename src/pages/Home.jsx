import React, { useState, useEffect, useRef } from 'react';
import { Award, ChevronRight, Play } from 'lucide-react';
import powerplantImage from '../assets/images/powerplant.jpg';
import heroPomi from '../assets/images/hero-pomi.jpg';
import csr from '../assets/images/csr.jpg';
import envi from '../assets/images/enviroment.jpg';
import safety from '../assets/images/safety.jpg';
// NOTE: add your hero video files at these paths or update the imports to point to your files
import heroVideoMp4 from '../assets/videos/hero.mp4';

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
  const [visibleSections, setVisibleSections] = useState({});
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoSharpEnough, setIsVideoSharpEnough] = useState(true);

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

  // Play/pause video based on hero visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isHeroVisible) {
      // Some browsers require play() to be triggered from a user gesture; muted allows autoplay in most browsers
      const p = video.play();
      if (p && p.catch) p.catch(() => { /* ignore autoplay rejection silently */ });
    } else {
      try { video.pause(); } catch { /* ignore */ }
    }
  }, [isHeroVisible]);

  // Check video native resolution and compare to hero container to avoid upscaling low-res video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function checkResolution() {
      const heroEl = heroRef.current;
      if (!heroEl) return;
      const dpr = window.devicePixelRatio || 1;
      const neededW = Math.round(heroEl.clientWidth * dpr);
      const neededH = Math.round(heroEl.clientHeight * dpr);

      // If native video resolution is less than needed, fallback to poster to avoid pixelation
      if ((video.videoWidth && video.videoHeight) && (video.videoWidth < neededW || video.videoHeight < neededH)) {
        setIsVideoSharpEnough(false);
  try { video.pause(); } catch { void 0; }
      } else {
        setIsVideoSharpEnough(true);
      }
    }

    // run check after metadata is loaded
    if (video.readyState >= 1) checkResolution();
    const onLoaded = () => checkResolution();
    video.addEventListener('loadedmetadata', onLoaded);
    window.addEventListener('resize', checkResolution);
    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      window.removeEventListener('resize', checkResolution);
    };
  }, []);

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
      {/* Hero Section with Full Screen Video */}
      <div
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Video Hero: autoplay (muted) with poster fallback. Ensure heroVideoMp4 / heroVideoWebm exist in assets/videos/ */}
        <div className="absolute inset-0">
          {isVideoSharpEnough ? (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                poster={heroPomi}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Hero background video"
              >
                {/* MP4 source (you added hero.mp4) */}
                <source src={heroVideoMp4} type="video/mp4" />
              </video>
              {/* Subtle overlay so white text remains readable */}
              <div className="absolute inset-0 bg-black/30"></div>
            </>
          ) : (
            // If video is not sharp enough, show the poster image instead to avoid pixelation
            <img src={heroPomi} alt="Hero poster" className="absolute inset-0 w-full h-full object-cover" />
          )}
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
                Welcome to PT. Paiton Operation & Maintenance Indonesia
              </h2>
              <p className="text-lg md:text-xl text-white max-w-3xl drop-shadow-2xl transform transition-all duration-700 ease-out delay-300 mx-auto text-center"
                 style={{
                   animation: isHeroVisible ? 'slideInRight 0.8s ease-out 0.3s forwards' : 'none',
                   transform: isHeroVisible ? 'translateX(0) translateY(-6px)' : 'translateX(50px) translateY(0)',
                   opacity: isHeroVisible ? 1 : 0
                 }}>
                A world class power generation O&M Company
              </p>
            </div>
          </div>
        </div>

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
        className={`py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden transition-all duration-1000 ${
          visibleSections['about-section'] 
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
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-6 transition-all duration-700 delay-200 ${
              visibleSections['about-section'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}>
              ABOUT US
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-8 rounded-full"></div>
            <p className={`text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed transition-all duration-700 delay-400 ${
              visibleSections['about-section'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}>
              PT. POMI operates 2,035 MW (contracted) of Units 3, 7 and 8.
              Unit 3, the first highly efficient 815 MW coal-fired super critical power plant in Indonesia, started commercial operation on 27 March 2012.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className={`space-y-8 transition-all duration-700 delay-500 ${
              visibleSections['about-section'] 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-100/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></span>
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Paiton Operations & Maintenance Indonesia (POMI) operates and maintains the Paiton Energy Power Plant while promoting safety and environmental best practices, offering sustained financial returns for its Owners and achieving excellence in all that it does.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-100/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></span>
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Paiton Operations & Maintenance Indonesia (POMI) will be recognized as a World Class operator of Power Plants.
                </p>
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                <button 
                  onClick={() => onNavigate('history')}
                  className="group bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-5 rounded-xl font-medium cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-600 flex items-center justify-center gap-2"
                >
                  <span>HISTORY</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button 
                  onClick={() => onNavigate('ethics')}
                  className="group bg-white/80 backdrop-blur-sm border-2 border-blue-600 text-blue-600 py-3 px-5 rounded-xl font-medium cursor-pointer transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>ETHICS</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button 
                  onClick={() => onNavigate('vision-mission')}
                  className="group sm:col-span-2 bg-white/80 backdrop-blur-sm border-2 border-blue-600 text-blue-600 py-3 px-5 rounded-xl font-medium cursor-pointer transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>VISION, MISSION & POLICY</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => onNavigate('awards')}
                  className="group sm:col-span-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-5 rounded-xl font-medium cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-600 flex items-center justify-center gap-2"
                >
                  <span>AWARDS & CERTIFICATE</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className={`relative group transition-all duration-700 delay-700 ${
              visibleSections['about-section'] 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-2xl"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                <img
                  src={powerplantImage}
                  alt="Power Plant Operations"
                  className="relative w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-500"></div>
                
                {/* Overlay Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-lg font-bold drop-shadow-lg">PLTU Paiton Building</p>
                  <p className="text-blue-200 text-sm mt-1">World-Class Power Generation Facility</p>
                </div>
              </div>

              {/* Floating decoration */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full opacity-20 blur-2xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div 
        id="services-section" 
        data-section 
        className={`py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden transition-all duration-1000 ${
          visibleSections['services-section'] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-700 delay-200 ${
              visibleSections['services-section'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}>
              Our Core Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6 rounded-full"></div>
            <p className={`text-lg text-gray-300 max-w-3xl mx-auto transition-all duration-700 delay-400 ${
              visibleSections['services-section'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}>
              Excellence in power generation through quality, environment, and safety
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 ${
                  visibleSections['services-section'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: visibleSections['services-section'] ? `${index * 200}ms` : '0ms'
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-indigo-600/0 to-blue-600/0 group-hover:from-blue-600/20 group-hover:via-indigo-600/10 group-hover:to-blue-600/20 transition-all duration-500 z-10 pointer-events-none"></div>
                
                {/* Image */}
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(service.title);
                    }}
                  />
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative z-20">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
  {/* Posts moved to /blog page - removed from home to centralize blog content */}
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