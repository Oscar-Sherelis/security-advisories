export interface Advisory {
  ghsa_id: string;
  cve_id: string | null;
  summary: string;
  description: string;
  severity: 'unknown' | 'low' | 'medium' | 'high' | 'critical';
  published_at: string;
}