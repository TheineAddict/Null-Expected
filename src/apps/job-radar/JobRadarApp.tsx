import React, { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import type { JobSnapshot } from './types';

const JobRadarApp: React.FC = () => {
  const [snapshot, setSnapshot] = useState<JobSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/null-expected-job-radar-app/data/jobs.json');
        if (!response.ok) {
          throw new Error('Snapshot not found');
        }
        const data = await response.json();
        setSnapshot(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load snapshot');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    if (!snapshot?.jobs) return [];
    if (!searchQuery.trim()) return snapshot.jobs;

    const query = searchQuery.toLowerCase();
    return snapshot.jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query)
    );
  }, [snapshot, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading snapshot...</div>
      </div>
    );
  }

  if (error || !snapshot) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Null Expected Job Radar</h1>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <p className="text-gray-600">No snapshot found yet. Run ingestion.</p>
          </div>
        </div>
      </div>
    );
  }

  const updatedDate = new Date(snapshot.updatedAt);
  const isValidDate = !isNaN(updatedDate.getTime()) && snapshot.updatedAt !== '1970-01-01T00:00:00.000Z';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Null Expected Job Radar</h1>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-sm text-gray-500">Last Updated</div>
                <div className="text-lg font-semibold text-gray-900">
                  {isValidDate ? updatedDate.toLocaleString() : 'Never'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Jobs</div>
                <div className="text-lg font-semibold text-gray-900">
                  {snapshot.jobs.length}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </header>

        {snapshot.jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-600">No jobs in snapshot. Run ingestion to populate.</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-600">No jobs match your search.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                      {job.title}
                    </h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <a
                    href={job.canonicalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Apply
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredJobs.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {filteredJobs.length} of {snapshot.jobs.length} jobs
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRadarApp;
