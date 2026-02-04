export interface Job {
  title: string;
  company: string;
  canonicalUrl: string;
}

export interface JobSnapshot {
  schemaVersion: number;
  updatedAt: string;
  jobs: Job[];
}
