import React from 'react';
import { Advisory } from '../types/Advisory';
import { getSeverityColor, getSeverityIcon } from '../utils/severity';

interface AdvisoryCardProps {
  advisory: Advisory;
}

export const AdvisoryCard: React.FC<AdvisoryCardProps> = ({ advisory }) => {
  const SeverityIcon = getSeverityIcon(advisory.severity);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-sm text-gray-600">
              {advisory.cve_id || advisory.ghsa_id}
            </span>
            <span 
              className={`${getSeverityColor(advisory.severity)} text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1`}
            >
              <SeverityIcon className="w-4 h-4" />
              {advisory.severity.toUpperCase()}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{advisory.summary}</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-3">{advisory.description}</p>
      <div className="mt-2 text-xs text-gray-500">
        Published: {new Date(advisory.published_at).toLocaleDateString()}
      </div>
    </div>
  );
};