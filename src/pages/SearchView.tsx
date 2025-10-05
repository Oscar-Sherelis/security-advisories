import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { Advisory } from '../types/Advisory';
import { fetchAdvisories } from '../services/githubApi';
import { AdvisoryCard } from '../components/AdvisoryCard';

export const SearchView: React.FC = () => {
  const [packageName, setPackageName] = useState('');
  const [version, setVersion] = useState('');
  const [severity, setSeverity] = useState('');
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!packageName.trim()) {
      setError('Package name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      
      // Build the affects parameter
      const affectsParam = version 
        ? `${packageName}@${version}` 
        : packageName;
      
      const params: any = {
        perPage: 50,
        affects: affectsParam,
        sort: 'published'
      };
      
      // Add severity if selected
      if (severity) {
        params.severity = severity;
      }
      
      const data = await fetchAdvisories(params);
      setAdvisories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search advisories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Search Package Advisories
      </h1>
      
      {/* Search Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., rails, express"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Version (optional)
            </label>
            <input
              type="text"
              placeholder="e.g., 6.0.0"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity (optional)
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All severities</option>
              <option value="unknown">Unknown</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          {loading ? 'Searching...' : 'Search Advisories'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 mb-6">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching advisories...</p>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && hasSearched && (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Found {advisories.length} advisories
          </div>

          <div className="grid grid-cols-1 gap-4">
            {advisories.map((advisory) => (
              <AdvisoryCard key={advisory.ghsa_id} advisory={advisory} />
            ))}
          </div>

          {advisories.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No advisories found for the specified package
            </div>
          )}
        </>
      )}
    </div>
  );
};