import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Printer, Mail, Globe, ChevronRight } from 'lucide-react';
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
  @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); } 50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); } }
  
  .fade-in-up { animation: fadeInUp 600ms cubic-bezier(.2,.9,.2,1) both; }
  .reveal-item { opacity: 0; transform: translateY(20px) scale(0.995); transition: transform 600ms cubic-bezier(.2,.9,.2,1), opacity 600ms cubic-bezier(.2,.9,.2,1); }
  .reveal-item.revealed { opacity: 1; transform: translateY(0) scale(1); }
  
  .glass-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.4); }
  .gradient-border { position: relative; background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(37, 99, 235, 0.08)); }
  .gradient-border::before { content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
  .shimmer-text { background: linear-gradient(90deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s linear infinite; }
  .float-animation { animation: float 3s ease-in-out infinite; }
  .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  
  @media (prefers-reduced-motion: reduce) { .reveal-item, .float-animation, .pulse-glow, .shimmer-text { transition: none !important; animation: none !important; transform: none !important; } }
  `}</style>
);

export default function ContactUs() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);

  const heroImages = [
    { url: heroPomi, title: 'Get In Touch', subtitle: 'We\'re here to help and answer any question you might have' },
    { url: heroPomi1, title: 'Contact Us', subtitle: 'Reach out to our team for inquiries and support' },
    { url: heroPomi2, title: 'Visit Our Office', subtitle: 'Located in Paiton, Probolinggo, East Java' },
    { url: heroPomi3, title: 'Let\'s Connect', subtitle: 'Building partnerships for a sustainable future' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setIsHeroVisible(true); });
    }, { threshold: 0.1 });
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => { setCurrentSlide((prev) => (prev + 1) % heroImages.length); }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const container = document.getElementById('contact-content');
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

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Jl. Raya Surabaya – Situbondo KM 141 Paiton, Probolinggo 67291, Jawa Timur – Indonesia',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Phone,
      title: 'Office Phone',
      content: '+62 (0) 335 771 967',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Printer,
      title: 'Fax',
      content: '+62 (0) 335 772 369',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  const websites = [
    { url: 'www.pomi.co.id', label: 'POMI Official Website' },
    { url: 'www.paitonenergy.com', label: 'Paiton Energy' },
    { url: 'www.mitsui.co.jp', label: 'Mitsui & Co.' }
  ];

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

      <div className="relative -mt-20 mb-12 z-30">
        <div className="mx-auto max-w-4xl p-6 sm:p-8" style={{ animation: isHeroVisible ? 'slideInLeft 0.8s ease-out forwards' : 'none' }}>
          <div className="glass-card rounded-2xl p-8 sm:p-10 shadow-2xl border-2 border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-cyan-400/10 to-blue-400/10 opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full shadow-lg float-animation">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent leading-tight text-center">Contact Information</h1>
              <p className="mt-4 text-slate-700 max-w-3xl mx-auto text-center text-lg">PT Paiton Operation &amp; Maintenance Indonesia — Get in touch with us for any inquiries or support.</p>
            </div>
          </div>
        </div>
      </div>

      <section id="contact-content" className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="reveal-item" data-delay={index * 80}>
                <div className="glass-card rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 float-animation`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{info.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{info.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div className="reveal-item mb-16" data-delay="240">
            <div className="glass-card rounded-3xl p-4 shadow-2xl overflow-hidden">
              <div className="aspect-video w-full rounded-2xl overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=-7.7120881,113.5773589&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PT. POMI Location Map"
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://www.google.com/maps/place/PT.+POMI/@-7.7120881,113.5773589,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Websites Section */}
          <div className="reveal-item" data-delay="320">
            <div className="glass-card gradient-border rounded-3xl p-10 shadow-2xl">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold shimmer-text">Our Websites</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {websites.map((site, index) => (
                  <a
                    key={index}
                    href={`https://${site.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-6 h-6 text-blue-600 group-hover:text-cyan-600 transition-colors" />
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{site.label}</p>
                        <p className="text-sm text-gray-600">{site.url}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-600 ml-auto mt-2 group-hover:translate-x-2 transition-transform" />
                  </a>
                ))}
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
