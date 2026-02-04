import type { RawJob, SourceConfig } from './types';

export async function fetchFromSource(source: SourceConfig): Promise<RawJob[]> {
  console.log(`[${source.id}] Fetching from ${source.name}...`);

  try {
    switch (source.type) {
      case 'WWR_RSS':
        return await fetchWWR(source);
      case 'REMOTIVE_API':
        return await fetchRemotive(source);
      case 'HIMALAYAS_API':
        return await fetchHimalayas(source);
      default:
        console.warn(`[${source.id}] Unknown source type: ${source.type}`);
        return [];
    }
  } catch (error) {
    console.error(`[${source.id}] Error fetching:`, error);
    throw error;
  }
}

async function fetchWWR(source: SourceConfig): Promise<RawJob[]> {
  const response = await fetch(source.config.url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const xml = await response.text();
  return parseWWRRSS(xml, source.id);
}

function parseWWRRSS(xml: string, sourceId: string): RawJob[] {
  const jobs: RawJob[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const items = xml.match(itemRegex) || [];

  for (const item of items) {
    const title = extractXMLTag(item, 'title');
    const link = extractXMLTag(item, 'link');
    const description = extractXMLTag(item, 'description');
    const pubDate = extractXMLTag(item, 'pubDate');
    const category = extractXMLTag(item, 'category');

    if (!title || !link) continue;

    const companyMatch = title.match(/:\s*(.+?)(?:\s*\(|$)/);
    const company = companyMatch ? companyMatch[1].trim() : null;

    jobs.push({
      sourceId: `wwr-${link.split('/').pop() || Date.now()}`,
      source: 'WWR',
      title: title.split(':')[0]?.trim() || title,
      company,
      locationRaw: category || null,
      descriptionHtml: description,
      canonicalUrl: link,
      postedAt: pubDate ? new Date(pubDate).toISOString() : null,
    });
  }

  console.log(`[${sourceId}] Parsed ${jobs.length} jobs from RSS`);
  return jobs;
}

function extractXMLTag(xml: string, tag: string): string | null {
  const match = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`));
  return match ? (match[1] || match[2] || '').trim() : null;
}

async function fetchRemotive(source: SourceConfig): Promise<RawJob[]> {
  const url = new URL(source.config.url);
  if (source.config.params) {
    Object.entries(source.config.params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  const jobs: RawJob[] = [];

  if (Array.isArray(data.jobs)) {
    for (const job of data.jobs) {
      jobs.push({
        sourceId: `remotive-${job.id || Date.now()}`,
        source: 'REMOTIVE',
        title: job.title || 'Untitled',
        company: job.company_name || null,
        locationRaw: job.candidate_required_location || null,
        descriptionHtml: job.description || null,
        canonicalUrl: job.url || `https://remotive.com/remote-jobs/${job.id}`,
        postedAt: job.publication_date ? new Date(job.publication_date).toISOString() : null,
      });
    }
  }

  console.log(`[${source.id}] Fetched ${jobs.length} jobs from API`);
  return jobs;
}

async function fetchHimalayas(source: SourceConfig): Promise<RawJob[]> {
  const jobs: RawJob[] = [];
  let offset = 0;
  const limit = source.config.params?.limit || 20;
  const maxPages = 5;

  for (let page = 0; page < maxPages; page++) {
    const url = new URL(source.config.url);
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('offset', String(offset));

    const response = await fetch(url.toString());
    if (!response.ok) {
      console.warn(`[${source.id}] HTTP ${response.status} at offset ${offset}, stopping pagination`);
      break;
    }

    const data = await response.json();

    if (!data.jobs || !Array.isArray(data.jobs) || data.jobs.length === 0) {
      break;
    }

    for (const job of data.jobs) {
      jobs.push({
        sourceId: `himalayas-${job.id || job.slug || Date.now()}`,
        source: 'HIMALAYAS',
        title: job.title || 'Untitled',
        company: job.company?.name || null,
        locationRaw: job.location || null,
        descriptionHtml: job.description || null,
        canonicalUrl: job.url || `https://himalayas.app/jobs/${job.slug}`,
        postedAt: job.pubDate || job.publishedAt ? new Date(job.pubDate || job.publishedAt).toISOString() : null,
      });
    }

    offset += limit;

    if (data.jobs.length < limit) {
      break;
    }
  }

  console.log(`[${source.id}] Fetched ${jobs.length} jobs from API`);
  return jobs;
}
