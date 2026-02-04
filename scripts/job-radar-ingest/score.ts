import type { NormalizedJob } from './types';

export interface ScoringResult {
  score: number;
  reasons: string[];
}

const POSITIVE_TITLE_REGEX: Array<[RegExp, number, string]> = [
  [/\brelease (program )?manager\b/i, 28, 'Release manager role'],
  [/\bdelivery manager\b/i, 24, 'Delivery manager role'],
  [/\btechnical program manager\b|\btpm\b/i, 18, 'Program/TPM role'],
  [/\brelease coordinator\b/i, 18, 'Release coordination'],
  [/\bqa lead\b|\btest lead\b|\bquality lead\b/i, 22, 'QA/Test leadership'],
  [/\bqa manager\b|\btest manager\b|\bquality manager\b/i, 22, 'QA/Test management'],
  [/\bquality assurance\b|\bqa engineer\b|\bquality engineer\b|\btest engineer\b|\btest analyst\b/i, 16, 'QA/Testing role'],
];

const RELEASE_GOVERNANCE_REGEX: Array<[RegExp, number, string]> = [
  [/\bgo\/no[- ]go\b|\brelease readiness\b|\brelease governance\b/i, 16, 'Release readiness/governance'],
  [/\bchange management\b|\bcab\b|\bitil\b/i, 10, 'Change/CAB/ITIL'],
  [/\bcutover\b|\brollback\b|\brelease plan\b|\brelease train\b/i, 10, 'Cutover/rollback/release planning'],
];

const SUPPORT_NEGATIVES: Array<[RegExp, number, string]> = [
  [/\bhappiness engineer\b/i, -35, 'Customer support role'],
  [/\bcustomer support\b|\btechnical support\b|\bit support\b|\bhelpdesk\b|\bservice desk\b/i, -30, 'Support role'],
  [/\bcall center\b|\bticket queue\b|\b(tier|level)\s*(1|2|3)\b|\bl1\b|\bl2\b|\bl3\b/i, -18, 'Support queue role'],
];

const SALES_NEGATIVES: Array<[RegExp, number, string]> = [
  [/\baccount executive\b|\bsdr\b|\bbdr\b|\bsales\b/i, -18, 'Sales role'],
];

const AUTOMATION_ONLY_NEGATIVES: Array<[RegExp, number, string]> = [
  [/\b100%\s*automation\b|\bautomation[- ]only\b|\bno manual\b|\bmanual testing not required\b/i, -22, 'Automation-only'],
];

const SDET_SOFT: Array<[RegExp, number, string]> = [
  [/\bsdet\b/i, -6, 'SDET-heavy'],
];

// Title-only de-prioritization for pure software engineering roles.
// Important: evaluate only on title to avoid punishing descriptions that mention "software engineers".
const SOFTWARE_ENGINEER_TITLE_NEGATIVES: Array<[RegExp, number, string]> = [
  [/\bsoftware engineer\b/i, -35, 'Software engineer role'],
  [/\bbackend engineer\b|\bfront[- ]end engineer\b|\bfull[- ]stack engineer\b/i, -25, 'Engineering IC role'],
  [/\bplatform engineer\b|\binfrastructure engineer\b|\bsite reliability engineer\b|\bsre\b/i, -18, 'Platform/SRE role'],
];

// Exceptions: do NOT penalize when the title is clearly QA/testing/quality even if it contains "engineer".
const ENGINEER_TITLE_EXCEPTIONS: RegExp = /\b(qa|quality|test|testing)\b/i;

function applyRules(
  text: string,
  rules: Array<[RegExp, number, string]>,
  score: number,
  reasons: Array<{ reason: string; delta: number }>
) {
  for (const [re, delta, label] of rules) {
    if (re.test(text)) {
      score += delta;
      reasons.push({ reason: label, delta });
    }
  }
  return score;
}

export function scoreJob(job: Omit<NormalizedJob, 'score' | 'reasons'>): ScoringResult {
  let score = 45;
  const reasons: Array<{ reason: string; delta: number }> = [];

  const title = (job.title || '').toLowerCase();
  const combined = [job.title, job.locationRaw, job.descriptionText]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  // 0) Title-only penalty for engineering roles (unless it's QA/testing/quality).
  if (!ENGINEER_TITLE_EXCEPTIONS.test(title)) {
    score = applyRules(title, SOFTWARE_ENGINEER_TITLE_NEGATIVES, score, reasons);

    // If the title is explicitly "Software Engineer" variants, cap early so it can't float to the top
    // just because description mentions QA/release words.
    if (/\bsoftware engineer\b/i.test(title)) {
      score = Math.min(score, 25);
      reasons.push({ reason: 'Capped due to Software Engineer title', delta: -999 });
    }
  }

  // 1) Remote scope weighting (eligibility-first)
  if (job.remoteScope === 'WORLDWIDE') {
    score += 12; reasons.push({ reason: 'Worldwide remote', delta: 12 });
  } else if (job.remoteScope === 'EU_EEA' || job.remoteScope === 'EUROPE') {
    score += 10; reasons.push({ reason: 'Europe/EU remote', delta: 10 });
  } else if (job.remoteScope === 'ROMANIA') {
    score += 10; reasons.push({ reason: 'Romania eligible', delta: 10 });
  } else if (job.remoteScope === 'EMEA') {
    score += 8; reasons.push({ reason: 'EMEA region', delta: 8 });
  } else if (job.remoteScope === 'UNKNOWN') {
    score -= 6; reasons.push({ reason: 'Remote scope unclear', delta: -6 });
  }

  // 2) Strong exclude-like penalties for ineligible remote
  if (job.remoteScope === 'COUNTRY_ONLY' && !job.eligibleCountries.includes('RO')) {
    score -= 40; reasons.push({ reason: 'Country-only (non-RO)', delta: -40 });
  }
  if (job.remoteScope === 'MULTI_COUNTRY' && job.eligibleCountries.length > 0 && !job.eligibleCountries.includes('RO')) {
    score -= 18; reasons.push({ reason: 'Multi-country (no RO)', delta: -18 });
  }

  // 3) Workplace penalties (you generally want remote-only)
  if (job.workplaceType === 'HYBRID') {
    score -= 12; reasons.push({ reason: 'Hybrid work', delta: -12 });
  } else if (job.workplaceType === 'ONSITE') {
    score -= 40; reasons.push({ reason: 'Onsite work', delta: -40 });
  }

  // 4) Role-fit rules (content-based)
  score = applyRules(combined, POSITIVE_TITLE_REGEX, score, reasons);
  score = applyRules(combined, RELEASE_GOVERNANCE_REGEX, score, reasons);

  // 5) Noise reducers
  score = applyRules(combined, SUPPORT_NEGATIVES, score, reasons);
  score = applyRules(combined, SALES_NEGATIVES, score, reasons);

  // 6) Automation-only vs mixed QA
  score = applyRules(combined, AUTOMATION_ONLY_NEGATIVES, score, reasons);
  score = applyRules(combined, SDET_SOFT, score, reasons);

  // 7) Seniority: avoid junior/intern noise
  if (/\b(intern|junior|entry[- ]level|graduate)\b/i.test(combined)) {
    score -= 18; reasons.push({ reason: 'Junior/intern level', delta: -18 });
  }
  if (/\b(senior|lead|staff)\b/i.test(combined)) {
    score += 6; reasons.push({ reason: 'Senior/Lead level', delta: 6 });
  }

  // 8) EU timezone signal
  if (/\b(cet|eet|gmt\+0|gmt\+1|gmt\+2|gmt\+3|european time zones?)\b/i.test(combined)) {
    score += 10; reasons.push({ reason: 'EU timezone friendly', delta: 10 });
  }

  score = Math.max(0, Math.min(100, score));

  reasons.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  const topReasons = reasons
    .filter(r => r.delta !== -999) // hide the internal "cap" marker from UI
    .slice(0, 3)
    .map(r => r.reason);

  return { score, reasons: topReasons };
}
