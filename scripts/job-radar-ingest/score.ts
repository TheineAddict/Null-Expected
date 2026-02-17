import type { NormalizedJob } from './types';

export interface ScoringResult {
  score: number;
  reasons: string[];
}

const POSITIVE_TITLE_REGEX: Array<[RegExp, number, string]> = [
  [/\brelease (program )?manager\b/i, 28, 'Release manager role'],
  [/\brelease (and|&) delivery lead\b|\brelease lead\b/i, 24, 'Release lead role'],
  [/\bdelivery manager\b/i, 24, 'Delivery manager role'],
  [/\btechnical program manager\b|\btpm\b/i, 18, 'Program/TPM role'],
  [/\brelease coordinator\b/i, 18, 'Release coordination'],
  [/\bqa lead\b|\btest lead\b|\bquality lead\b/i, 22, 'QA/Test leadership'],
  [/\bqa manager\b|\btest manager\b|\bquality manager\b/i, 22, 'QA/Test management'],
  [/\bqa specialist\b|\bqa analyst\b|\bquality analyst\b|\btest analyst\b/i, 14, 'QA analyst role'],
  [/\bquality assurance\b|\bqa engineer\b|\bquality engineer\b|\btest engineer\b/i, 16, 'QA/Testing role'],
];

const RELEASE_GOVERNANCE_REGEX: Array<[RegExp, number, string]> = [
  [/\bgo\/no[- ]go\b|\brelease readiness\b|\brelease governance\b/i, 16, 'Release readiness/governance'],
  [/\bchange management\b|\bcab\b|\bitil\b/i, 10, 'Change/CAB/ITIL'],
  [/\bcutover\b|\brollback\b|\brelease plan\b|\brelease train\b/i, 10, 'Cutover/rollback/release planning'],
  [/\btest strategy\b|\btest plan(n)?ing\b|\btest planning\b|\brisk[- ]based\b|\bexploratory testing\b|\bdefect triage\b|\bbug triage\b/i, 10, 'Test strategy/planning'],
];

// Strong “you” signals that often appear in descriptions (kept small to avoid false positives)
const ROLE_SKILL_POSITIVES: Array<[RegExp, number, string]> = [
  [/\b(ci\/cd|pipeline(s)?)\b|\bquality gate(s)?\b/i, 3, 'CI/CD quality gates'],
  [/\b(playwright|cypress|selenium)\b/i, 4, 'Modern QA automation tools'],
  [/\b(api testing|rest\b|soap\b|postman|newman)\b/i, 4, 'API testing'],
  [/\bsql\b|\bmysql\b|\bdata validation\b/i, 3, 'SQL/data validation'],
  [/\b(service ?now)\b|\bchange request\b|\brelease calendar\b/i, 3, 'Change/release ops tooling'],
  [/\bobservability\b|\bdatadog\b|\bkibana\b|\blog(s|ging)\b|\bmonitoring\b/i, 1, 'Prod signals/observability'],
  [/\bincident\b|\bpost[- ]incident\b|\brca\b|\broot cause\b/i, 1, 'Incident/RCA exposure'],
];

// Roles that are “technical” but usually not what you want
const IMPLEMENTATION_NEGATIVES: Array<[RegExp, number, string]> = [
  [/\bcustomer success\b|\bimplementation\b|\bprofessional services\b/i, -18, 'Implementation/CS role'],
  [/\bsolutions consultant\b|\bsolutions engineer\b|\bsales engineer\b/i, -18, 'Solutions/Sales engineering'],
  [/\btechnical account manager\b|\btam\b/i, -18, 'TAM role'],
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
  [/\bsdet\b|\bsoftware engineer in test\b|\b(s|software)\s*det\b/i, -6, 'SDET-heavy'],
];

// Fallback geo restrictions when remoteScope parsing is missing/weak
const LOCATION_ELIGIBILITY_NEGATIVES: Array<[RegExp, number, string]> = [
  [/\b(us[- ]only|us only|u\.s\.-only|united states only|remote.*\bus\b)\b/i, -30, 'US-only remote'],
  [/\b(uk[- ]only|united kingdom only)\b/i, -22, 'UK-only remote'],
  [/\b(canada[- ]only)\b/i, -22, 'Canada-only remote'],
  [/\b(australia[- ]only)\b/i, -22, 'Australia-only remote'],
  [/\bmust be (based|located|resident)\b/i, -12, 'Location-restricted'],
];

// Title-only de-prioritization for pure software engineering roles.
// Important: evaluate only on title to avoid punishing descriptions that mention "software engineers".
const SOFTWARE_ENGINEER_TITLE_NEGATIVES: Array<[RegExp, number, string]> = [
  [/\bsoftware engineer\b/i, -35, 'Software engineer role'],
  [/\bsoftware developer\b/i, -35, 'Software developer role'],
  [/\b(front[- ]?end|back[- ]?end|full[- ]?stack)\s*developer\b/i, -30, 'Developer IC role'],
  [/\bweb developer\b|\breact developer\b|\bnode(\.js)? developer\b|\bjava developer\b|\bpython developer\b|\bphp developer\b|\b(\.net|dotnet) developer\b/i, -28, 'Developer IC role'],
  [/\bmobile developer\b|\bios developer\b|\bandroid developer\b/i, -25, 'Mobile developer role'],
  [/\bdeveloper\b|\bprogrammer\b/i, -24, 'Developer/programmer role'],
  [/\bbackend engineer\b|\bfront[- ]end engineer\b|\bfull[- ]stack engineer\b/i, -25, 'Engineering IC role'],
  [/\bproduct engineer\b/i, -22, 'Engineering IC role'],
  [/\bplatform engineer\b|\binfrastructure engineer\b|\bsite reliability engineer\b|\bsre\b/i, -18, 'Platform/SRE role'],
  [/\bdata engineer\b|\bml engineer\b|\bmachine learning engineer\b|\bai engineer\b/i, -18, 'Data/ML engineering role'],
];

// Exceptions: do NOT penalize when the title is clearly QA/testing/quality even if it contains "engineer".
const ENGINEER_TITLE_EXCEPTIONS: RegExp = /\b(qa|quality|test|testing)\b/i;

// Anchor signals to decide whether generic “skills” positives should apply
const ROLE_FIT_ANCHOR: RegExp =
  /\b(qa|quality assurance|test(ing)?|release readiness|go\/no[- ]go|release governance|change management|cab|itil|cutover|rollback|release plan|release train|release coordinator|release management|test strategy|test planning|risk[- ]based|exploratory testing|defect triage)\b/i;

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

    // If the title is explicitly a dev role, cap early so it can't float to the top
    // just because description mentions QA/release words.
    if (/\bsoftware engineer\b/i.test(title)) {
      score = Math.min(score, 25);
      reasons.push({ reason: 'Capped due to Software Engineer title', delta: -999 });
    } else if (/\b(developer|programmer)\b/i.test(title)) {
      score = Math.min(score, 28);
      reasons.push({ reason: 'Capped due to Developer/Programmer title', delta: -999 });
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

  // 4) Role-fit rules
  // Title-based role matching to reduce false positives from descriptions.
  score = applyRules(title, POSITIVE_TITLE_REGEX, score, reasons);
  const titleFit = POSITIVE_TITLE_REGEX.some(([re]) => re.test(title));

  // Description-based fit signals (stronger, still safe)
  score = applyRules(combined, RELEASE_GOVERNANCE_REGEX, score, reasons);

  // Only apply generic skills positives if we have at least one QA/release anchor signal
  // (prevents dev roles from ranking high just due to CI/CD/tool mentions).
  if (titleFit || ROLE_FIT_ANCHOR.test(combined)) {
    score = applyRules(combined, ROLE_SKILL_POSITIVES, score, reasons);
  }

  // 5) Noise reducers
  score = applyRules(combined, SUPPORT_NEGATIVES, score, reasons);
  score = applyRules(combined, SALES_NEGATIVES, score, reasons);
  score = applyRules(combined, IMPLEMENTATION_NEGATIVES, score, reasons);

  // 5.1) Fallback location restrictions from text (helps when remoteScope is UNKNOWN)
  score = applyRules(combined, LOCATION_ELIGIBILITY_NEGATIVES, score, reasons);

  // 6) Automation-only vs mixed QA
  score = applyRules(combined, AUTOMATION_ONLY_NEGATIVES, score, reasons);
  score = applyRules(combined, SDET_SOFT, score, reasons);

  // 7) Seniority: reduce intern noise strongly; soften junior penalty
  if (/\b(intern|graduate)\b/i.test(combined)) {
    score -= 18; reasons.push({ reason: 'Intern/graduate level', delta: -18 });
  } else if (/\b(junior|entry[- ]level)\b/i.test(combined)) {
    score -= 10; reasons.push({ reason: 'Junior/entry level', delta: -10 });
  }
  if (/\b(senior|lead|staff|principal)\b/i.test(combined)) {
    score += 6; reasons.push({ reason: 'Senior/Lead level', delta: 6 });
  }

  // 8) EU timezone signal (expanded)
  if (/\b(cet|cest|eet|eest|bst|european time zones?)\b/i.test(combined) ||
      /\b(utc|gmt)\s*[+-]\s*\d{1,2}\b/i.test(combined)) {
    score += 10; reasons.push({ reason: 'EU timezone friendly', delta: 10 });
  }

  // 9) If nothing indicates role fit, push it down (prevents random “remote” jobs ranking high)
  const hasCoreFit =
    POSITIVE_TITLE_REGEX.some(([re]) => re.test(title)) ||
    RELEASE_GOVERNANCE_REGEX.some(([re]) => re.test(combined)) ||
    ROLE_FIT_ANCHOR.test(combined);

  if (!hasCoreFit) {
    score -= 22; reasons.push({ reason: 'Low role-fit signals', delta: -22 });
  }

  // Optional hard caps to keep obvious mismatches from floating up
  if (SUPPORT_NEGATIVES.some(([re]) => re.test(combined))) {
    score = Math.min(score, 35);
    reasons.push({ reason: 'Capped due to support signals', delta: -999 });
  }
  if (SALES_NEGATIVES.some(([re]) => re.test(combined))) {
    score = Math.min(score, 40);
    reasons.push({ reason: 'Capped due to sales signals', delta: -999 });
  }

  score = Math.max(0, Math.min(100, score));

  reasons.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  const topReasons = reasons
    .filter(r => r.delta !== -999) // hide internal "cap" markers from UI
    .slice(0, 3)
    .map(r => r.reason);

  return { score, reasons: topReasons };
}
