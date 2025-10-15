import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Shield, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const contentRef = useRef(null);
  const [contentVisible, setContentVisible] = useState(false);

  const heroImages = [
    { url: heroPomi, title: 'Information Security Policy Statement', subtitle: 'Committed to protecting information assets and ISMS principles.' },
    { url: heroPomi1, title: 'Information Security Policy Statement', subtitle: 'Committed to protecting information assets and ISMS principles.' },
    { url: heroPomi2, title: 'Information Security Policy Statement', subtitle: 'Committed to protecting information assets and ISMS principles.' },
    { url: heroPomi3, title: 'Information Security Policy Statement', subtitle: 'Committed to protecting information assets and ISMS principles.' }
  ];

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
        
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-rose-800/70 to-red-900/80" />
        
        {/* Animated overlay patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-400 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-400 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Shield size={16} className="text-rose-300" />
              <span className="text-sm font-medium">Security & Protection</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up">
              Information Security
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-rose-100 animate-fade-in-up animation-delay-200">
              Committed to protecting information assets and ISMS principles
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
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

      {/* Intro block overlapping hero - glassmorphism design */}
      <div className="relative -mt-20 mb-12 z-30">
        <div className="mx-auto max-w-4xl p-6 sm:p-8">
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

                  <h3 className="text-xl sm:text-2xl font-bold mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">PT POMI Commitment</h3>
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

      <Footer />
    </>
  );
}
