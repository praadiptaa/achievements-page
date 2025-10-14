import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Briefcase, Users, FileText, Sparkles, Trophy, Rocket, Heart } from 'lucide-react';
import heroPomi from '../assets/images/hero-pomi.jpg';
import heroPomi1 from '../assets/images/hero-pomi1.jpg';
import heroPomi2 from '../assets/images/hero-pomi2.jpg';
import heroPomi3 from '../assets/images/hero-pomi3.jpg';

const HeroStyles = () => (
  <style>{`
  @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(18px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes slideInLeft { 0% { opacity: 0; transform: translateX(-50px); } 100% { opacity: 1; transform: translateX(0); } }
  @keyframes slideInRight { 0% { opacity: 0; transform: translateX(50px); } 100% { opacity: 1; transform: translateX(0); } }
  @keyframes parallaxMove { 0%, 100% { transform: translateY(0) scale(1.05); } 50% { transform: translateY(-20px) scale(1.08); } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); } 50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); } }
  @keyframes gradient-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  
  .fade-in-up { animation: fadeInUp 600ms cubic-bezier(.2,.9,.2,1) both; }
  .reveal-item { opacity: 0; transform: translateY(20px) scale(0.995); transition: transform 600ms cubic-bezier(.2,.9,.2,1), opacity 600ms cubic-bezier(.2,.9,.2,1); }
  .reveal-item.revealed { opacity: 1; transform: translateY(0) scale(1); }
  .image-panel img { transition: transform 700ms cubic-bezier(.2,.9,.2,1), filter 500ms ease; will-change: transform; }
  .image-panel:hover img { transform: translateY(-6px) scale(1.02); filter: brightness(1.03) saturate(1.02); }
  
  .glass-card { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.4); }
  .gradient-border { position: relative; background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(124, 58, 237, 0.08)); }
  .gradient-border::before { content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, #6366f1, #7c3aed, #6d28d9); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
  .shimmer-text { background: linear-gradient(90deg, #6366f1 0%, #7c3aed 50%, #6d28d9 100%); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s linear infinite; }
  .float-animation { animation: float 3s ease-in-out infinite; }
  .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .gradient-bg { background: linear-gradient(135deg, #6366f1 0%, #7c3aed 50%, #6d28d9 100%); background-size: 200% 200%; animation: gradient-shift 8s ease infinite; }
  
  @media (prefers-reduced-motion: reduce) { .reveal-item, .image-panel img, .float-animation, .pulse-glow, .shimmer-text, .gradient-bg { transition: none !important; animation: none !important; transform: none !important; } }
  `}</style>
);

export default function Careers() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [contentVisible, setContentVisible] = useState(false);

  const heroImages = [
    { url: heroPomi, title: 'Careers at PT POMI', subtitle: 'Grow with us — build a meaningful career' },
    { url: heroPomi1, title: 'Careers at PT POMI', subtitle: 'Join a diverse and supportive team' },
    { url: heroPomi2, title: 'Careers at PT POMI', subtitle: 'Safe operations, continuous learning' },
    { url: heroPomi3, title: 'Careers at PT POMI', subtitle: 'Make an impact in the community' }
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

  useEffect(() => {
    const container = document.getElementById('careers-content');
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

  // carousel controls intentionally omitted (hero autoplay only)

  return (
    <>
      <HeroStyles />

      <div ref={heroRef} className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)' }}>
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              style={{
                animation: index === currentSlide
                  ? 'parallaxMove 8s ease-in-out infinite'
                  : 'none',
                transformStyle: 'preserve-3d'
              }}
            >
              <div
                className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${index === currentSlide ? 'scale-100' : 'scale-110'}`}
                style={{
                  backgroundImage: `linear-gradient(${index === currentSlide ? 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.6), rgba(0,0,0,0.6)'}), url('${image.url}')`,
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
            <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125 shadow-lg' : 'bg-white/40 hover:bg-white/70'}`} aria-label={`Go to slide ${index + 1}`} />
          ))}
        </div>
      </div>

      <section id="careers-content" className="py-20 bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-violet-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Intro Section with Glass Card */}
          <div ref={contentRef} className={`glass-card gradient-border rounded-3xl shadow-2xl p-8 sm:p-12 mb-12 transform transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-extrabold shimmer-text mb-4">Build Your Career With Us</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 mx-auto rounded-full"></div>
              </div>

              {/* User-provided intro content with icon badges */}
              <div className="mb-10 reveal-item space-y-6" data-delay="40">
                <div className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-indigo-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-bold text-lg leading-relaxed">Become a part of PT Paiton Operation &amp; Maintenance Indonesia's most important resource great</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-violet-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed">PT. Paiton Operation &amp; Maintenance Indonesia aims to be a world class Operation and Maintenance company located at the PAITON ENERGY owned coal-fired power plant in Paiton, Probolinggo East Java, (Unit 7/8 &amp; Unit 3).</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed">We are seeking a qualified Indonesian professional to fill the post of Job Ads :</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Apply Section - Enhanced */}
          <div className="grid grid-cols-1 gap-8 mb-12">
            <div className="reveal-item" data-delay="100">
              <div className="glass-card rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500 pulse-glow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl float-animation">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">How to Apply</h3>
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">Please submit your CV and a short cover letter to our recruitment team. Include the role title in the subject line.</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300">
                    <ChevronRight className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-800">Prepare an updated CV highlighting relevant experience.</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300">
                    <ChevronRight className="w-5 h-5 text-violet-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-800">Include certifications and training records where applicable.</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300">
                    <ChevronRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-800">Shortlisted candidates will be contacted for interview.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Button - Premium Style */}
          <div className="text-center reveal-item" data-delay="160">
            <a href="https://id.jobstreet.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 gradient-bg text-white font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl">
              <Sparkles className="w-6 h-6" />
              <span>Find Jobs on JobStreet</span>
              <ChevronRight className="w-6 h-6" />
            </a>
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
