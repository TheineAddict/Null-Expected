import type { NormalizedJob } from './types';

export interface ScoringResult {
  score: number;
  reasons: string[];
}

type Rule = [RegExp, number, string];

const STRONG_TITLE_REGEX: Rule[] = [
  // Release / Change / Governance
  [/\brelease (readiness|governance) manager\b/i, 36, 'Release readiness/governance'],
  [/\brelease (program )?manager\b/i, 34, 'Release manager role'],
  [/\brelease delivery manager\b/i, 34, 'Release delivery manager'],
  [/\bchange (and|&) release manager\b|\bchange manager\b/i, 28, 'Change/release management'],
  [/\brelease (and|&) delivery lead\b|\brelease lead\b/i, 30, 'Release lead role'],
  [/\brelease coordinator\b/i, 18, 'Release coordination'],

  // Delivery / Execution
  [/\btechnical delivery (manager|lead)\b/i, 32, 'Technical delivery role'],
  [/\bdelivery manager\b/i, 28, 'Delivery manager role'],
  [/\bagile delivery manager\b/i, 26, 'Agile delivery management'],
  [/\bdelivery assurance manager\b|\bdelivery assurance lead\b/i, 28, 'Delivery assurance management'],
  [/\bdelivery (lead|assurance)\b/i, 22, 'Delivery lead/assurance'],

  // Technical PM variants
  [/\btechnical program manager\b|\btpm\b/i, 20, 'Technical program manager'],
  [/\btechnical project manager\b/i, 18, 'Technical project manager'],

  // QA / Test leadership
  [/\btest delivery manager\b/i, 28, 'Test delivery management'],
  [/\bqa delivery manager\b|\bquality delivery manager\b/i, 28, 'QA delivery management'],
  [/\bquality governance manager\b|\bqa governance manager\b/i, 30, 'QA governance management'],
  [/\bqa lead\b|\btest lead\b|\bquality lead\b/i, 22, 'QA/Test leadership'],
  [/\bqa manager\b|\btest manager\b|\bquality manager\b/i, 24, 'QA/Test management'],
  [/\bai test manager\b|\bgenai test manager\b|\bai quality manager\b/i, 30, 'AI quality/test management'],

  // IC QA titles: intentionally lower weight so they do not outrank target management roles
  [/\bqa specialist\b|\bqa analyst\b|\bquality analyst\b|\btest analyst\b/i, 8, 'QA analyst role'],
  [/\bquality assurance\b|\bqa engineer\b|\bquality engineer\b|\btest engineer\b/i, 8, 'QA/Testing role'],
];

const SOFT_PM_TITLE_REGEX: Rule[] = [
  [/\bprogram manager\b/i, 6, 'Program manager title'],
  [/\bproject manager\b/i, 6, 'Project manager title'],
];

const RELEASE_GOVERNANCE_REGEX: Rule[] = [
  [/\bgo\/no[- ]go\b|\brelease readiness\b|\brelease governance\b/i, 16, 'Release readiness/governance'],
  [/\bchange management\b|\bcab\b|\bitil\b|\bchange advisory board\b/i, 10, 'Change/CAB/ITIL'],
  [/\bcutover\b|\brollback\b|\brelease plan\b|\brelease train\b|\bdeployment window\b/i, 10, 'Cutover/rollback/release planning'],
  [/\bquality gate(s)?\b|\breadiness criteria\b|\brelease criteria\b/i, 8, 'Readiness criteria / quality gates'],
  [/\bpost[- ]release validation\b|\brelease validation\b|\bhypercare\b/i, 7, 'Release validation / hypercare'],
];

const TEST_GOVERNANCE_REGEX: Rule[] = [
  [/\btest strategy\b|\btest approach\b|\btest plan(n)?ing\b|\bcoverage strategy\b/i, 12, 'Test strategy/planning'],
  [/\brisk[- ]based testing\b|\brisk[- ]based\b/i, 10, 'Risk-based testing'],
  [/\bdefect governance\b|\bdefect triage\b|\bbug triage\b|\bdefect management\b/i, 10, 'Defect governance'],
  [/\buat\b|\buser acceptance testing\b|\bsign[- ]off\b/i, 8, 'UAT/sign-off coordination'],
  [/\btest status\b|\btest reporting\b|\bquality metrics\b|\bqa metrics\b|\btest metrics\b/i, 6, 'Quality metrics/reporting'],
];

const DELIVERY_GOVERNANCE_REGEX: Rule[] = [
  [/\b(raid|risk register|risk log|issue log)\b/i, 10, 'RAID management'],
  [/\b(dependenc(y|ies)|dependency mapping|critical path)\b/i, 10, 'Dependencies/critical path'],
  [/\b(milestone(s)?|delivery plan|plan of record|integrated plan|delivery roadmap)\b/i, 8, 'Delivery planning'],
  [/\b(stakeholder(s)?|exec(utive)? update(s)?|steer(ing)? committee)\b/i, 6, 'Stakeholder/executive cadence'],
  [/\b(decision log|risk acceptance|trade[- ]offs?)\b/i, 6, 'Decision support'],
  [/\b(dashboard(s)?|single source of truth|power bi)\b/i, 5, 'Dashboards/SSOT'],
];

const PRIMARY_ROLE_FIT_ANCHOR: RegExp =
  /\b(release readiness|release governance|release management|go\/no[- ]go|cab|itil|change management|cutover|rollback|quality gates?|readiness criteria|qa governance|test strategy|test planning|test approach|defect triage|defect governance|risk[- ]based testing|uat|user acceptance testing|release validation|post[- ]release validation|raid|risk register|delivery readiness|delivery governance)\b/i;

const SECONDARY_ROLE_FIT_ANCHOR: RegExp =
  /\b(dependenc(y|ies)|milestones?|delivery plan|stakeholders?|dashboard|single source of truth|power bi|ci\/cd|pipeline|monitoring|observability|incident|rca|root cause|playbook|ways of working)\b/i;

const ROLE_SKILL_POSITIVES: Rule[] = [
  [/\bquality gate(s)?\b|\breadiness criteria\b|\brelease criteria\b/i, 5, 'Readiness criteria / quality gates'],
  [/\buat\b|\buser acceptance testing\b|\bsign[- ]off\b/i, 5, 'UAT/sign-off coordination'],
  [/\bdefect governance\b|\bdefect triage\b|\bbug triage\b/i, 5, 'Defect governance'],
  [/\bexec(utive)? reporting\b|\bsteering committee\b|\bsenior stakeholders\b/i, 4, 'Executive/stakeholder reporting'],
  [/\bplaybook(s)?\b|\bstandard(s)?\b|\bprocess improvement\b|\bways of working\b/i, 4, 'Process/playbook ownership'],
  [/\bpeople manager\b|\bline management\b|\bmentor(ing)?\b|\bcoach(ing)?\b|\bhiring\b/i, 4, 'Team leadership'],
  [/\b(api testing|rest\b|soap\b|postman|newman|swagger|openapi)\b/i, 3, 'API testing'],
  [/\bsql\b|\bmysql\b|\bpostgresql\b|\bdata validation\b/i, 2, 'SQL/data validation'],
  [/\b(service ?now)\b|\bchange request\b|\brelease calendar\b/i, 4, 'Change/release ops tooling'],
  [/\b(ci\/cd|pipeline(s)?)\b/i, 2, 'CI/CD awareness'],
  [/\b(playwright|cypress|selenium)\b/i, 2, 'Automation tooling exposure'],
  [/\bobservability\b|\bdatadog\b|\bkibana\b|\blog(s|ging)\b|\bmonitoring\b/i, 2, 'Production signals/observability'],
  [/\bincident\b|\bpost[- ]incident\b|\brca\b|\broot cause\b/i, 2, 'Incident/RCA exposure'],
];

const AI_QUALITY_POSITIVES: Rule[] = [
  [/\bai quality\b|\bai testing\b|\bgenai testing\b|\bllm evaluation\b|\bmodel evaluation\b/i, 8, 'AI/GenAI quality testing'],
  [/\bagentic ai\b|\bai agent(s)?\b|\bagent testing\b/i, 6, 'Agentic AI testing'],
  [/\bhuman[- ]in[- ]the[- ]loop\b|\bhitl\b|\bai governance\b|\bresponsible ai\b/i, 5, 'AI governance / human review'],
  [/\bprompt testing\b|\bprompt evaluation\b|\bevals\b|\bred teaming\b/i, 4, 'AI evaluation practices'],
];

const DOMAIN_FIT_POSITIVES: Rule[] = [
  [/\b(fintech|payments?|card(s)?|merchant|issuing|acquiring)\b/i, 4, 'Payments/fintech domain'],
  [/\b(capital markets|trading|market data|broker|exchange)\b/i, 4, 'Markets domain'],
  [/\b(bank(ing)?|financial services)\b/i, 3, 'Financial services'],
  [/\b(pci|sox|soc2|iso 27001|gdpr|regulator(y|ion))\b/i, 2, 'Regulated environment'],
];

const IMPLEMENTATION_NEGATIVES: Rule[] = [
  [/\bcustomer success\b|\bprofessional services\b/i, -18, 'CS/Professional Services'],
  [/\bimplementation (consultant|engineer|specialist)\b/i, -18, 'Implementation services role'],
  [/\b(client|customer)\b.*\b(onboarding|implementation|rollout)\b|\bonboarding\b.*\b(client|customer)\b/i, -12, 'Client onboarding/implementation'],
  [/\bsolutions consultant\b|\bsolutions engineer\b|\bsales engineer\b/i, -18, 'Solutions/Sales engineering'],
  [/\btechnical account manager\b|\btam\b/i, -18, 'TAM role'],
];

const IMPLEMENTATION_SERVICE_ANCHOR: RegExp =
  /\b(customer|client|onboarding|professional services|services team|implementation services)\b/i;

const SUPPORT_NEGATIVES: Rule[] = [
  [/\bhappiness engineer\b/i, -35, 'Customer support role'],
  [/\bcustomer support\b|\btechnical support\b|\bit support\b|\bhelpdesk\b|\bservice desk\b/i, -30, 'Support role'],
  [/\bcall center\b|\bticket queue\b|\b(tier|level)\s*(1|2|3)\b|\bl1\b|\bl2\b|\bl3\b/i, -18, 'Support queue role'],
];

const SALES_NEGATIVES: Rule[] = [
  [/\baccount executive\b|\bsdr\b|\bbdr\b|\bsales\b/i, -18, 'Sales role'],
];

const AUTOMATION_ONLY_NEGATIVES: Rule[] = [
  [/\b100%\s*automation\b|\bautomation[- ]only\b|\bno manual\b|\bmanual testing not required\b/i, -24, 'Automation-only'],
];

const AUTOMATION_TITLE_NEGATIVES: Rule[] = [
  [/\b(qa|test) automation (engineer|developer)\b/i, -24, 'Automation-first QA title'],
  [/\bautomation engineer\b/i, -20, 'Automation engineer title'],
  [/\bsdet\b|\bsoftware engineer in test\b/i, -12, 'SDET-heavy title'],
];

const AUTOMATION_HEAVY_NEGATIVES: Rule[] = [
  [/\bbuild.*automation framework\b|\bautomation framework.*from scratch\b/i, -14, 'Automation framework ownership'],
  [/\bstrong (coding|programming) skills\b|\bdeveloper mindset\b/i, -10, 'Coding-heavy QA role'],
  [/\bjava\/?python\/?typescript.*required\b|\bprogramming language.*required\b/i, -8, 'Programming-heavy requirement'],
  [/\bwhite[- ]box testing\b|\bunit test(ing)?\b/i, -8, 'Developer-side test focus'],
  [/\bmaintain ci\/cd pipelines\b|\bown.*pipelines\b/i, -10, 'Pipeline ownership'],
];

const SDET_SOFT: Rule[] = [
  [/\bsdet\b|\bsoftware engineer in test\b|\b(s|software)\s*det\b/i, -6, 'SDET-heavy'],
];

const DEVOPS_BUILD_RELEASE_NEGATIVES: Rule[] = [
  [/\brelease engineer\b/i, -28, 'Release engineering, not release management'],
  [/\bbuild (and )?release engineer\b/i, -32, 'Build/release engineering role'],
  [/\bdevops engineer\b|\bdevops specialist\b/i, -28, 'DevOps engineering role'],
  [/\bdeployment engineer\b/i, -22, 'Deployment engineering role'],
  [/\bci\/cd engineer\b|\bpipeline engineer\b/i, -22, 'CI/CD engineering role'],
];

const LOCATION_ELIGIBILITY_NEGATIVES: Rule[] = [
  [/\b(us[- ]only|u\.s\.-only|united states only|us residents? only)\b/i, -35, 'US-only remote'],
  [/\b(must be (based|located|resident).{0,50}\b(united states|u\.s\.|usa)\b)\b/i, -35, 'US location-restricted'],
  [/\b(uk[- ]only|united kingdom only)\b/i, -24, 'UK-only remote'],
  [/\b(canada[- ]only)\b/i, -24, 'Canada-only remote'],
  [/\b(australia[- ]only)\b/i, -24, 'Australia-only remote'],
  [/\b(no international applicants|not eligible to work outside)\b/i, -20, 'International restriction'],
];

const GENERIC_LOCATION_RESTRICTION: RegExp =
  /\bmust be (based|located|resident)\b/i;

const EUROPE_OR_ROMANIA_SIGNAL: RegExp =
  /\b(romania|bucharest|bucuresti|cluj|iasi|timisoara|europe|european union|eu|eea|emea)\b/i;

const TIMEZONE_NEGATIVES: Rule[] = [
  [/\b(pst|pdt|mst|mdt|cst|cdt|est|edt)\b/i, -6, 'US time zones mentioned'],
  [/\b(us hours|required.*(est|edt|pst|pdt)|work.*(est|edt|pst|pdt)|overlap.*(pst|pdt|est|edt))\b/i, -12, 'US-hours requirement'],
];

const EU_TIMEZONE_SIGNAL: RegExp =
  /\b(cet|cest|eet|eest|bst|european time zones?)\b|\b(utc|gmt)\s*\+?\s*(0|1|2|3)\b/i;

const SOFTWARE_ENGINEER_TITLE_NEGATIVES: Rule[] = [
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

const ENGINEER_TITLE_EXCEPTIONS: RegExp =
  /\b(qa|quality|test|testing)\b/i;

function applyRules(
  text: string,
  rules: Rule[],
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

function anyRuleMatches(text: string, rules: Rule[]): boolean {
  return rules.some(([re]) => re.test(text));
}

function capScore(
  score: number,
  cap: number,
  reason: string,
  reasons: Array<{ reason: string; delta: number }>
): number {
  if (score > cap) {
    reasons.push({ reason, delta: -999 });
    return cap;
  }

  return score;
}

function hasRomaniaEligibility(eligibleCountries: string[] = []): boolean {
  return eligibleCountries.some(country => {
    const normalized = country.trim().toUpperCase();
    return normalized === 'RO' || normalized === 'ROU' || normalized === 'ROMANIA';
  });
}

export function scoreJob(job: Omit<NormalizedJob, 'score' | 'reasons'>): ScoringResult {
  let score = 40;
  const reasons: Array<{ reason: string; delta: number }> = [];

  const title = (job.title || '').toLowerCase();
  const combined = [job.title, job.locationRaw, job.descriptionText]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const eligibleCountries = job.eligibleCountries || [];
  const isRomaniaEligible = hasRomaniaEligibility(eligibleCountries);

  // 0) Title-only penalty for engineering roles, unless clearly QA/testing/quality.
  if (!ENGINEER_TITLE_EXCEPTIONS.test(title)) {
    score = applyRules(title, SOFTWARE_ENGINEER_TITLE_NEGATIVES, score, reasons);

    if (/\bsoftware engineer\b/i.test(title)) {
      score = capScore(score, 25, 'Capped due to Software Engineer title', reasons);
    } else if (/\b(developer|programmer)\b/i.test(title)) {
      score = capScore(score, 28, 'Capped due to Developer/Programmer title', reasons);
    }
  }

  // 0.1) DevOps/build/release engineering roles are not the target release-management lane.
  score = applyRules(title, DEVOPS_BUILD_RELEASE_NEGATIVES, score, reasons);
  if (anyRuleMatches(title, DEVOPS_BUILD_RELEASE_NEGATIVES)) {
    score = capScore(score, 45, 'Capped due to engineering/build ownership title', reasons);
  }

  // 0.2) Title-based automation-first de-prioritization.
  score = applyRules(title, AUTOMATION_TITLE_NEGATIVES, score, reasons);
  if (anyRuleMatches(title, AUTOMATION_TITLE_NEGATIVES)) {
    score = capScore(score, 50, 'Capped due to automation-first title', reasons);
  }

  // 1) Remote scope weighting.
  if (job.remoteScope === 'WORLDWIDE') {
    score += 12;
    reasons.push({ reason: 'Worldwide remote', delta: 12 });
  } else if (job.remoteScope === 'EU_EEA' || job.remoteScope === 'EUROPE') {
    score += 10;
    reasons.push({ reason: 'Europe/EU remote', delta: 10 });
  } else if (job.remoteScope === 'ROMANIA') {
    score += 12;
    reasons.push({ reason: 'Romania eligible', delta: 12 });
  } else if (job.remoteScope === 'EMEA') {
    score += 8;
    reasons.push({ reason: 'EMEA region', delta: 8 });
  } else if (job.remoteScope === 'UNKNOWN') {
    score -= 6;
    reasons.push({ reason: 'Remote scope unclear', delta: -6 });
  }

  // 2) Eligibility-first hard caps.
  if (job.remoteScope === 'COUNTRY_ONLY' && !isRomaniaEligible) {
    score -= 50;
    reasons.push({ reason: 'Country-only remote, not Romania eligible', delta: -50 });
    score = capScore(score, 25, 'Capped due to non-RO country-only remote', reasons);
  }

  if (job.remoteScope === 'MULTI_COUNTRY' && eligibleCountries.length > 0 && !isRomaniaEligible) {
    score -= 35;
    reasons.push({ reason: 'Multi-country remote, Romania not listed', delta: -35 });
    score = capScore(score, 35, 'Capped due to multi-country remote excluding Romania', reasons);
  }

  // 3) Workplace penalties.
  if (job.workplaceType === 'HYBRID') {
    score -= 12;
    reasons.push({ reason: 'Hybrid work - lower fit for remote-first preference', delta: -12 });

    if (!EUROPE_OR_ROMANIA_SIGNAL.test(combined)) {
      score = capScore(score, 50, 'Capped due to hybrid outside Romania/Europe', reasons);
    }
  } else if (job.workplaceType === 'ONSITE') {
    score -= 40;
    reasons.push({ reason: 'Onsite work', delta: -40 });
    score = capScore(score, 35, 'Capped due to onsite work', reasons);
  }

  // 4) Role-fit scoring.
  score = applyRules(title, STRONG_TITLE_REGEX, score, reasons);
  const strongTitleFit = anyRuleMatches(title, STRONG_TITLE_REGEX);

  score = applyRules(title, SOFT_PM_TITLE_REGEX, score, reasons);
  const softPMTitleFit = anyRuleMatches(title, SOFT_PM_TITLE_REGEX);

  score = applyRules(combined, RELEASE_GOVERNANCE_REGEX, score, reasons);
  score = applyRules(combined, TEST_GOVERNANCE_REGEX, score, reasons);
  score = applyRules(combined, DELIVERY_GOVERNANCE_REGEX, score, reasons);

  const hasPrimaryFit = PRIMARY_ROLE_FIT_ANCHOR.test(combined);
  const hasSecondaryFit = SECONDARY_ROLE_FIT_ANCHOR.test(combined);

  const hasGovOrQualitySignals =
    hasPrimaryFit ||
    anyRuleMatches(combined, RELEASE_GOVERNANCE_REGEX) ||
    anyRuleMatches(combined, TEST_GOVERNANCE_REGEX) ||
    anyRuleMatches(combined, DELIVERY_GOVERNANCE_REGEX);

  if (softPMTitleFit && hasGovOrQualitySignals) {
    score += 10;
    reasons.push({ reason: 'PM role with governance/quality signals', delta: 10 });
  }

  // Apply generic skill boosts only when the role already looks relevant.
  if (strongTitleFit || hasPrimaryFit || (softPMTitleFit && hasGovOrQualitySignals)) {
    score = applyRules(combined, ROLE_SKILL_POSITIVES, score, reasons);
  }

  // AI-quality boost only when there is QA/testing/governance context.
  if (hasPrimaryFit || /\bqa|quality|test manager|testing\b/i.test(combined)) {
    score = applyRules(combined, AI_QUALITY_POSITIVES, score, reasons);
  }

  // Domain tie-breakers.
  score = applyRules(combined, DOMAIN_FIT_POSITIVES, score, reasons);

  // 5) Noise reducers.
  score = applyRules(combined, SUPPORT_NEGATIVES, score, reasons);
  score = applyRules(combined, SALES_NEGATIVES, score, reasons);
  score = applyRules(combined, IMPLEMENTATION_NEGATIVES, score, reasons);

  if (/\bimplementation manager\b/i.test(title) && IMPLEMENTATION_SERVICE_ANCHOR.test(combined)) {
    score -= 14;
    reasons.push({ reason: 'Implementation Manager - services/onboarding', delta: -14 });
  }

  // 5.1) Fallback location restrictions from text.
  score = applyRules(combined, LOCATION_ELIGIBILITY_NEGATIVES, score, reasons);

  if (GENERIC_LOCATION_RESTRICTION.test(combined) && !EUROPE_OR_ROMANIA_SIGNAL.test(combined)) {
    score -= 12;
    reasons.push({ reason: 'Location-restricted role', delta: -12 });
  }

  // 6) Automation-only / automation-heavy controls.
  score = applyRules(combined, AUTOMATION_ONLY_NEGATIVES, score, reasons);
  score = applyRules(combined, SDET_SOFT, score, reasons);

  const automationHeavyMatches = AUTOMATION_HEAVY_NEGATIVES.filter(([re]) => re.test(combined));

  if (automationHeavyMatches.length >= 2 || anyRuleMatches(title, AUTOMATION_TITLE_NEGATIVES)) {
    for (const [, delta, label] of automationHeavyMatches) {
      score += delta;
      reasons.push({ reason: label, delta });
    }
  }

  if (anyRuleMatches(combined, AUTOMATION_ONLY_NEGATIVES)) {
    score = capScore(score, 45, 'Capped due to automation-only signals', reasons);
  }

  // 7) Seniority.
  if (/\b(intern|graduate)\b/i.test(combined)) {
    score -= 18;
    reasons.push({ reason: 'Intern/graduate level', delta: -18 });
  } else if (/\b(junior|entry[- ]level)\b/i.test(combined)) {
    score -= 10;
    reasons.push({ reason: 'Junior/entry level', delta: -10 });
  }

  if (/\b(senior|lead|staff|principal|manager|head of)\b/i.test(combined)) {
    score += 6;
    reasons.push({ reason: 'Senior/Lead/Manager level', delta: 6 });
  }

  // 8) Timezone fit.
  if (EU_TIMEZONE_SIGNAL.test(combined)) {
    score += 10;
    reasons.push({ reason: 'EU timezone friendly', delta: 10 });
  }

  score = applyRules(combined, TIMEZONE_NEGATIVES, score, reasons);

  // 9) Low-fit control.
  // Generic PM title alone is not enough. Secondary signals alone are not enough either.
  const hasCoreFit =
    strongTitleFit ||
    hasPrimaryFit ||
    anyRuleMatches(combined, RELEASE_GOVERNANCE_REGEX) ||
    anyRuleMatches(combined, TEST_GOVERNANCE_REGEX) ||
    anyRuleMatches(combined, DELIVERY_GOVERNANCE_REGEX) ||
    (softPMTitleFit && hasGovOrQualitySignals);

  if (!hasCoreFit) {
    score -= 30;
    reasons.push({ reason: 'Low role-fit signals', delta: -30 });
    score = capScore(score, hasSecondaryFit ? 50 : 45, 'Capped due to weak role-fit signals', reasons);
  }

  // 10) Hard caps to keep obvious mismatches from floating up.
  if (anyRuleMatches(combined, SUPPORT_NEGATIVES)) {
    score = capScore(score, 35, 'Capped due to support signals', reasons);
  }

  if (anyRuleMatches(combined, SALES_NEGATIVES)) {
    score = capScore(score, 40, 'Capped due to sales signals', reasons);
  }

  if (anyRuleMatches(title, DEVOPS_BUILD_RELEASE_NEGATIVES)) {
    score = capScore(score, 45, 'Capped due to build/devops/release engineering signals', reasons);
  }

  if (anyRuleMatches(title, AUTOMATION_TITLE_NEGATIVES)) {
    score = capScore(score, 50, 'Capped due to automation-first title', reasons);
  }

  score = Math.max(0, Math.min(100, score));

  reasons.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  const topReasons = reasons
    .filter(r => r.delta !== -999)
    .slice(0, 3)
    .map(r => r.reason);

  return { score, reasons: topReasons };
}