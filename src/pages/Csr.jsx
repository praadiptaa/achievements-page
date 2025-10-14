import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Heart, Users, Handshake, Target } from 'lucide-react';
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

  @keyframes warmGlow {
    0%, 100% { box-shadow: 0 0 30px rgba(251, 146, 60, 0.3), 0 0 60px rgba(251, 146, 60, 0.1); }
    50% { box-shadow: 0 0 40px rgba(251, 146, 60, 0.5), 0 0 80px rgba(251, 146, 60, 0.2); }
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    10%, 30% { transform: scale(1.1); }
    20%, 40% { transform: scale(1.05); }
  }

  .warm-card {
    background: linear-gradient(135deg, rgba(255,251,235,0.95), rgba(254,243,199,0.95));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 2px solid rgba(251, 146, 60, 0.2);
  }

  .warm-shadow {
    box-shadow: 0 10px 40px rgba(251, 146, 60, 0.15), 0 0 0 1px rgba(251, 146, 60, 0.1);
  }

  .fade-in-up { animation: fadeInUp 600ms cubic-bezier(.2,.9,.2,1) both; }
  .reveal-item { opacity: 0; transform: translateY(20px) scale(0.995); transition: transform 600ms cubic-bezier(.2,.9,.2,1), opacity 600ms cubic-bezier(.2,.9,.2,1); }
  .reveal-item.revealed { opacity: 1; transform: translateY(0) scale(1); }
  .image-panel img { transition: transform 700ms cubic-bezier(.2,.9,.2,1), filter 500ms ease; will-change: transform; }
  .image-panel:hover img { transform: translateY(-6px) scale(1.02); filter: brightness(1.03) saturate(1.02); }
  @media (prefers-reduced-motion: reduce) { .reveal-item, .image-panel img { transition: none !important; animation: none !important; transform: none !important; } }
  `}</style>
);

export default function Csr() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [contentVisible, setContentVisible] = useState(false);

  const heroImages = [
    { url: heroPomi, title: 'Corporate Social Responsibility', subtitle: 'PT. Paiton Operation & Maintenance Indonesia' },
    { url: heroPomi1, title: 'Corporate Social Responsibility', subtitle: 'PT. Paiton Operation & Maintenance Indonesia' },
    { url: heroPomi2, title: 'Corporate Social Responsibility', subtitle: 'PT. Paiton Operation & Maintenance Indonesia' },
    { url: heroPomi3, title: 'Corporate Social Responsibility', subtitle: 'PT. Paiton Operation & Maintenance Indonesia' }
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
    const container = document.getElementById('csr-content');
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

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  const gallery = [
    { src: infoLocal1, alt: 'Paiton Power Plant operations', caption: 'Paiton Power Plant - community programs' },
    { src: infoLocal2, alt: 'Safety and training', caption: 'Health & safety outreach' },
    { src: infoLocal3, alt: 'Environment programs', caption: 'Environment stewardship initiatives' }
  ];

  // CSR content reproduced from pomi.co.id (publicly visible summary)
  const paragraphs = [
    'Corporate Social Responsibility PT. Paiton Operation & Maintenance Indonesia is managed by Paiton Energy Company.',
    'PT. Paiton Operation & Maintenance Indonesia is committed to supporting sustainable development through responsible operations and community engagement. Our CSR activities focus on education, health, environment, and economic empowerment within communities near our operational areas.',
    'We partner with local stakeholders to design and implement programs that create lasting benefits while maintaining safety and environmental stewardship.'
  ];

  return (
    <>
      <HeroStyles />

      <div
        ref={heroRef}
        className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)' }}
      >
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
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
                className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${index === currentSlide ? 'scale-100' : 'scale-110'}`}
                style={{
                  backgroundImage: `linear-gradient(${index === currentSlide ? 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.6), rgba(0,0,0,0.6)'}), url('${image.url}')`,
                  animation: index === currentSlide ? 'none' : 'slideInRight 1s ease-out forwards',
                  transformOrigin: 'center center'
                }}
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className={`transition-all duration-1000 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-2xl mb-2 transform transition-all duration-700 ease-out text-center" style={{ animation: isHeroVisible ? 'slideInRight 0.8s ease-out forwards' : 'none', transform: isHeroVisible ? 'translateX(0) translateY(-12px)' : 'translateX(50px) translateY(0)', opacity: isHeroVisible ? 1 : 0 }}>{heroImages[currentSlide].title}</h2>
              <p className="text-lg md:text-xl text-white max-w-3xl drop-shadow-2xl transform transition-all duration-700 ease-out delay-300 mx-auto text-center" style={{ animation: isHeroVisible ? 'slideInRight 0.8s ease-out 0.3s forwards' : 'none', transform: isHeroVisible ? 'translateX(0) translateY(-6px)' : 'translateX(50px) translateY(0)', opacity: isHeroVisible ? 1 : 0 }}>{heroImages[currentSlide].subtitle}</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`} aria-label={`Go to slide ${index + 1}`} />
          ))}
        </div>

        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white p-5 rounded-full transition-all duration-300 hover:scale-110 group" aria-label="Previous slide">
          <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
        </button>

        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white p-5 rounded-full transition-all duration-300 hover:scale-110 group" aria-label="Next slide">
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

      <div className="relative -mt-20 mb-12 z-30">
        <div className="mx-auto max-w-4xl p-6 sm:p-8" style={{ animation: isHeroVisible ? 'slideInLeft 0.8s ease-out forwards' : 'none' }}>
          <div className="warm-card rounded-3xl p-8 sm:p-10 warm-shadow relative overflow-hidden">
            {/* Warm gradient background overlay with orange-amber theme */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-amber-400/10 to-yellow-400/10 pointer-events-none" />
            
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-300/20 to-amber-300/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-amber-300/20 to-yellow-300/20 rounded-full blur-3xl" />
            
            {/* Heart icon badge with animation */}
            <div className="relative flex justify-center mb-6">
              <div className="p-3 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 shadow-xl" style={{ animation: 'heartbeat 2s ease-in-out infinite' }}>
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
            </div>

            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Corporate Social Responsibility
              </h1>
              <p className="mt-4 text-amber-900 max-w-3xl mx-auto text-center font-medium text-lg">
                Corporate Social Responsibility PT. Paiton Operation & Maintenance Indonesia is managed by Paiton Energy Company.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section id="csr-content" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={contentRef} className={`bg-white rounded-lg shadow-xl border border-gray-100 p-6 sm:p-8 transform transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="mx-auto max-w-4xl fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start reveal-item" data-delay="80">
                <div className="order-2 lg:order-1 content-panel reveal-item" data-delay="60">
                  <div className="warm-card rounded-2xl p-8 warm-shadow relative overflow-hidden">
                    {/* Orange gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-yellow-500/5 pointer-events-none" />
                    
                    <article className="relative mx-auto max-w-prose prose prose-lg lg:prose-xl text-gray-800 leading-relaxed">
                      {/* Target icon badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mt-0 mb-0 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Overview</h3>
                      </div>
                      
                      <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mb-4 rounded-full" />
                      
                      {paragraphs.map((p, i) => (
                        <p key={i} className="text-gray-700">{p}</p>
                      ))}
                    </article>
                  </div>
                </div>

                <div className="order-1 lg:order-2 image-panel reveal-item" data-delay="140">
                  <div className="rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 hover:scale-105 group relative">
                    <img src={gallery[0].src} alt={gallery[0].alt} className="w-full h-80 sm:h-96 lg:h-[520px] object-cover transition-all duration-500" />
                    {/* Orange gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/0 via-amber-600/0 to-yellow-600/0 group-hover:from-orange-600/20 group-hover:via-amber-600/20 group-hover:to-yellow-600/20 transition-all duration-500" />
                  </div>
                  <div className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-300/30">
                    <p className="text-sm font-semibold text-amber-900">{gallery[0].caption}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-12">
                {/* Program Focus with Users icon */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center reveal-item" data-delay="100">
                  <div className="order-1 lg:order-1 image-panel">
                    <div className="rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 hover:scale-105 group relative">
                      <img src={gallery[1].src} alt={gallery[1].alt} className="w-full h-72 object-cover transition-all duration-500" />
                      {/* Green gradient overlay for community */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 via-emerald-600/0 to-teal-600/0 group-hover:from-green-600/20 group-hover:via-emerald-600/20 group-hover:to-teal-600/20 transition-all duration-500" />
                    </div>
                    <div className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-300/30">
                      <p className="text-sm font-semibold text-green-900">{gallery[1].caption}</p>
                    </div>
                  </div>

                  <div className="order-2 lg:order-2 content-panel">
                    <div className="warm-card rounded-2xl p-8 warm-shadow relative overflow-hidden">
                      {/* Green gradient for community theme */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 pointer-events-none" />
                      
                      {/* Users icon badge */}
                      <div className="relative flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-0">Program Focus</h4>
                      </div>

                      <div className="relative">
                        <p className="text-gray-700">Our CSR programs emphasize education, health, environment, and economic empowerment for communities near our operations. We collaborate with local stakeholders to ensure programs are tailored to community needs and culturally appropriate.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Partnerships with Handshake icon */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center reveal-item" data-delay="120">
                  <div className="order-2 lg:order-1 content-panel">
                    <div className="warm-card rounded-2xl p-8 warm-shadow relative overflow-hidden">
                      {/* Amber gradient for partnerships */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-yellow-500/5 pointer-events-none" />
                      
                      {/* Handshake icon badge */}
                      <div className="relative flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                          <Handshake className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-0">Partnerships</h4>
                      </div>

                      <div className="relative">
                        <p className="text-gray-700">We work with Paiton Energy Company and local partners to deliver services and programs. Where appropriate, we leverage expertise from subject-matter experts and NGOs to enhance outcomes.</p>
                      </div>
                    </div>
                  </div>

                  <div className="order-1 lg:order-2 image-panel">
                    <div className="rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 hover:scale-105 group relative">
                      <img src={gallery[2].src} alt={gallery[2].alt} className="w-full h-72 object-cover transition-all duration-500" />
                      {/* Amber gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 via-orange-600/0 to-yellow-600/0 group-hover:from-amber-600/20 group-hover:via-orange-600/20 group-hover:to-yellow-600/20 transition-all duration-500" />
                    </div>
                    <div className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-300/30">
                      <p className="text-sm font-semibold text-amber-900">{gallery[2].caption}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 reveal-item" data-delay="90">
                <div className="warm-card rounded-2xl p-8 warm-shadow relative overflow-hidden" style={{ animation: 'warmGlow 3s ease-in-out infinite' }}>
                  {/* Gradient background with warm colors */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 pointer-events-none" />
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/30 to-transparent rounded-bl-full" />
                  
                  {/* Heart icon badge */}
                  <div className="relative flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg">
                      <Heart className="w-6 h-6 text-white fill-white" />
                    </div>
                    <h4 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-0">Get Involved</h4>
                  </div>
                  
                  <div className="relative">
                    <p className="text-gray-700 mb-3">To learn more about POMI's CSR programs, please visit Paiton Energy's CSR page.</p>
                    <a 
                      href="https://paitonenergy.com/csr/category/introduction" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <span>Read More</span>
                      <ChevronRight className="w-5 h-5" />
                    </a>
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
