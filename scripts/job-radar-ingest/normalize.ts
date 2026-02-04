import { createHash } from 'crypto';
import type { RawJob } from './types';

export function cleanHtmlToText(html: string | null): string | null {
  if (!html) return null;

  let text = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[a-z]+;/gi, '')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();

  return text || null;
}

export function computeHashDedup(job: RawJob): string {
  const company = (job.company || '').toLowerCase().trim();
  const title = job.title.toLowerCase().trim();
  const url = job.canonicalUrl.trim();

  const composite = `${company}|${title}|${url}`;
  return createHash('sha256').update(composite).digest('hex');
}

export function generateStableUUID(seed: string): string {
  const hash = createHash('md5').update(seed).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-${
    ((parseInt(hash.slice(16, 18), 16) & 0x3f) | 0x80).toString(16).padStart(2, '0')
  }${hash.slice(18, 20)}-${hash.slice(20, 32)}`;
}

export function parseCountries(text: string): string[] {
  const countryMap: Record<string, string> = {
    'romania': 'RO',
    'germany': 'DE',
    'france': 'FR',
    'spain': 'ES',
    'italy': 'IT',
    'poland': 'PL',
    'netherlands': 'NL',
    'belgium': 'BE',
    'austria': 'AT',
    'portugal': 'PT',
    'sweden': 'SE',
    'denmark': 'DK',
    'finland': 'FI',
    'norway': 'NO',
    'switzerland': 'CH',
    'ireland': 'IE',
    'czechia': 'CZ',
    'czech republic': 'CZ',
    'hungary': 'HU',
    'bulgaria': 'BG',
    'slovakia': 'SK',
    'croatia': 'HR',
    'greece': 'GR',
    'united kingdom': 'GB',
    'uk': 'GB',
    'united states': 'US',
    'usa': 'US',
    'canada': 'CA',
    'australia': 'AU',
    'new zealand': 'NZ',
  };

  const countries = new Set<string>();
  const lowerText = text.toLowerCase();

  for (const [name, code] of Object.entries(countryMap)) {
    if (lowerText.includes(name)) {
      countries.add(code);
    }
  }

  const isoMatch = text.match(/\b([A-Z]{2})\b/g);
  if (isoMatch) {
    isoMatch.forEach(code => {
      if (code.length === 2 && /^[A-Z]{2}$/.test(code)) {
        countries.add(code);
      }
    });
  }

  return Array.from(countries).sort();
}
