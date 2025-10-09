import React from 'react';
import { Calendar } from 'lucide-react';

export default function AwardCard({ award }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={award.image} 
          alt={award.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <Calendar size={14} />
          {award.year}
        </div>
      </div>
      <div className="p-5">
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {award.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {award.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {award.description}
        </p>
      </div>
    </div>
  );
}