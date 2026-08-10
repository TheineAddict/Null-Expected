import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

export interface RunRecord {
  id: string;
  startedAt: string;
  completedAt: string | null;
  status: 'running' | 'completed' | 'failed';
  totalJobs: number;
  sourcesOk: number;
  sourcesFailed: number;
  durationMs: number;
}

export interface RunHistory {
  runs: RunRecord[];
}

const RUNS_FILE_PATH = join(process.cwd(), 'data', 'null-expected-job-radar-app', 'runs-history.json');
const MAX_RUNS_PER_DAY = 5;
const HISTORY_RETENTION_DAYS = 30;

export function loadRunHistory(): RunHistory {
  if (!existsSync(RUNS_FILE_PATH)) {
    return { runs: [] };
  }

  try {
    const content = readFileSync(RUNS_FILE_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn('Failed to load run history, starting fresh:', error);
    return { runs: [] };
  }
}

export function saveRunHistory(history: RunHistory): void {
  cleanupOldRuns(history);

  const dir = dirname(RUNS_FILE_PATH);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(RUNS_FILE_PATH, JSON.stringify(history, null, 2), 'utf-8');
}

function cleanupOldRuns(history: RunHistory): void {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - HISTORY_RETENTION_DAYS);

  history.runs = history.runs.filter(run => {
    const runDate = new Date(run.startedAt);
    return runDate >= cutoffDate;
  });
}

export function getTodayRunCount(): number {
  const history = loadRunHistory();
  const today = new Date().toISOString().split('T')[0];

  return history.runs.filter(run => {
    const runDate = run.startedAt.split('T')[0];
    return runDate === today && run.status === 'completed';
  }).length;
}

export function canRunToday(): { allowed: boolean; message: string; runsUsed: number } {
  const runsUsed = getTodayRunCount();
  const allowed = runsUsed < MAX_RUNS_PER_DAY;

  if (!allowed) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const hoursUntilReset = Math.ceil((tomorrow.getTime() - Date.now()) / (1000 * 60 * 60));

    return {
      allowed: false,
      message: `Daily run limit reached (${runsUsed}/${MAX_RUNS_PER_DAY}). Resets in ${hoursUntilReset} hours.`,
      runsUsed,
    };
  }

  return {
    allowed: true,
    message: `${runsUsed}/${MAX_RUNS_PER_DAY} runs used today`,
    runsUsed,
  };
}

export function startRun(): string {
  const history = loadRunHistory();
  const runId = `run-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const newRun: RunRecord = {
    id: runId,
    startedAt: new Date().toISOString(),
    completedAt: null,
    status: 'running',
    totalJobs: 0,
    sourcesOk: 0,
    sourcesFailed: 0,
    durationMs: 0,
  };

  history.runs.push(newRun);
  saveRunHistory(history);

  console.log(`\n✓ Run started: ${runId}`);
  return runId;
}

export function completeRun(
  runId: string,
  stats: {
    totalJobs: number;
    sourcesOk: number;
    sourcesFailed: number;
  }
): void {
  const history = loadRunHistory();
  const run = history.runs.find(r => r.id === runId);

  if (!run) {
    console.warn(`Run ${runId} not found in history`);
    return;
  }

  const startTime = new Date(run.startedAt).getTime();
  const endTime = Date.now();

  run.completedAt = new Date().toISOString();
  run.status = 'completed';
  run.totalJobs = stats.totalJobs;
  run.sourcesOk = stats.sourcesOk;
  run.sourcesFailed = stats.sourcesFailed;
  run.durationMs = endTime - startTime;

  saveRunHistory(history);

  console.log(`\n✓ Run completed: ${runId}`);
  console.log(`  Duration: ${(run.durationMs / 1000).toFixed(1)}s`);
  console.log(`  Total jobs: ${stats.totalJobs}`);
  console.log(`  Sources: ${stats.sourcesOk} ok, ${stats.sourcesFailed} failed`);
}

export function failRun(runId: string, error: string): void {
  const history = loadRunHistory();
  const run = history.runs.find(r => r.id === runId);

  if (!run) {
    console.warn(`Run ${runId} not found in history`);
    return;
  }

  const startTime = new Date(run.startedAt).getTime();
  const endTime = Date.now();

  run.completedAt = new Date().toISOString();
  run.status = 'failed';
  run.durationMs = endTime - startTime;

  saveRunHistory(history);

  console.log(`\n✗ Run failed: ${runId}`);
  console.log(`  Error: ${error}`);
}

export function getLastSuccessfulRun(): RunRecord | null {
  const history = loadRunHistory();
  const completedRuns = history.runs
    .filter(r => r.status === 'completed')
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

  return completedRuns[0] || null;
}
