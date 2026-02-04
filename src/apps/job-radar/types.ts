export type WorkplaceType = 'REMOTE' | 'HYBRID' | 'ONSITE' | 'UNKNOWN';
export type RemoteScope = 'WORLDWIDE' | 'EUROPE' | 'EU_EEA' | 'EMEA' | 'ROMANIA' | 'COUNTRY_ONLY' | 'MULTI_COUNTRY' | 'UNKNOWN';
export type JobSource = 'WWR' | 'REMOTIVE' | 'HIMALAYAS' | 'RSS' | 'GREENHOUSE' | 'LEVER';

export interface Job {
  id: string;
  sourceId: string;
  canonicalUrl: string;
  title: string;
  company: string | null;
  locationRaw: string | null;
  workplaceType: WorkplaceType;
  remoteScope: RemoteScope;
  eligibleCountries: string[];
  scopeText: string | null;
  descriptionText: string | null;
  postedAt: string | null;
  collectedAt: string;
  hashDedup: string;
  score: number;
  reasons: string[];
  source: JobSource;
}

export interface JobSnapshot {
  schemaVersion: number;
  updatedAt: string;
  jobs: Job[];
}
