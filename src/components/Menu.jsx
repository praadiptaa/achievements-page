// src/components/Menu.jsx

import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

export default function Menu({ isOpen, onClose, onNavigate, currentPage }) {
  // State untuk mengontrol dropdown "About Us"
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Slide Menu */}
  <div className={`lg:hidden fixed top-0 right-0 h-full w-72 sm:w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <img src="https://fleet.pomi.co.id/assets/img_logo/logo_pomi1.png" alt="POMI" className="h-10 sm:h-14 w-auto object-contain" />
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-blue-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => { onNavigate('home'); onClose(); }}
              className={`block w-full text-left px-6 py-3 text-sm font-medium ${
                currentPage === 'home'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              HOME
            </button>

            {/* IMPROVEMENT: 'About Us' sekarang menjadi accordion yang bisa dibuka-tutup */}
            <div className="border-t border-gray-100">
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="w-full flex justify-between items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium text-left"
              >
                <span>ABOUT US</span>
                {isAboutOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {/* Sub-menu akan muncul jika isAboutOpen bernilai true */}
              {isAboutOpen && (
                <div className="bg-gray-50/50">
                  <button 
                    onClick={() => { onNavigate('history'); onClose(); }}
                    className={`block w-full text-left px-6 py-2.5 pl-10 text-sm transition-colors ${
                      currentPage === 'history'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    History
                  </button>
                  <button 
                    onClick={() => { onNavigate('vision-mission'); onClose(); }}
                    className={`block w-full text-left px-6 py-2.5 pl-10 text-sm transition-colors ${
                      currentPage === 'vision-mission'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    Vision, Mission, Policy & Services
                  </button>
                  <button
                    onClick={() => { onNavigate('info-security'); onClose(); }}
                    className={`block w-full text-left px-6 py-2.5 pl-10 text-sm transition-colors ${
                      currentPage === 'info-security'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    Information Security Policy Statement
                  </button>
                  <button 
                    onClick={() => { onNavigate('ethics'); onClose(); }}
                    className={`block w-full text-left px-6 py-2.5 pl-10 text-sm transition-colors ${
                      currentPage === 'ethics'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    Code of Business Conduct
                  </button>
                  <button 
                    onClick={() => { onNavigate('awards'); onClose(); }}
                    className={`block w-full text-left px-6 py-2.5 pl-10 text-sm transition-colors ${
                      currentPage === 'awards'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    Awards & Certificates
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => { onNavigate('csr'); onClose(); }}
              className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-t border-gray-100"
            >
              CORPORATE SOCIAL RESPONSIBILITY
            </button>

            <button
              onClick={() => { onNavigate('environmental'); onClose(); }}
              className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-t border-gray-100"
            >
              ENVIRONMENTAL
            </button>

            <button
              onClick={() => { onNavigate('careers'); onClose(); }}
              className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-t border-gray-100"
            >
              CAREERS
            </button>

            <button
              onClick={() => { onNavigate('contact'); onClose(); }}
              className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-t border-gray-100"
            >
              CONTACT US
            </button>
            <button
              onClick={() => { onNavigate('blog'); onClose(); }}
              className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-t border-gray-100"
            >
              BLOG
            </button>
          </div>
        </div>
      </div>
    </>
  );
}