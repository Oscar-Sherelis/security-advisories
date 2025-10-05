import type { Advisory } from '../types/Advisory';

export const fetchAdvisories = async (params: {
  perPage?: number;
  severity?: string;
  affects?: string;
  sort?: string;
}): Promise<Advisory[]> => {
  const queryParams = new URLSearchParams();
  
  if (params.perPage) queryParams.append('per_page', params.perPage.toString());
  if (params.severity) queryParams.append('severity', params.severity);
  if (params.affects) queryParams.append('affects', params.affects);
  if (params.sort) queryParams.append('sort', params.sort);
  
  const response = await fetch(`https://api.github.com/advisories?${queryParams}`);
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
};