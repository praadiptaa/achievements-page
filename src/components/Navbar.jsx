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
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isTransparent
            ? '' 
            : 'backdrop-blur-md border-b border-gray-200/50 shadow-md'
        }`}
        style={{
          zIndex: 9999,
          ...(isTransparent 
            ? { backgroundColor: 'transparent', backdropFilter: 'none', borderBottom: 'none' } 
            : { backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)' })
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center">
                <img 
                  src="https://fleet.pomi.co.id/assets/img_logo/logo_pomi1.png" 
                  alt="POMI" 
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform hover:scale-105" 
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => onNavigate('home')}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === 'home'
                    ? 'text-white bg-blue-600 shadow-md'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
              >
                HOME
              </button>
              
              {/* About Us Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown('about')}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                  className={`px-4 py-2.5 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-all duration-200 ${
                    ['history', 'vision-mission', 'awards', 'info-security'].includes(currentPage) 
                      ? 'text-white bg-blue-600 shadow-md' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  ABOUT US
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'about' && (
                  <div 
                    onMouseEnter={() => setActiveDropdown('about')} 
                    onMouseLeave={() => setActiveDropdown(null)} 
                    className="absolute left-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="p-3 grid gap-1.5">
                      <button 
                        onClick={() => { onNavigate('history'); setActiveDropdown(null); }} 
                        className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === 'history' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        History
                      </button>
                      <button 
                        onClick={() => { onNavigate('vision-mission'); setActiveDropdown(null); }} 
                        className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === 'vision-mission' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Vision, Mission & Policy
                      </button>
                      <button 
                        onClick={() => { onNavigate('info-security'); setActiveDropdown(null); }} 
                        className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === 'info-security' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Information Security Policy
                      </button>
                      <button 
                        onClick={() => { onNavigate('awards'); setActiveDropdown(null); }} 
                        className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === 'awards' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Awards & Certificates
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => onNavigate('csr')} 
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === 'csr' 
                    ? 'text-white bg-orange-500 shadow-md' 
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                CSR
              </button>
              <button 
                onClick={() => onNavigate('environmental')} 
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === 'environmental' 
                    ? 'text-white bg-green-600 shadow-md' 
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                ENVIRONMENTAL
              </button>
              <button 
                onClick={() => onNavigate('careers')} 
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === 'careers' 
                    ? 'text-white bg-indigo-600 shadow-md' 
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                CAREERS
              </button>
              <button 
                onClick={() => onNavigate('contact')} 
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === 'contact' 
                    ? 'text-white bg-blue-600 shadow-md' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                CONTACT
              </button>
              <button
                onClick={() => {
                  onNavigate('home');
                  setTimeout(() => {
                    const el = document.getElementById('wp-posts');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 150);
                }}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200"
              >
                BLOG
              </button>
              
              {/* Search Button */}
              <div className="relative ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSearchOpen((s) => !s);
                  }}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    isSearchOpen 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  aria-label="Toggle search"
                >
                  <Search size={20} />
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
                      <div className="px-4 py-3 rounded-xl bg-white/95 backdrop-blur-md shadow-2xl border border-gray-200 flex items-center gap-3">
                        <Search size={18} className="text-gray-400" />
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
                          className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
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
                className={`p-2 rounded-lg transition-colors ${
                  isSearchOpen 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors p-2 bg-white/50 rounded-lg hover:bg-blue-50"
              >
                {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
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
                <div className="px-4 py-3 rounded-xl bg-white shadow-md border border-gray-200 flex items-center gap-3">
                  <Search size={18} className="text-gray-400" />
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
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
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