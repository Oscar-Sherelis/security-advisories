import React, { useState, useEffect } from 'react';
import { Advisory } from '../types/Advisory';
import { fetchAdvisories } from '../services/githubApi';
import { AdvisoryCard } from '../components/AdvisoryCard';

export const AdvisoriesOverview: React.FC = () => {
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [filteredAdvisories, setFilteredAdvisories] = useState<Advisory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');

  useEffect(() => {
    const loadAdvisories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAdvisories({ perPage: 50, sort: 'published' });
        setAdvisories(data);
        setFilteredAdvisories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch advisories');
      } finally {
        setLoading(false);
      }
    };

    loadAdvisories();
  }, []);

  useEffect(() => {
    let filtered = advisories;

    // Filter by search term (advisory name)
    if (searchTerm) {
      filtered = filtered.filter(advisory =>
        advisory.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by severity
    if (severityFilter) {
      filtered = filtered.filter(advisory => advisory.severity === severityFilter);
    }

    setFilteredAdvisories(filtered);
  }, [searchTerm, severityFilter, advisories]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading advisories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p className="font-semibold">Error loading advisories</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Security Advisories Overview
      </h1>
      
      {/* Filters Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by name
            </label>
            <input
              type="text"
              placeholder="Search advisories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by severity
            </label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
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
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredAdvisories.length} of {advisories.length} advisories
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredAdvisories.map((advisory) => (
          <AdvisoryCard key={advisory.ghsa_id} advisory={advisory} />
        ))}
      </div>

      {filteredAdvisories.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No advisories found matching your filters
        </div>
      )}
    </div>
  );
};