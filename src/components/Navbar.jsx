import React, { useState } from 'react';
import { Search, Menu as MenuIcon, ChevronDown, X } from 'lucide-react';
import Menu from './Menu';

export default function Navbar({ onNavigate, currentPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = React.useRef(null);

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

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo (single external image) */}
            <div className="flex-shrink-0">
              <a href="#home" className="flex items-center">
                {/* responsive logo: slightly larger */}
                <img src="https://fleet.pomi.co.id/assets/img_logo/logo_pomi1.png" alt="POMI" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0 lg:ml-10">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3 py-2 text-sm mr-0 font-medium rounded-full transition-colors focus:outline-none ${
                  currentPage === 'home'
                    ? 'text-white bg-blue-600 shadow'
                    : 'text-gray-700 bg-white/0 hover:bg-blue-50'
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
                  className={`px-3 py-2 text-sm mr-0 font-medium rounded-full flex items-center gap-2 transition-colors focus:outline-none ${
                    ['history', 'vision-mission', 'awards'].includes(currentPage) ? 'text-white bg-blue-600 shadow' : 'text-gray-700 bg-white/0 hover:bg-blue-50'
                  }`}
                >
                  ABOUT US
                  <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'about' && (
                  <div onMouseEnter={() => setActiveDropdown('about')} onMouseLeave={() => setActiveDropdown(null)} className="absolute left-0 top-full mt-3 w-72 bg-white/95 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-100 overflow-hidden">
                    <div className="p-2 grid gap-1">
                      <button onClick={() => onNavigate('history')} className={`text-left px-4 py-2 rounded-md text-sm ${currentPage === 'history' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>History</button>
                      <button onClick={() => onNavigate('vision-mission')} className={`text-left px-4 py-2 rounded-md text-sm ${currentPage === 'vision-mission' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>Vision, Mission, Policy & Services</button>
                      <button onClick={() => onNavigate('info-security')} className={`text-left px-4 py-2 rounded-md text-sm ${currentPage === 'info-security' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>Information Security Policy Statement</button>
                      <button onClick={() => onNavigate('awards')} className={`text-left px-4 py-2 rounded-md text-sm ${currentPage === 'awards' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>Awards & Certificates</button>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => onNavigate('csr')} className={`px-3 py-2 text-sm mr-0 font-medium rounded-full transition-colors ${currentPage === 'csr' ? 'text-white bg-amber-500 shadow' : 'text-gray-700 hover:bg-amber-100'}`}>
                CORPORATE SOCIAL RESPONSIBILITY
              </button>
              <button onClick={() => onNavigate('environmental')} className={`px-3 py-2 text-sm mr-0 font-medium rounded-full transition-colors ${currentPage === 'environmental' ? 'text-white bg-green-600 shadow' : 'text-gray-700 hover:bg-green-100'}`}>
                ENVIRONMENTAL
              </button>
              <button onClick={() => onNavigate('careers')} className={`px-3 py-2 text-sm mr-0 font-medium rounded-full transition-colors ${currentPage === 'careers' ? 'text-white bg-indigo-600 shadow' : 'text-gray-700 hover:bg-indigo-50'}`}>
                CAREERS
              </button>
              <button onClick={() => onNavigate('contact')} className={`px-3 py-2 text-sm mr-0 font-medium rounded-full transition-colors ${currentPage === 'contact' ? 'text-white bg-blue-600 shadow' : 'text-gray-700 hover:bg-blue-50'}`}>
                CONTACT US
              </button>
              <button
                onClick={() => {
                  onNavigate('home');
                  // allow Home to become visible then scroll to anchor
                  setTimeout(() => {
                    const el = document.getElementById('wp-posts');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 150);
                }}
                className="px-3 py-2 text-sm mr-0 font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                BLOG
              </button>
              
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSearchOpen((s) => !s);
                  }}
                  className="p-2 mr-0 text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Toggle search"
                >
                  <Search size={20} />
                </button>

                {/* Popup */}
                {isSearchOpen && (
                  <div ref={searchRef} className="absolute right-0 mt-2 w-72 z-50">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsSearchOpen(false);
                        if (searchQuery && searchQuery.trim().length > 0) onNavigate('search', { query: searchQuery.trim() });
                        setSearchQuery('');
                      }}
                      className="relative"
                    >
                      <div className="px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100 flex items-center gap-2">
                        <Search size={16} className="text-gray-400" />
                        <input
                          autoFocus
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search site..."
                          className="flex-1 bg-transparent outline-none text-sm"
                        />
                        <button type="button" onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }} className="text-gray-500 hover:text-gray-700 p-1">
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
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors p-2 bg-white/30 rounded-lg"
              >
                {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
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