import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, SlidersHorizontal, Info, AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import type { JobSnapshot, Job, RemoteScope, MetaSnapshot, Attribution } from './types';

const REMOTE_SCOPE_OPTIONS: RemoteScope[] = ['WORLDWIDE', 'EU_EEA', 'EUROPE', 'ROMANIA'];

const JobRadarApp: React.FC = () => {
  const [snapshot, setSnapshot] = useState<JobSnapshot | null>(null);
  const [meta, setMeta] = useState<MetaSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<Set<RemoteScope>>(new Set(REMOTE_SCOPE_OPTIONS));
  const [includeCountryOnly, setIncludeCountryOnly] = useState(false);
  const [includeUnknown, setIncludeUnknown] = useState(false);
  const [minScore, setMinScore] = useState(40);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showSourceHealth, setShowSourceHealth] = useState(false);
  const [sourceFilter, setSourceFilter] = useState<'all' | 'enabled' | 'failed'>('enabled');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, metaResponse] = await Promise.all([
          fetch('/null-expected-job-radar-app/data/jobs.json'),
          fetch('/null-expected-job-radar-app/data/meta.json'),
        ]);

        if (!jobsResponse.ok) {
          throw new Error('Snapshot not found');
        }

        const jobsData = await jobsResponse.json();
        setSnapshot(jobsData);

        if (metaResponse.ok) {
          const metaData = await metaResponse.json();
          setMeta(metaData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load snapshot');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleScope = (scope: RemoteScope) => {
    const newScopes = new Set(selectedScopes);
    if (newScopes.has(scope)) {
      newScopes.delete(scope);
    } else {
      newScopes.add(scope);
    }
    setSelectedScopes(newScopes);
  };

  const filteredAndSortedJobs = useMemo(() => {
    if (!snapshot?.jobs) return [];

    let filtered = snapshot.jobs.filter((job) => {
      if (job.score < minScore) return false;

      if (job.remoteScope === 'COUNTRY_ONLY' && !includeCountryOnly) return false;
      if (job.remoteScope === 'UNKNOWN' && !includeUnknown) return false;

      if (job.remoteScope !== 'COUNTRY_ONLY' &&
          job.remoteScope !== 'UNKNOWN' &&
          !selectedScopes.has(job.remoteScope)) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = job.title.toLowerCase().includes(query);
        const companyMatch = job.company?.toLowerCase().includes(query) ?? false;
        if (!titleMatch && !companyMatch) return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      const dateA = new Date(a.collectedAt).getTime();
      const dateB = new Date(b.collectedAt).getTime();
      if (dateB !== dateA) return dateB - dateA;
      return b.score - a.score;
    });

    return filtered;
  }, [snapshot, searchQuery, selectedScopes, includeCountryOnly, includeUnknown, minScore]);

  const uniqueAttributions = useMemo(() => {
    const attributions = new Map<string, Attribution>();
    filteredAndSortedJobs.forEach(job => {
      if (job.attribution) {
        attributions.set(job.attribution.name, job.attribution);
      }
    });
    return Array.from(attributions.values());
  }, [filteredAndSortedJobs]);

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

  const getScopeBadgeColor = (scope: RemoteScope): string => {
    const colors: Record<RemoteScope, string> = {
      WORLDWIDE: 'bg-green-100 text-green-800',
      EUROPE: 'bg-blue-100 text-blue-800',
      EU_EEA: 'bg-blue-100 text-blue-800',
      EMEA: 'bg-cyan-100 text-cyan-800',
      ROMANIA: 'bg-amber-100 text-amber-800',
      COUNTRY_ONLY: 'bg-orange-100 text-orange-800',
      MULTI_COUNTRY: 'bg-teal-100 text-teal-800',
      UNKNOWN: 'bg-gray-100 text-gray-800',
    };
    return colors[scope];
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Unknown';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Null Expected Job Radar</h1>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
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
              <div>
                <div className="text-sm text-gray-500">Filtered</div>
                <div className="text-lg font-semibold text-gray-900">
                  {filteredAndSortedJobs.length}
                </div>
              </div>
            </div>
          </div>

          {meta?.sourceResults && meta.sourceResults.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setShowSourceHealth(!showSourceHealth)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 mb-2"
              >
                <Clock className="w-4 h-4" />
                {showSourceHealth ? 'Hide Source Health' : 'Show Source Health'}
                {meta.sourceResults.filter(s => !s.ok).length > 0 && (
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800">
                    {meta.sourceResults.filter(s => !s.ok).length} failed
                  </span>
                )}
              </button>

              {showSourceHealth && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-2">Source Health</h2>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-medium">
                          Enabled: {meta.sourceResults.filter(s => s.enabled).length}
                        </span>
                        <span className="px-2 py-1 rounded bg-green-100 text-green-800 font-medium">
                          OK: {meta.sourceResults.filter(s => s.ok).length}
                        </span>
                        <span className="px-2 py-1 rounded bg-red-100 text-red-800 font-medium">
                          Failed: {meta.sourceResults.filter(s => !s.ok && s.enabled).length}
                        </span>
                        <span className="px-2 py-1 rounded bg-orange-100 text-orange-800 font-medium">
                          Unsupported: {meta.sourceResults.filter(s => s.errorType === 'UNSUPPORTED_SOURCE').length}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSourceFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          sourceFilter === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSourceFilter('enabled')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          sourceFilter === 'enabled'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Enabled
                      </button>
                      <button
                        onClick={() => setSourceFilter('failed')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          sourceFilter === 'failed'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Failed
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {meta.sourceResults
                      .filter(source => {
                        if (sourceFilter === 'enabled') return source.enabled;
                        if (sourceFilter === 'failed') return !source.ok && source.enabled;
                        return true;
                      })
                      .map((source) => (
                        <div
                          key={source.sourceId}
                          className={`p-3 rounded-lg border ${
                            source.ok
                              ? 'bg-green-50 border-green-200'
                              : source.errorType === 'DISABLED'
                              ? 'bg-gray-50 border-gray-200'
                              : 'bg-red-50 border-red-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {source.ok ? (
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                ) : (
                                  <AlertCircle className={`w-4 h-4 flex-shrink-0 ${
                                    source.errorType === 'DISABLED' ? 'text-gray-500' : 'text-red-600'
                                  }`} />
                                )}
                                <h3 className="font-medium text-gray-900">{source.name}</h3>
                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                  source.ok
                                    ? 'bg-green-100 text-green-800'
                                    : source.errorType === 'DISABLED'
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {source.ok ? 'OK' : source.errorType === 'DISABLED' ? 'Disabled' : 'Failed'}
                                </span>
                                {!source.enabled && (
                                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-200 text-gray-600">
                                    Not Enabled
                                  </span>
                                )}
                              </div>

                              <div className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Type:</span> {source.type}
                                {' • '}
                                <span className="font-medium">Jobs:</span> {source.itemCount}
                                {' • '}
                                <span className="font-medium">Duration:</span> {source.durationMs}ms
                                {source.httpStatus !== null && (
                                  <>
                                    {' • '}
                                    <span className="font-medium">HTTP:</span> {source.httpStatus}
                                  </>
                                )}
                              </div>

                              <div className="text-xs text-gray-500 truncate" title={source.url}>
                                {source.url}
                              </div>

                              {!source.ok && source.errorType && (
                                <div className="mt-2 p-2 bg-white rounded border border-red-200">
                                  <div className="text-xs font-semibold text-red-800 mb-1">
                                    {source.errorType.replace(/_/g, ' ')}
                                  </div>
                                  <div className="text-xs text-gray-700">
                                    {source.message}
                                  </div>
                                </div>
                              )}

                              <div className="text-xs text-gray-500 mt-1">
                                Fetched {new Date(source.fetchedAt).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {meta.sourceResults.filter(source => {
                      if (sourceFilter === 'enabled') return source.enabled;
                      if (sourceFilter === 'failed') return !source.ok && source.enabled;
                      return true;
                    }).length === 0 && (
                      <div className="text-center py-4 text-gray-600">
                        {sourceFilter === 'failed'
                          ? 'All enabled sources are healthy!'
                          : 'No sources match the current filter.'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {!meta?.sourceResults && (
            <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                No source health data available. Run ingestion to see source status.
              </p>
            </div>
          )}

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {showFilters && (
            <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remote Scope
                </label>
                <div className="flex flex-wrap gap-2">
                  {REMOTE_SCOPE_OPTIONS.map((scope) => (
                    <button
                      key={scope}
                      onClick={() => toggleScope(scope)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedScopes.has(scope)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {scope.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCountryOnly}
                    onChange={(e) => setIncludeCountryOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Include COUNTRY_ONLY</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeUnknown}
                    onChange={(e) => setIncludeUnknown(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Include UNKNOWN scope</span>
                </label>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Minimum Score
                  </label>
                  <span className="text-sm font-semibold text-blue-600">{minScore}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          )}
        </header>

        {snapshot.jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-600">No jobs in snapshot. Run ingestion to populate.</p>
          </div>
        ) : filteredAndSortedJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-600">No jobs match your filters.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getScopeBadgeColor(job.remoteScope)}`}>
                        {job.remoteScope.replace('_', ' ')}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-800">
                        Score: {job.score}
                      </span>
                      <span className="text-xs text-gray-500">
                        (0 = poor match, 100 = ideal match)
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(job.collectedAt)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-lg">
                      {job.company && <span className="text-gray-700 font-medium">{job.company}</span>}
                      {job.locationRaw && (
                        <>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-700">{job.locationRaw}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {job.descriptionText && (
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="flex-shrink-0 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    )}
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

                {job.reasons.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Reasons:</div>
                    <div className="flex flex-wrap gap-1">
                      {job.reasons.slice(0, 3).map((reason, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {uniqueAttributions.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="text-sm text-gray-600 mb-2">
                Job data provided by:
              </div>
              <div className="flex flex-wrap gap-3">
                {uniqueAttributions.map((attribution, idx) => (
                  <a
                    key={idx}
                    href={attribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium border border-gray-200"
                  >
                    {attribution.name}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col">
            <div className="flex items-start justify-between p-6 border-b border-gray-200">
              <div className="flex-1 min-w-0 pr-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {selectedJob.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  {selectedJob.company && <span className="text-gray-400">{selectedJob.company}</span>}
                  {selectedJob.locationRaw && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span>{selectedJob.locationRaw}</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-sm max-w-none">
                {selectedJob.descriptionText ? (
                  <div className="whitespace-pre-wrap text-gray-700">
                    {selectedJob.descriptionText}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No description available</p>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Close
              </button>
              <a
                href={selectedJob.canonicalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRadarApp;
