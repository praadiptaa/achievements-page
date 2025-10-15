import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const q = query.get('q') || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-5xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Search Results
          </h1>
          {q ? (
            <p className="text-lg text-gray-700">
              Results for <span className="font-semibold text-blue-600">"{q}"</span>
            </p>
          ) : (
            <p className="text-lg text-gray-700">No query provided. Use the search in the navbar to search the site.</p>
          )}
        </div>

        {/* Placeholder area: real implementation could call WP API or another search backend */}
        <div className="mt-8 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Search Feature Coming Soon</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This is a lightweight search results placeholder. Integrate your backend (WordPress API or other search service) to show real results here.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
