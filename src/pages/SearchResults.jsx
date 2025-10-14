import React from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const q = query.get('q') || '';

  return (
    <div className="max-w-5xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Search Results</h1>
      {q ? (
        <p className="text-lg text-gray-700">Results for <span className="font-medium">"{q}"</span> (demo)</p>
      ) : (
        <p className="text-lg text-gray-700">No query provided. Use the search in the navbar to search the site.</p>
      )}

      {/* Placeholder area: real implementation could call WP API or another search backend */}
      <div className="mt-8 p-6 bg-white rounded-xl shadow">
        <p className="text-sm text-gray-500">This is a lightweight search results placeholder. Integrate your backend (WP API or other) to show real results here.</p>
      </div>
    </div>
  );
}
