import React, { useState } from 'react';
import { Search, Menu as MenuIcon, ChevronDown, X } from 'lucide-react'; 
import Menu from './Menu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // ...existing code... (nav links rendered inline in JSX)

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo (single external image) */}
            <div className="flex-shrink-0">
              <a href="#home" className="flex items-center">
                <img src="https://fleet.pomi.co.id/assets/img_logo/logo_pomi1.png" alt="POMI" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <a href="#home" className="px-4 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors">
                HOME
              </a>
              
              {/* About Us Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-4 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors flex items-center gap-1">
                  ABOUT US
                  <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'about' && (
                  <div className="absolute left-0 top-full mt-0 w-64 bg-white shadow-lg border-t-2 border-blue-600">
                    <a href="#history" className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      History
                    </a>
                    <a href="#vision" className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Vision, Mission, Policy & Services
                    </a>
                    <a href="#info-security" className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Information Security Policy Statement
                    </a>
                     <a href="#awards-certificate" className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Awards & Certificates
                    </a>
                  </div>
                )}
              </div>

              <a href="#csr" className="px-4 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors">
                CORPORATE SOCIAL RESPONSIBILITY
              </a>
              <a href="#environmental" className="px-4 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors">
                ENVIRONMENTAL
              </a>
              <a href="#careers" className="px-4 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors">
                CAREERS
              </a>
              <a href="#contact" className="px-4 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors">
                CONTACT US
              </a>
              
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Search size={20} />
              </button>
            </div>

            {/* Mobile Menu Buttons */}
            <div className="lg:hidden flex items-center gap-3">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {/* Gunakan X saat menu terbuka, dan MenuIcon saat tertutup */}
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
      />
    </>
  );
}