import React from 'react';
import { Shield } from 'lucide-react';

interface NavigationProps {
  currentView: 'overview' | 'search';
  onViewChange: (view: 'overview' | 'search') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              GitHub Security Advisories
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onViewChange('overview')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentView === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => onViewChange('search')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentView === 'search'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};