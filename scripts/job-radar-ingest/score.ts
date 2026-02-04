import type { RemoteScope, NormalizedJob } from './types';

export interface ScoringResult {
  score: number;
  reasons: string[];
}

export function scoreJob(job: Omit<NormalizedJob, 'score' | 'reasons'>): ScoringResult {
  let score = 50;
  const reasons: Array<{ reason: string; delta: number }> = [];

  const combined = [job.title, job.locationRaw, job.descriptionText]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (job.remoteScope === 'WORLDWIDE') {
    score += 10;
    reasons.push({ reason: 'Worldwide remote', delta: 10 });
  } else if (job.remoteScope === 'EU_EEA' || job.remoteScope === 'EUROPE') {
    score += 8;
    reasons.push({ reason: 'Europe/EU remote', delta: 8 });
  } else if (job.remoteScope === 'ROMANIA') {
    score += 6;
    reasons.push({ reason: 'Romania-based', delta: 6 });
  } else if (job.remoteScope === 'EMEA') {
    score += 5;
    reasons.push({ reason: 'EMEA region', delta: 5 });
  }

  if (job.remoteScope === 'COUNTRY_ONLY' && !job.eligibleCountries.includes('RO')) {
    score -= 20;
    reasons.push({ reason: 'Country-only (non-RO)', delta: -20 });
  }

  if (job.remoteScope === 'MULTI_COUNTRY' && !job.eligibleCountries.includes('RO')) {
    score -= 10;
    reasons.push({ reason: 'Multi-country (no RO)', delta: -10 });
  }

  const qaKeywords = [
    'qa engineer',
    'quality assurance',
    'quality engineer',
    'test engineer',
    'testing engineer',
    'qa lead',
    'qa manager',
  ];

  const releaseKeywords = [
    'release',
    'delivery',
    'deployment',
    'devops',
    'build engineer',
  ];

  const hasQA = qaKeywords.some(kw => combined.includes(kw));
  const hasRelease = releaseKeywords.some(kw => combined.includes(kw));

  if (hasQA) {
    score += 15;
    reasons.push({ reason: 'QA/Quality role', delta: 15 });
  }

  if (hasRelease) {
    score += 10;
    reasons.push({ reason: 'Release/Delivery focus', delta: 10 });
  }

  const automationOnlyPatterns = [
    /\bsdet\b/,
    /automation.*only/,
    /pure automation/,
    /selenium.*specialist/,
    /test automation engineer.*no manual/,
  ];

  const isAutomationOnly = automationOnlyPatterns.some(p => p.test(combined));
  if (isAutomationOnly && !hasQA) {
    score -= 15;
    reasons.push({ reason: 'Automation-only (SDET)', delta: -15 });
  }

  if (combined.includes('senior') || combined.includes('lead') || combined.includes('principal')) {
    score += 5;
    reasons.push({ reason: 'Senior/Lead level', delta: 5 });
  }

  if (combined.includes('manual testing only') || combined.includes('no automation')) {
    score -= 10;
    reasons.push({ reason: 'Manual-only role', delta: -10 });
  }

  const experienceMatch = combined.match(/(\d+)\+?\s*years?/);
  if (experienceMatch) {
    const years = parseInt(experienceMatch[1], 10);
    if (years >= 8) {
      score -= 5;
      reasons.push({ reason: `${years}+ years required`, delta: -5 });
    }
  }

  if (job.workplaceType === 'HYBRID') {
    score -= 5;
    reasons.push({ reason: 'Hybrid work', delta: -5 });
  } else if (job.workplaceType === 'ONSITE') {
    score -= 15;
    reasons.push({ reason: 'Onsite work', delta: -15 });
  }

  score = Math.max(0, Math.min(100, score));

  reasons.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  const topReasons = reasons.slice(0, 3).map(r => r.reason);

  return { score, reasons: topReasons };
}
