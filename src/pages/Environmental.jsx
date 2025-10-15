import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Leaf, Users, Search } from 'lucide-react';
import heroPomi from '../assets/images/hero-pomi.jpg';
import heroPomi1 from '../assets/images/hero-pomi1.jpg';
import heroPomi2 from '../assets/images/hero-pomi2.jpg';
import heroPomi3 from '../assets/images/hero-pomi3.jpg';
import infoLocal1 from '../assets/images/powerplant.jpg';
import infoLocal2 from '../assets/images/safety.jpg';
import infoLocal3 from '../assets/images/enviroment.jpg';

const HeroStyles = () => (
  <style>{`
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
  @keyframes slideInRight { 0% { transform: translateX(100%) scale(1.1) rotateY(45deg); opacity: 0; } 100% { transform: translateX(0) scale(1) rotateY(0deg); opacity: 1; } }
  @keyframes slideInLeft { 0% { opacity: 0; transform: translateX(-50px); } 100% { opacity: 1; transform: translateX(0); } }
  @keyframes slideOutLeft { 0% { transform: translateX(0) scale(1) rotateY(0deg); opacity: 1; } 100% { transform: translateX(-100%) scale(0.9) rotateY(-45deg); opacity: 0; } }
  @keyframes zoomPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes parallaxMove { 0% { transform: translateZ(0) scale(1); } 25% { transform: translateZ(20px) scale(1.02); } 50% { transform: translateZ(0) scale(1); } 75% { transform: translateZ(-20px) scale(1.02); } 100% { transform: translateZ(0) scale(1); } }
  @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(18px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); } 50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); } }

  .fade-in-up { animation: fadeInUp 600ms cubic-bezier(.2,.9,.2,1) both; }
  .reveal-item { opacity: 0; transform: translateY(20px) scale(0.995); transition: transform 600ms cubic-bezier(.2,.9,.2,1), opacity 600ms cubic-bezier(.2,.9,.2,1); }
  .reveal-item.revealed { opacity: 1; transform: translateY(0) scale(1); }
  .image-panel img { transition: transform 700ms cubic-bezier(.2,.9,.2,1), filter 500ms ease; will-change: transform; }
  .image-panel:hover img { transform: translateY(-6px) scale(1.02); filter: brightness(1.03) saturate(1.02); }
  
  .gradient-border { position: relative; background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); background-size: 200% 200%; animation: shimmer 3s ease-in-out infinite; }
  .glass-card { backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.9); }
  
  @media (prefers-reduced-motion: reduce) { .reveal-item, .image-panel img { transition: none !important; animation: none !important; transform: none !important; } }
  `}</style>
);

export default function Environmental() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [contentVisible, setContentVisible] = useState(false);

  const heroImages = [
    { url: heroPomi, title: 'Environmental', subtitle: 'PT. Paiton Operation & Maintenance Indonesia' },
    { url: heroPomi1, title: 'Environmental', subtitle: 'PT. Paiton Operation & Maintenance Indonesia' },
    { url: heroPomi2, title: 'Environmental', subtitle: 'PT. Paiton Operation & Maintenance Indonesia' },
    { url: heroPomi3, title: 'Environmental', subtitle: 'PT. Paiton Operation & Maintenance Indonesia' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setIsHeroVisible(true); });
    }, { threshold: 0.1 });
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setContentVisible(true); }, { threshold: 0.12 });
    if (contentRef.current) obs.observe(contentRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => { setCurrentSlide((prev) => (prev + 1) % heroImages.length); }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // reveal observer for sections (staggered)
  useEffect(() => {
    const container = document.getElementById('env-content');
    if (!container) return;
    const items = Array.from(container.querySelectorAll('.reveal-item'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(() => el.classList.add('revealed'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, []);

  const gallery = [
    { src: infoLocal1, alt: 'Paiton Power Plant operations', caption: 'Paiton Power Plant - environment programs' },
    { src: infoLocal2, alt: 'Safety and training', caption: 'Environment & community outreach' },
    { src: infoLocal3, alt: 'Environment programs', caption: 'Biodiversity monitoring' }
  ];

  const sections = [
    {
      title: 'Biodiversity Monitoring',
      icon: Leaf,
      iconColor: 'text-green-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
      body: `In order to preserve the environment and support natural resource conservation efforts, PT Paiton Energy monitors biodiversity in 5 biodiversity monitoring point areas in Probolinggo and Situbondo Regencies. This activity aims to identify, document and evaluate the existence of various species of flora and fauna in the 5 areas designated by PT Paiton Energy, both protected and unprotected.`
    },
    {
      title: 'Monitoring & Research',
      icon: Search,
      iconColor: 'text-blue-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-100',
      body: `Monitoring includes observations of terrestrial and/or aquatic ecosystems, assessing habitat health, and measuring species populations that play an important role in ecosystem balance. The data obtained will be the basis for developing appropriate conservation strategies and ensuring that natural resource management practices are carried out in a sustainable manner for the preservation of nature and the welfare of the surrounding community.`
    },
    {
      title: 'Community Involvement',
      icon: Users,
      iconColor: 'text-purple-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-100',
      body: `The monitoring process carried out by PT Paiton Energy involves biologists, ecologists and local communities using various scientific methods, including field surveys, species data collection and analysis of changes in habitat conditions. As part of efforts to protect and preserve natural ecosystems, biodiversity monitoring carried out by PT Paiton Energy is an important step in ensuring natural balance.`
    }
  ];

  return (
    <>
      <HeroStyles />

      {/* Hero Section - Blog Style */}
      <div
        ref={heroRef}
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
        
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-800/70 to-teal-900/80" />
        
        {/* Animated overlay patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Leaf size={16} className="text-green-300" />
              <span className="text-sm font-medium">Sustainability & Conservation</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up">
              Environmental
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-green-100 animate-fade-in-up animation-delay-200">
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

      <div className="relative -mt-20 mb-12 z-30">
        <div className="mx-auto max-w-4xl p-6 sm:p-8" style={{ animation: isHeroVisible ? 'slideInLeft 0.8s ease-out forwards' : 'none' }}>
          <div className="glass-card rounded-2xl p-8 sm:p-10 shadow-2xl border-2 border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-blue-400/10 to-purple-400/10 opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight text-center">Environmental Programs</h1>
              <p className="mt-4 text-slate-700 max-w-3xl mx-auto text-center text-lg">PT Paiton Energy conducts environmental monitoring and conservation programs in its operational areas to support biodiversity and sustainable resource management.</p>
            </div>
          </div>
        </div>
      </div>

      <section id="env-content" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={contentRef}
            className={`bg-white rounded-lg shadow-xl border border-gray-100 p-6 sm:p-8 transform transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="mx-auto max-w-4xl fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start reveal-item" data-delay="80">
                <div className="order-2 lg:order-1 content-panel reveal-item" data-delay="60">
                  <div className="glass-card rounded-xl p-6 sm:p-8 border-2 border-green-200/50 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Biodiversity Monitoring</h3>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-600 my-4 rounded-full" />
                    <p className="text-gray-700 leading-relaxed">In order to preserve the environment and support natural resource conservation efforts, PT Paiton Energy monitors biodiversity in 5 monitoring point areas in Probolinggo and Situbondo Regencies. This activity aims to identify, document and evaluate the existence of various species of flora and fauna in the areas designated by PT Paiton Energy, both protected and unprotected.</p>
                  </div>
                </div>

                <div className="order-1 lg:order-2 image-panel reveal-item" data-delay="140">
                  <div className="rounded-2xl shadow-2xl overflow-hidden transition-transform duration-700 hover:scale-105 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img src={gallery[0].src} alt={gallery[0].alt} className="w-full h-80 sm:h-96 lg:h-[520px] object-cover" />
                  </div>
                  <div className="mt-3 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <p className="text-sm font-semibold text-gray-800">{gallery[0].caption}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-12">
                {sections.map((s, i) => {
                  const IconComponent = s.icon;
                  return (
                    <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center reveal-item" data-delay={100 + i * 40}>
                      {i % 2 === 0 ? (
                        <>
                          <div className="order-1 lg:order-1 image-panel">
                            <div className="rounded-2xl shadow-2xl overflow-hidden transition-transform duration-700 hover:scale-105 relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                              <img src={gallery[i % gallery.length].src} alt={gallery[i % gallery.length].alt} className="w-full h-72 object-cover" />
                            </div>
                            <div className="mt-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                              <p className="text-sm font-semibold text-gray-800">{gallery[i % gallery.length].caption}</p>
                            </div>
                          </div>

                          <div className="order-2 lg:order-2 content-panel">
                            <div className={`${s.bgColor} rounded-xl p-6 sm:p-8 shadow-lg border-2 border-white/50 transition-all duration-500 hover:shadow-2xl`}>
                              <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 bg-white rounded-lg shadow ${s.iconColor}`}>
                                  <IconComponent className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900">{s.title}</h4>
                              </div>
                              <p className="text-gray-700 leading-relaxed">{s.body}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="order-2 lg:order-1 content-panel">
                            <div className={`${s.bgColor} rounded-xl p-6 sm:p-8 shadow-lg border-2 border-white/50 transition-all duration-500 hover:shadow-2xl`}>
                              <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 bg-white rounded-lg shadow ${s.iconColor}`}>
                                  <IconComponent className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900">{s.title}</h4>
                              </div>
                              <p className="text-gray-700 leading-relaxed">{s.body}</p>
                            </div>
                          </div>

                          <div className="order-1 lg:order-2 image-panel">
                            <div className="rounded-2xl shadow-2xl overflow-hidden transition-transform duration-700 hover:scale-105 relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                              <img src={gallery[i % gallery.length].src} alt={gallery[i % gallery.length].alt} className="w-full h-72 object-cover" />
                            </div>
                            <div className="mt-3 px-3 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                              <p className="text-sm font-semibold text-gray-800">{gallery[i % gallery.length].caption}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}

                <div className="mt-8 reveal-item" data-delay="90">
                  <div className="glass-card rounded-xl p-6 sm:p-8 border-l-4 border-green-500 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow">
                          <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-green-700 font-bold text-lg">Biodiversity Protection</h4>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">Monitoring includes observations of terrestrial and/or aquatic ecosystems, assessing habitat health, and measuring species populations that play an important role in ecosystem balance. The data obtained will be the basis for developing appropriate conservation strategies and ensuring that natural resource management practices are carried out in a sustainable manner for the preservation of nature and the welfare of the surrounding community.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
