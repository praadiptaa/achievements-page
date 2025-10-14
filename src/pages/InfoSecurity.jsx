import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Shield, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import heroPomi from '../assets/images/hero-pomi.jpg';
import heroPomi1 from '../assets/images/hero-pomi1.jpg';
import heroPomi2 from '../assets/images/hero-pomi2.jpg';
import heroPomi3 from '../assets/images/hero-pomi3.jpg';
// Local illustrations (picked from repository assets)
import infoLocal1 from '../assets/images/powerplant.jpg';
import infoLocal2 from '../assets/images/safety.jpg';
import infoLocal3 from '../assets/images/enviroment.jpg';
// (enviroment image removed - not used)

/* Copied keyframe animations used by Home hero to preserve identical look */
const HeroStyles = () => (
  <style>{`
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

  /* subtle fade-in-up used for content */
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(18px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .fade-in-up { animation: fadeInUp 600ms cubic-bezier(.2,.9,.2,1) both; }

  /* gallery thumbnail caption slide */
  .thumb-caption { position: absolute; left: 0; right: 0; bottom: 0; padding: 0.6rem; color: #fff; background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%); transform: translateY(100%); transition: transform .28s ease, opacity .28s ease; opacity: 0; }
  .group:hover .thumb-caption, .group:focus-within .thumb-caption { transform: translateY(0); opacity: 1; }

  /* lightbox control styles */
  .lightbox-btn { background: rgba(0,0,0,0.45); color: #fff; border-radius: 9999px; padding: 8px; box-shadow: 0 6px 18px rgba(2,6,23,0.6); }

  /* Reveal / stagger effects for sections */
  .reveal-item { opacity: 0; transform: translateY(20px) scale(0.995); transition: transform 600ms cubic-bezier(.2,.9,.2,1), opacity 600ms cubic-bezier(.2,.9,.2,1); }
  .reveal-item.revealed { opacity: 1; transform: translateY(0) scale(1); }

  /* small parallax-like lift on hover for image panels */
  .image-panel img { transition: transform 700ms cubic-bezier(.2,.9,.2,1), filter 500ms ease; will-change: transform; }
  .image-panel:hover img { transform: translateY(-6px) scale(1.02); filter: brightness(1.03) saturate(1.02); }

  /* subtle entrance for content panels (a little slide from left/right) */
  .content-panel { transform-origin: left center; }
  .content-panel.revealed { transform: none; }

  /* decorative accent for revealed cards */
  .reveal-item.revealed .rounded-2xl { box-shadow: 0 18px 50px rgba(2,6,23,0.12); }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
  }

  .gradient-border {
    position: relative;
    background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
    backdrop-filter: blur(10px);
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: shimmer 3s linear infinite;
    background-size: 200% 200%;
  }

  .glass-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  /* keep things crisp on reduced-motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .reveal-item, .image-panel img { transition: none !important; animation: none !important; transform: none !important; }
  }
`}</style>
);

export default function InfoSecurity() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [contentVisible, setContentVisible] = useState(false);

  const heroImages = [
    { url: heroPomi, title: 'Information Security Policy Statement', subtitle: 'Committed to protecting information assets and ISMS principles.' },
    { url: heroPomi1, title: 'Information Security Policy Statement', subtitle: 'Committed to protecting information assets and ISMS principles.' },
    { url: heroPomi2, title: 'Information Security Policy Statement', subtitle: 'Committed to protecting information assets and ISMS principles.' },
    { url: heroPomi3, title: 'Information Security Policy Statement', subtitle: 'Committed to protecting information assets and ISMS principles.' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsHeroVisible(true);
      });
    }, { threshold: 0.1 });

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setContentVisible(true);
    }, { threshold: 0.12 });
    if (contentRef.current) obs.observe(contentRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  // Lightbox removed (images are non-interactive)

  // Use three images (lightbox indices 0..2). We still guard usage to avoid out-of-range exceptions.
  const gallery = [
    { src: infoLocal1, alt: 'Paiton Power Plant operations', caption: 'Paiton Power Plant - critical infrastructure' },
    { src: infoLocal2, alt: 'Safety and training', caption: 'Safety training and security awareness' },
    { src: infoLocal3, alt: 'Environment programs', caption: 'Environmental stewardship and programs' }
  ];

  // no lightbox keyboard handlers needed

  // IntersectionObserver to reveal and stagger-animate section children
  useEffect(() => {
    const container = document.getElementById('info-content');
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

  return (
    <>
      <HeroStyles />

      {/* Hero Section identical to Home */}
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
            {/* logo removed intentionally to keep hero minimal */}
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <ChevronRight size={24} className="text-white rotate-90" />
        </div>

        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/15 rounded-full animate-bounce delay-500"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-200/25 rounded-full animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Intro block overlapping hero - glassmorphism design */}
      <div className="relative -mt-20 mb-12 z-30">
        <div className="mx-auto max-w-4xl p-6 sm:p-8" style={{ animation: isHeroVisible ? 'slideInLeft 0.8s ease-out forwards' : 'none' }}>
          <div className="glass-card rounded-2xl p-8 sm:p-10 shadow-2xl border-2 border-white/50 relative overflow-hidden">
            {/* Gradient background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 pointer-events-none" />
            
            {/* Shield icon badge */}
            <div className="relative flex justify-center mb-6">
              <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Information Security Policy Statement
              </h1>
              <p className="mt-4 text-slate-700 max-w-3xl mx-auto text-center font-medium">
                PT POMI berkomitmen untuk melindungi informasi perusahaan dan pemangku kepentingan melalui pengelolaan ISMS yang matang dan terukur.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content with enhanced visuals (cleanly nested) */}
      <section id="info-content" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={contentRef}
            className={`bg-white rounded-lg shadow-xl border border-gray-100 p-6 sm:p-8 transform transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="mx-auto max-w-4xl fade-in-up">
              {/* Article with optional left image (gallery[2]) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {gallery[2] && (
                  <div className="reveal-item" data-delay="120">
                    <div
                      className="rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-700 hover:scale-105 image-panel group relative"
                      style={{ animation: contentVisible ? 'slideInLeft 900ms cubic-bezier(.2,.9,.2,1) both' : 'none' }}
                    >
                      <img src={gallery[2].src} alt={gallery[2].alt} className="w-full h-80 sm:h-96 lg:h-[520px] object-cover transition-all duration-500" />
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-cyan-600/0 group-hover:from-blue-600/20 group-hover:via-purple-600/20 group-hover:to-cyan-600/20 transition-all duration-500" />
                    </div>
                    <div className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-300/30">
                      <p className="text-sm font-semibold text-gray-700">{gallery[2].caption}</p>
                    </div>
                  </div>
                )}

                <article className="mx-auto max-w-prose prose prose-lg lg:prose-xl text-gray-800 leading-relaxed reveal-item" data-delay="60">
                  {/* Lock icon badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-blue-700 uppercase mb-0">Compliant with ISO/IEC 27001</p>
                  </div>

                  <h3 className="text-2xl font-bold mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">PT POMI Commitment</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 my-4 rounded-full" />

                  <p className="text-gray-700">PT POMI berkomitmen untuk menjaga keamanan, kerahasiaan, integritas, dan ketersediaan seluruh informasi serta aset teknologi informasi yang digunakan untuk mendukung kegiatan bisnis.</p>

                  <h4 className="mt-6 text-blue-900">Tujuan</h4>
                  <ul className="list-disc list-inside text-gray-800 space-y-2">
                    <li>Melindungi informasi pelanggan, karyawan, dan bisnis dari akses tidak sah.</li>
                    <li>Menjamin kontinuitas operasi dengan mengurangi risiko keamanan informasi.</li>
                    <li>Meningkatkan kesadaran melalui pelatihan agar personel memahami peran mereka dalam menjaga keamanan informasi.</li>
                  </ul>

                  <h4 className="mt-6 text-blue-900">Tanggung Jawab</h4>
                  <p className="text-gray-800">Manajemen bertanggung jawab untuk mengimplementasikan dan mendukung kebijakan ini. Seluruh personel wajib mematuhi prosedur dan segera melaporkan insiden keamanan.</p>

                  <h4 className="mt-6 text-blue-900">Peninjauan</h4>
                  <p className="text-gray-800">Kebijakan ini akan ditinjau secara berkala dan diperbarui sesuai perubahan bisnis, peraturan, atau teknologi.</p>
                </article>
              </div>

              {/* Two alternating sections with gradient cards and icons */}
              <div className="mt-12 space-y-12">
                {/* Section A: Text left, Image right - Operational Security */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center reveal-item" data-delay="80">
                  <div className="order-2 lg:order-1 content-panel">
                    <div className="glass-card rounded-2xl p-8 shadow-2xl border-2 border-white/50 relative overflow-hidden">
                      {/* Blue-cyan gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-600/10 pointer-events-none" />
                      
                      {/* Shield icon badge */}
                      <div className="relative flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-0">Keamanan Operasional</h4>
                      </div>

                      <div className="relative">
                        <p className="text-gray-700">Kami menerapkan kontrol akses, pemantauan ancaman, dan prosedur operasional standar untuk memastikan kontinuitas layanan dan melindungi aset kritis.</p>
                        <ul className="mt-4 list-disc list-inside text-gray-800 space-y-2">
                          <li>Pemeliharaan terjadwal dan audit keamanan.</li>
                          <li>Penerapan kontrol fisik dan logis.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="order-1 lg:order-2 image-panel reveal-item" data-delay="140">
                    <div className="rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 hover:scale-105 group relative">
                      <img src={gallery[0].src} alt={gallery[0].alt} className="w-full h-72 object-cover transition-all duration-500" />
                      {/* Blue gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-cyan-600/0 to-blue-700/0 group-hover:from-blue-600/20 group-hover:via-cyan-600/20 group-hover:to-blue-700/20 transition-all duration-500" />
                    </div>
                    <div className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-300/30">
                      <p className="text-sm font-semibold text-gray-700">{gallery[0].caption}</p>
                    </div>
                  </div>
                </div>

                {/* Section B: Image left, Text right - Training & Awareness */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center reveal-item" data-delay="100">
                  <div className="order-1 lg:order-1 image-panel">
                    <div className="rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 hover:scale-105 group relative">
                      <img src={gallery[1].src} alt={gallery[1].alt} className="w-full h-72 object-cover transition-all duration-500" />
                      {/* Purple gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-indigo-600/0 to-purple-700/0 group-hover:from-purple-600/20 group-hover:via-indigo-600/20 group-hover:to-purple-700/20 transition-all duration-500" />
                    </div>
                    <div className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-300/30">
                      <p className="text-sm font-semibold text-gray-700">{gallery[1].caption}</p>
                    </div>
                  </div>

                  <div className="order-2 lg:order-2 content-panel">
                    <div className="glass-card rounded-2xl p-8 shadow-2xl border-2 border-white/50 relative overflow-hidden">
                      {/* Purple-indigo gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-purple-600/10 pointer-events-none" />
                      
                      {/* AlertTriangle icon badge */}
                      <div className="relative flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-0">Kesadaran & Pelatihan</h4>
                      </div>

                      <div className="relative">
                        <p className="text-gray-700">Program pelatihan berkelanjutan meningkatkan kesadaran karyawan terhadap ancaman keamanan informasi dan peran mereka dalam mitigasi risiko.</p>
                        <ul className="mt-4 list-disc list-inside text-gray-800 space-y-2">
                          <li>Simulasi insiden dan evaluasi respons.</li>
                          <li>Pelatihan reguler dan materi pembelajaran.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Principles card with glassmorphism */}
              <div className="mt-8">
                <div className="glass-card rounded-2xl p-8 shadow-2xl border-2 border-white/50 relative overflow-hidden">
                  {/* Gradient background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 pointer-events-none" />
                  
                  {/* CheckCircle icon badge */}
                  <div className="relative flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-0">Prinsip Utama</h4>
                  </div>

                  <div className="relative">
                    <p className="text-gray-700 mb-4">Berikut adalah prinsip-prinsip inti kebijakan keamanan informasi yang menjadi dasar pelaksanaan ISMS di POMI:</p>
                    <ul className="text-gray-800 space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span><strong className="text-blue-900">Data Ownership</strong> — Data adalah aset perusahaan.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span><strong className="text-blue-900">Legitimate Use</strong> — Penggunaan TI untuk tujuan sah saja.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span><strong className="text-blue-900">Information Protection</strong> — Kontrol organisasi, teknis, dan fisik.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span><strong className="text-blue-900">Access Control</strong> — Akses berdasarkan peran.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span><strong className="text-blue-900">Threat Monitoring</strong> — Pemantauan dan evaluasi.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span><strong className="text-blue-900">Compliance</strong> — Kepatuhan oleh semua pihak terkait.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

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
