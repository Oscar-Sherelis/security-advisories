import { XCircle, AlertCircle, AlertTriangle, Info, Shield } from 'lucide-react';

export const getSeverityColor = (severity: string): string => {
  const colors: Record<string, string> = {
    critical: 'bg-red-600',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-blue-500',
    unknown: 'bg-gray-500'
  };
  return colors[severity] || colors.unknown;
};

export const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical': return XCircle;
    case 'high': return AlertCircle;
    case 'medium': return AlertTriangle;
    case 'low': return Info;
    default: return Shield;
  }
};