export type WorkplaceType = 'REMOTE' | 'HYBRID' | 'ONSITE' | 'UNKNOWN';
export type RemoteScope = 'WORLDWIDE' | 'EUROPE' | 'EU_EEA' | 'EMEA' | 'ROMANIA' | 'COUNTRY_ONLY' | 'MULTI_COUNTRY' | 'UNKNOWN';
export type JobSource = 'WWR' | 'REMOTIVE' | 'HIMALAYAS' | 'RSS' | 'GREENHOUSE' | 'LEVER';

export interface RawJob {
  sourceId: string;
  source: JobSource;
  title: string;
  company: string | null;
  locationRaw: string | null;
  descriptionHtml: string | null;
  canonicalUrl: string;
  postedAt: string | null;
}

export interface NormalizedJob {
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

export interface SourceConfig {
  id: string;
  type: string;
  name: string;
  enabled: boolean;
  config: {
    url: string;
    params?: Record<string, any>;
  };
}

export interface SourcesConfig {
  schemaVersion: number;
  sources: SourceConfig[];
}

export interface JobSnapshot {
  schemaVersion: number;
  updatedAt: string;
  jobs: NormalizedJob[];
}

export interface MetaSnapshot {
  schemaVersion: number;
  lastRunAt: string;
  lastRunStats: {
    new: number;
    updated: number;
    total: number;
    sourcesOk: number;
    sourcesFailed: number;
  };
}
