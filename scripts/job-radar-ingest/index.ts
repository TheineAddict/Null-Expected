import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type {
  SourcesConfig,
  RawJob,
  NormalizedJob,
  JobSnapshot,
  MetaSnapshot,
  SourceResult,
} from './types';
import { fetchFromSource } from './connectors';
import { cleanHtmlToText, computeHashDedup, generateStableUUID } from './normalize';
import { classifyJob } from './classify';
import { scoreJob } from './score';

async function main() {
  console.log('=== Job Radar Ingestion Started ===\n');

  const sourcesPath = join(process.cwd(), 'data/null-expected-job-radar-app/sources.json');
  const jobsOutputPath = join(process.cwd(), 'public/null-expected-job-radar-app/data/jobs.json');
  const metaOutputPath = join(process.cwd(), 'public/null-expected-job-radar-app/data/meta.json');

  const sourcesConfig: SourcesConfig = JSON.parse(readFileSync(sourcesPath, 'utf-8'));
  const enabledSources = sourcesConfig.sources.filter(s => s.enabled);
  const disabledSources = sourcesConfig.sources.filter(s => !s.enabled);

  console.log(`Found ${enabledSources.length} enabled source(s), ${disabledSources.length} disabled\n`);

  let existingJobs: NormalizedJob[] = [];
  try {
    const existingSnapshot: JobSnapshot = JSON.parse(readFileSync(jobsOutputPath, 'utf-8'));
    existingJobs = existingSnapshot.jobs || [];
    console.log(`Loaded ${existingJobs.length} existing job(s)\n`);
  } catch {
    console.log('No existing jobs found, starting fresh\n');
  }

  const existingJobsByHash = new Map<string, NormalizedJob>();
  for (const job of existingJobs) {
    existingJobsByHash.set(job.hashDedup, job);
  }

  const rawJobs: RawJob[] = [];
  let sourcesOk = 0;
  let sourcesFailed = 0;
  const sourceResults: SourceResult[] = [];

  for (const source of enabledSources) {
    const startTime = Date.now();
    const fetchedAt = new Date().toISOString();

    try {
      const result = await fetchFromSource(source);
      const durationMs = Date.now() - startTime;

      rawJobs.push(...result.jobs);

      const url = source.config?.url || source.config?.boardToken || 'unknown';

      sourceResults.push({
        sourceId: source.id,
        name: source.name,
        type: source.type,
        url,
        enabled: true,
        ok: result.ok,
        httpStatus: result.httpStatus,
        errorType: result.errorType,
        message: result.message,
        itemCount: result.jobs.length,
        durationMs,
        fetchedAt,
      });

      if (result.ok) {
        sourcesOk++;
        console.log(`[${source.id}] ✓ Fetched ${result.jobs.length} job(s) in ${durationMs}ms`);
      } else {
        sourcesFailed++;
        console.error(`[${source.id}] ✗ Failed: ${result.errorType} - ${result.message}`);
      }
    } catch (error) {
      const durationMs = Date.now() - startTime;
      const errorMsg = error instanceof Error ? error.message : String(error);
      const url = source.config?.url || source.config?.boardToken || 'unknown';

      sourceResults.push({
        sourceId: source.id,
        name: source.name,
        type: source.type,
        url,
        enabled: true,
        ok: false,
        httpStatus: null,
        errorType: 'UNKNOWN_ERROR',
        message: `Uncaught error: ${errorMsg}`,
        itemCount: 0,
        durationMs,
        fetchedAt,
      });

      sourcesFailed++;
      console.error(`[${source.id}] ✗ Uncaught error: ${errorMsg}`);
    }
  }

  for (const source of disabledSources) {
    const url = source.config?.url || source.config?.boardToken || 'unknown';
    sourceResults.push({
      sourceId: source.id,
      name: source.name,
      type: source.type,
      url,
      enabled: false,
      ok: false,
      httpStatus: null,
      errorType: 'DISABLED',
      message: 'Source is disabled in configuration',
      itemCount: 0,
      durationMs: 0,
      fetchedAt: new Date().toISOString(),
    });
  }

  console.log(`\nFetched ${rawJobs.length} raw job(s) from ${sourcesOk} source(s)\n`);

  const normalizedJobs: NormalizedJob[] = [];
  const seenHashes = new Set<string>();
  let newCount = 0;
  let updatedCount = 0;

  for (const raw of rawJobs) {
    const hashDedup = computeHashDedup(raw);

    if (seenHashes.has(hashDedup)) {
      continue;
    }
    seenHashes.add(hashDedup);

    const descriptionText = cleanHtmlToText(raw.descriptionHtml);
    const classification = classifyJob(raw.title, raw.locationRaw, descriptionText);

    const existingJob = existingJobsByHash.get(hashDedup);
    const id = existingJob ? existingJob.id : generateStableUUID(hashDedup);
    const collectedAt = existingJob ? existingJob.collectedAt : new Date().toISOString();

    if (!existingJob) {
      newCount++;
    } else {
      updatedCount++;
    }

    const jobForScoring: Omit<NormalizedJob, 'score' | 'reasons'> = {
      id,
      sourceId: raw.sourceId,
      canonicalUrl: raw.canonicalUrl,
      title: raw.title,
      company: raw.company,
      locationRaw: raw.locationRaw,
      workplaceType: classification.workplaceType,
      remoteScope: classification.remoteScope,
      eligibleCountries: classification.eligibleCountries,
      scopeText: classification.scopeText,
      descriptionText,
      postedAt: raw.postedAt,
      collectedAt,
      hashDedup,
      source: raw.source,
    };

    const { score, reasons } = scoreJob(jobForScoring);

    normalizedJobs.push({
      ...jobForScoring,
      score,
      reasons,
    });
  }

  console.log(`Normalized ${normalizedJobs.length} job(s) (${newCount} new, ${updatedCount} updated)\n`);

  const now = new Date().toISOString();

  const jobsSnapshot: JobSnapshot = {
    schemaVersion: 1,
    updatedAt: now,
    jobs: normalizedJobs,
  };

  const metaSnapshot: MetaSnapshot = {
    schemaVersion: 1,
    lastRunAt: now,
    lastRunStats: {
      new: newCount,
      updated: updatedCount,
      total: normalizedJobs.length,
      sourcesOk,
      sourcesFailed,
    },
    sourceResults,
  };

  writeFileSync(jobsOutputPath, JSON.stringify(jobsSnapshot, null, 2));
  writeFileSync(metaOutputPath, JSON.stringify(metaSnapshot, null, 2));

  console.log(`✓ Written ${normalizedJobs.length} job(s) to ${jobsOutputPath}`);
  console.log(`✓ Written metadata to ${metaOutputPath}`);
  console.log('\n=== Job Radar Ingestion Complete ===');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
