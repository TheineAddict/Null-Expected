import type { WorkplaceType, RemoteScope } from './types';
import { parseCountries } from './normalize';

export interface Classification {
  workplaceType: WorkplaceType;
  remoteScope: RemoteScope;
  eligibleCountries: string[];
  scopeText: string | null;
}

export function classifyJob(
  title: string,
  locationRaw: string | null,
  descriptionText: string | null
): Classification {
  const combined = [title, locationRaw, descriptionText].filter(Boolean).join(' ').toLowerCase();

  const workplaceType = determineWorkplaceType(combined);
  const remoteScope = workplaceType === 'REMOTE' ? determineRemoteScope(combined, locationRaw) : 'UNKNOWN';
  const eligibleCountries = parseCountries(combined);
  const scopeText = locationRaw;

  return {
    workplaceType,
    remoteScope,
    eligibleCountries,
    scopeText,
  };
}

function determineWorkplaceType(text: string): WorkplaceType {
  const hybridPatterns = [
    /\bhybrid\b/,
    /remote.*office/,
    /office.*remote/,
    /flexible.*location/,
    /part.*remote/,
  ];

  const onsitePatterns = [
    /\bon-site\b/,
    /\bonsite\b/,
    /\bin-office\b/,
    /office.*required/,
    /must.*relocate/,
  ];

  const remotePatterns = [
    /\bremote\b/,
    /\bwork from home\b/,
    /\bwfh\b/,
    /\bdistributed\b/,
    /\banywhere\b/,
    /fully remote/,
  ];

  if (hybridPatterns.some(p => p.test(text))) {
    return 'HYBRID';
  }

  if (onsitePatterns.some(p => p.test(text))) {
    return 'ONSITE';
  }

  if (remotePatterns.some(p => p.test(text))) {
    return 'REMOTE';
  }

  return 'UNKNOWN';
}

function determineRemoteScope(text: string, locationRaw: string | null): RemoteScope {
  const worldwidePatterns = [
    /\bworldwide\b/,
    /\bglobal\b/,
    /\banywhere\b/,
    /\bany country\b/,
    /\ball countries\b/,
    /work from anywhere/,
  ];

  const romaniaPatterns = [
    /\bromania\b/,
    /\bbucharest\b/,
    /\bcluj\b/,
    /\btimisoara\b/,
    /\bromanians?\b/,
  ];

  const euEeaPatterns = [
    /\beu\b/,
    /\beea\b/,
    /european union/,
    /european economic area/,
    /eu\/eea/,
  ];

  const europePatterns = [
    /\beurope\b/,
    /\beuropean\b/,
  ];

  const emeaPatterns = [
    /\bemea\b/,
    /europe.*middle east.*africa/,
  ];

  const countryOnlyPatterns = [
    /\bonly\b/,
    /\brestricted to\b/,
    /\blimited to\b/,
    /\bresidents of\b/,
  ];

  if (worldwidePatterns.some(p => p.test(text))) {
    return 'WORLDWIDE';
  }

  if (romaniaPatterns.some(p => p.test(text))) {
    return 'ROMANIA';
  }

  if (euEeaPatterns.some(p => p.test(text))) {
    return 'EU_EEA';
  }

  if (europePatterns.some(p => p.test(text))) {
    return 'EUROPE';
  }

  if (emeaPatterns.some(p => p.test(text))) {
    return 'EMEA';
  }

  const countries = parseCountries(text);
  if (countryOnlyPatterns.some(p => p.test(text)) && countries.length === 1) {
    return 'COUNTRY_ONLY';
  }

  if (countries.length > 1 && countries.length <= 5) {
    return 'MULTI_COUNTRY';
  }

  return 'UNKNOWN';
}
