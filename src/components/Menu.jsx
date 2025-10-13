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
      <div className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 50C15 40 10 35 10 25C10 15 15 10 25 10" stroke="#0EA5E9" strokeWidth="6" strokeLinecap="round" fill="none"/>
                <path d="M25 50C25 40 20 35 20 25C20 15 25 10 35 10" stroke="#0EA5E9" strokeWidth="6" strokeLinecap="round" fill="none"/>
                <path d="M35 50C35 40 30 35 30 25C30 15 35 10 45 10" stroke="#10B981" strokeWidth="6" strokeLinecap="round" fill="none"/>
              </svg>
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
                    className="block w-full text-left px-6 py-2.5 pl-10 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  >
                    History
                  </button>
                  <button 
                    onClick={() => { onNavigate('vision-mission'); onClose(); }}
                    className="block w-full text-left px-6 py-2.5 pl-10 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Vision, Mission, Policy & Services
                  </button>
                  <a href="#info-security" className="block px-6 py-2.5 pl-10 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600" onClick={onClose}>
                    Information Security Policy Statement
                  </a>
                </div>
              )}
            </div>

            <a
              href="#csr"
              className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-t border-gray-100"
              onClick={onClose}
            >
              CORPORATE SOCIAL RESPONSIBILITY
            </a>

            <a
              href="#environmental"
              className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-t border-gray-100"
              onClick={onClose}
            >
              ENVIRONMENTAL
            </a>

            <a
              href="#careers"
              className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-t border-gray-100"
              onClick={onClose}
            >
              CAREERS
            </a>

            <a
              href="#contact"
              className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-t border-gray-100"
              onClick={onClose}
            >
              CONTACT US
            </a>
          </div>
        </div>
      </div>
    </>
  );
}