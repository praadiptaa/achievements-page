import React, { useState } from 'react';
import { Search, Menu as MenuIcon, ChevronDown, X } from 'lucide-react';
import Menu from './Menu';

export default function Navbar({ onNavigate, currentPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = React.useRef(null);

  // Scroll detection
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    function handleDocClick(e) {
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, [isSearchOpen]);

  // ...existing code... (nav links rendered inline in JSX)

  // Determine if navbar should be transparent (only on homepage at top)
  const isTransparent = currentPage === 'home' && !isScrolled;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          isTransparent
            ? '' 
            : 'backdrop-blur-xl border-b border-white/20 shadow-2xl'
        }`}
        style={{
          zIndex: 9999,
          ...(isTransparent 
            ? { background: 'transparent', backdropFilter: 'none', borderBottom: 'none' } 
            : { 
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(239, 246, 255, 0.4), rgba(255, 255, 255, 0.95))', 
                backdropFilter: 'blur(20px)' 
              })
        }}
      >
        {/* Animated gradient line at top */}
        <div className={`h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-opacity duration-500 ${
          isTransparent ? 'opacity-0' : 'opacity-100'
        }`} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo */}
            <div className="flex-shrink-0 relative group">
              <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center relative">
                <img 
                  src="https://fleet.pomi.co.id/assets/img_logo/logo_pomi1.png" 
                  alt="POMI" 
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-all duration-300 hover:scale-105 relative z-10" 
                />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => onNavigate('home')}
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  currentPage === 'home'
                    ? 'text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/50'
                    : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                {currentPage !== 'home' && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <span className="relative z-10">HOME</span>
              </button>
              
              {/* About Us Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown('about')}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-1.5 transition-all duration-300 relative overflow-hidden group ${
                    ['history', 'vision-mission', 'awards', 'info-security', 'ethics'].includes(currentPage) 
                      ? 'text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/50' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {!['history', 'vision-mission', 'awards', 'info-security', 'ethics'].includes(currentPage) && (
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  <span className="relative z-10">ABOUT US</span>
                  <ChevronDown size={14} className={`relative z-10 transition-transform duration-300 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'about' && (
                  <div 
                    onMouseEnter={() => setActiveDropdown('about')} 
                    onMouseLeave={() => setActiveDropdown(null)} 
                    className="absolute left-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300"
                    style={{
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)'
                    }}
                  >
                    {/* Gradient accent */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
                    
                    <div className="p-3 grid gap-1.5">
                      <button 
                        onClick={() => { onNavigate('history'); setActiveDropdown(null); }} 
                        className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                          currentPage === 'history' 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' 
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        {currentPage !== 'history' && (
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                        <span className="relative z-10">History</span>
                      </button>
                      <button 
                        onClick={() => { onNavigate('vision-mission'); setActiveDropdown(null); }} 
                        className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                          currentPage === 'vision-mission' 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' 
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        {currentPage !== 'vision-mission' && (
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                        <span className="relative z-10">Vision, Mission & Policy</span>
                      </button>
                      <button 
                        onClick={() => { onNavigate('info-security'); setActiveDropdown(null); }} 
                        className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                          currentPage === 'info-security' 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' 
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        {currentPage !== 'info-security' && (
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                        <span className="relative z-10">Information Security Policy</span>
                      </button>
                      <button 
                        onClick={() => { onNavigate('ethics'); setActiveDropdown(null); }} 
                        className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                          currentPage === 'ethics' 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' 
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        {currentPage !== 'ethics' && (
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                        <span className="relative z-10">Ethics</span>
                      </button>
                      <button 
                        onClick={() => { onNavigate('awards'); setActiveDropdown(null); }} 
                        className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                          currentPage === 'awards' 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' 
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        {currentPage !== 'awards' && (
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                        <span className="relative z-10">Awards & Certificates</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => onNavigate('csr')} 
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  currentPage === 'csr' 
                    ? 'text-white bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg shadow-orange-500/50' 
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                {currentPage !== 'csr' && (
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <span className="relative z-10">CSR</span>
              </button>
              <button 
                onClick={() => onNavigate('environmental')} 
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  currentPage === 'environmental' 
                    ? 'text-white bg-gradient-to-r from-green-600 to-green-500 shadow-lg shadow-green-600/50' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {currentPage !== 'environmental' && (
                  <span className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <span className="relative z-10">ENVIRONMENTAL</span>
              </button>
              <button 
                onClick={() => onNavigate('careers')} 
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  currentPage === 'careers' 
                    ? 'text-white bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-lg shadow-indigo-600/50' 
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                {currentPage !== 'careers' && (
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <span className="relative z-10">CAREERS</span>
              </button>
              <button 
                onClick={() => onNavigate('contact')} 
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  currentPage === 'contact' 
                    ? 'text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-600/50' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {currentPage !== 'contact' && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <span className="relative z-10">CONTACT</span>
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className="px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group text-gray-700 hover:text-gray-900"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-gray-50 to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">BLOG</span>
              </button>
              
              {/* Search Button */}
              <div className="relative ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSearchOpen((s) => !s);
                  }}
                  className={`p-2.5 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                    isSearchOpen 
                      ? 'text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/50' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  aria-label="Toggle search"
                >
                  {!isSearchOpen && (
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  <Search size={20} className="relative z-10" />
                </button>

                {/* Search Popup */}
                {isSearchOpen && (
                  <div ref={searchRef} className="absolute right-0 mt-2 w-80 z-50">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsSearchOpen(false);
                        if (searchQuery && searchQuery.trim().length > 0) onNavigate('search', { query: searchQuery.trim() });
                        setSearchQuery('');
                      }}
                      className="relative"
                    >
                      <div className="px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-100 flex items-center gap-3"
                        style={{
                          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)'
                        }}
                      >
                        {/* Gradient accent */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
                        
                        <Search size={18} className="text-blue-500" />
                        <input
                          autoFocus
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search..."
                          className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                        />
                        <button 
                          type="button" 
                          onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }} 
                          className="text-gray-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-all duration-300"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Buttons */}
            <div className="lg:hidden flex items-center gap-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSearchOpen((s) => !s);
                }}
                className={`p-2 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  isSearchOpen 
                    ? 'text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/50' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {!isSearchOpen && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <Search size={20} className="relative z-10" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  isMobileMenuOpen
                    ? 'text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/50'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {!isMobileMenuOpen && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <span className="relative z-10">
                  {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (appears when search is toggled) */}
          {isSearchOpen && (
            <div className="lg:hidden pb-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSearchOpen(false);
                  if (searchQuery && searchQuery.trim().length > 0) onNavigate('search', { query: searchQuery.trim() });
                  setSearchQuery('');
                  setIsMobileMenuOpen(false);
                }}
                className="relative"
              >
                <div className="px-4 py-3 rounded-2xl bg-white shadow-2xl border border-gray-100 flex items-center gap-3 relative"
                  style={{
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)'
                  }}
                >
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
                  
                  <Search size={18} className="text-blue-500" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                  {searchQuery && (
                    <button 
                      type="button" 
                      onClick={() => setSearchQuery('')} 
                      className="text-gray-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Komponen Menu Mobile */}
      <Menu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onNavigate={onNavigate}
        currentPage={currentPage}
      />
    </>
  );
}