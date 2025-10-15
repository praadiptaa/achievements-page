import React from 'react';

export default function Footer() {
  return (
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
  );
}
