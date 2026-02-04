import type { RawJob, SourceConfig, ErrorType } from './types';
import { delay } from './rate-limiter';

export interface FetchResult {
  jobs: RawJob[];
  ok: boolean;
  httpStatus: number | null;
  errorType: ErrorType | null;
  message: string | null;
}

export async function fetchFromSource(source: SourceConfig): Promise<FetchResult> {
  console.log(`[${source.id}] Fetching from ${source.name}...`);

  try {
    let jobs: RawJob[];
    switch (source.type) {
      case 'WWR_RSS':
        jobs = await fetchWWR(source);
        break;
      case 'REMOTIVE_API':
        jobs = await fetchRemotive(source);
        break;
      case 'HIMALAYAS_API':
        jobs = await fetchHimalayas(source);
        break;
      case 'RSS_GENERIC':
        jobs = await fetchRSSGeneric(source);
        break;
      case 'SITEMAP_XML':
        jobs = await fetchSitemapXML(source);
        break;
      case 'GREENHOUSE_BOARD':
        jobs = await fetchGreenhouseBoard(source);
        break;
      case 'ASHBY_BOARD':
        jobs = await fetchAshbyBoard(source);
        break;
      case 'JOBICY_API':
        jobs = await fetchJobicy(source);
        break;
      case 'REMOTEOK_API':
        jobs = await fetchRemoteOK(source);
        break;
      case 'HTML_SCRAPE':
        jobs = await fetchHTMLScrape(source);
        break;
      default:
        console.warn(`[${source.id}] Unsupported source type: ${source.type}`);
        return {
          jobs: [],
          ok: false,
          httpStatus: null,
          errorType: 'UNSUPPORTED_SOURCE',
          message: `Source type "${source.type}" does not have a connector implementation`,
        };
    }

    return {
      jobs,
      ok: true,
      httpStatus: 200,
      errorType: null,
      message: null,
    };
  } catch (error) {
    console.error(`[${source.id}] Error fetching:`, error);

    const errorMsg = error instanceof Error ? error.message : String(error);

    if (errorMsg.includes('429')) {
      return {
        jobs: [],
        ok: false,
        httpStatus: 429,
        errorType: 'RATE_LIMITED',
        message: errorMsg,
      };
    }

    if (errorMsg.includes('403') || errorMsg.includes('401')) {
      const status = errorMsg.includes('403') ? 403 : 401;
      return {
        jobs: [],
        ok: false,
        httpStatus: status,
        errorType: 'BLOCKED',
        message: errorMsg,
      };
    }

    if (errorMsg.includes('HTTP')) {
      const statusMatch = errorMsg.match(/HTTP (\d+)/);
      const status = statusMatch ? parseInt(statusMatch[1]) : null;
      return {
        jobs: [],
        ok: false,
        httpStatus: status,
        errorType: 'HTTP_ERROR',
        message: errorMsg,
      };
    }

    if (errorMsg.toLowerCase().includes('timeout') || errorMsg.toLowerCase().includes('aborted')) {
      return {
        jobs: [],
        ok: false,
        httpStatus: null,
        errorType: 'TIMEOUT',
        message: errorMsg,
      };
    }

    if (errorMsg.toLowerCase().includes('parse') || errorMsg.toLowerCase().includes('json') || errorMsg.toLowerCase().includes('xml')) {
      return {
        jobs: [],
        ok: false,
        httpStatus: null,
        errorType: 'PARSE_ERROR',
        message: errorMsg,
      };
    }

    if (errorMsg.toLowerCase().includes('network') || errorMsg.toLowerCase().includes('fetch')) {
      return {
        jobs: [],
        ok: false,
        httpStatus: null,
        errorType: 'NETWORK_ERROR',
        message: errorMsg,
      };
    }

    return {
      jobs: [],
      ok: false,
      httpStatus: null,
      errorType: 'UNKNOWN_ERROR',
      message: errorMsg,
    };
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

async function fetchRSSGeneric(source: SourceConfig): Promise<RawJob[]> {
  const response = await fetch(source.config.url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const xml = await response.text();
  return parseGenericRSS(xml, source);
}

function parseGenericRSS(xml: string, source: SourceConfig): RawJob[] {
  const jobs: RawJob[] = [];
  const isAtom = xml.includes('<feed') && xml.includes('xmlns="http://www.w3.org/2005/Atom"');

  if (isAtom) {
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    const entries = xml.match(entryRegex) || [];

    for (const entry of entries) {
      const title = extractXMLTag(entry, 'title');
      const link = extractXMLTag(entry, 'link');
      const linkHref = entry.match(/<link[^>]+href="([^"]+)"/)?.[1];
      const summary = extractXMLTag(entry, 'summary') || extractXMLTag(entry, 'content');
      const updated = extractXMLTag(entry, 'updated');
      const id = extractXMLTag(entry, 'id');

      const finalLink = linkHref || link;
      if (!title || !finalLink) continue;

      jobs.push({
        sourceId: `${source.id}-${id || finalLink.split('/').pop() || Date.now()}`,
        source: source.id.toUpperCase(),
        title: title.trim(),
        company: null,
        locationRaw: null,
        descriptionHtml: summary,
        canonicalUrl: finalLink,
        postedAt: updated ? new Date(updated).toISOString() : null,
      });
    }
  } else {
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const items = xml.match(itemRegex) || [];

    for (const item of items) {
      const title = extractXMLTag(item, 'title');
      const link = extractXMLTag(item, 'link');
      const description = extractXMLTag(item, 'description');
      const pubDate = extractXMLTag(item, 'pubDate');
      const guid = extractXMLTag(item, 'guid');

      if (!title || !link) continue;

      jobs.push({
        sourceId: `${source.id}-${guid || link.split('/').pop() || Date.now()}`,
        source: source.id.toUpperCase(),
        title: title.trim(),
        company: null,
        locationRaw: null,
        descriptionHtml: description,
        canonicalUrl: link,
        postedAt: pubDate ? new Date(pubDate).toISOString() : null,
      });
    }
  }

  console.log(`[${source.id}] Parsed ${jobs.length} jobs from RSS`);
  return jobs;
}

async function fetchSitemapXML(source: SourceConfig): Promise<RawJob[]> {
  const response = await fetch(source.config.url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const xml = await response.text();
  const urlRegex = /<loc>([\s\S]*?)<\/loc>/g;
  const urls = [];
  let match;

  while ((match = urlRegex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }

  const maxUrls = 50;
  const selectedUrls = urls.slice(0, maxUrls);

  console.log(`[${source.id}] Found ${urls.length} URLs, fetching first ${selectedUrls.length}...`);

  const jobs: RawJob[] = [];

  for (let i = 0; i < selectedUrls.length; i++) {
    const url = selectedUrls[i];
    try {
      if (i > 0) await delay(2000);

      const jobResponse = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!jobResponse.ok) continue;

      const html = await jobResponse.text();
      const job = parseJobPageHTML(html, url, source);
      if (job) jobs.push(job);
    } catch (error) {
      console.warn(`[${source.id}] Failed to fetch ${url}:`, error);
    }
  }

  console.log(`[${source.id}] Parsed ${jobs.length} jobs from sitemap`);
  return jobs;
}

function parseJobPageHTML(html: string, url: string, source: SourceConfig): RawJob | null {
  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || html.match(/<title>([\s\S]*?)<\/title>/);
  const title = titleMatch ? stripHTML(titleMatch[1]).trim() : null;

  if (!title) return null;

  const descMatch = html.match(/<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  const description = descMatch ? descMatch[1].trim() : null;

  return {
    sourceId: `${source.id}-${url.split('/').pop() || Date.now()}`,
    source: source.id.toUpperCase(),
    title,
    company: null,
    locationRaw: null,
    descriptionHtml: description,
    canonicalUrl: url,
    postedAt: null,
  };
}

async function fetchGreenhouseBoard(source: SourceConfig): Promise<RawJob[]> {
  const boardUrl = source.config.url;
  const response = await fetch(boardUrl);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const html = await response.text();
  const jobIds: string[] = [];
  const jobIdRegex = /gh_jid=(\d+)/g;
  let match;

  while ((match = jobIdRegex.exec(html)) !== null) {
    if (!jobIds.includes(match[1])) {
      jobIds.push(match[1]);
    }
  }

  console.log(`[${source.id}] Found ${jobIds.length} job IDs on board`);

  const jobs: RawJob[] = [];
  const boardDomain = new URL(boardUrl).origin;

  for (let i = 0; i < jobIds.length; i++) {
    const jobId = jobIds[i];
    try {
      if (i > 0) await delay(2000);

      const jobUrl = `${boardDomain}/jobs/${jobId}`;
      const jobResponse = await fetch(jobUrl, { signal: AbortSignal.timeout(30000) });
      if (!jobResponse.ok) continue;

      const jobHtml = await jobResponse.text();
      const job = parseGreenhouseJobPage(jobHtml, jobUrl, jobId, source);
      if (job) jobs.push(job);
    } catch (error) {
      console.warn(`[${source.id}] Failed to fetch job ${jobId}:`, error);
    }
  }

  console.log(`[${source.id}] Parsed ${jobs.length} jobs from Greenhouse board`);
  return jobs;
}

function parseGreenhouseJobPage(html: string, url: string, jobId: string, source: SourceConfig): RawJob | null {
  const titleMatch = html.match(/<h1[^>]*class="[^"]*app-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/) ||
                     html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const title = titleMatch ? stripHTML(titleMatch[1]).trim() : null;

  if (!title) return null;

  const locationMatch = html.match(/<div[^>]*class="[^"]*location[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  const location = locationMatch ? stripHTML(locationMatch[1]).trim() : null;

  const descMatch = html.match(/<div[^>]*id="content"[^>]*>([\s\S]*?)<\/div>/i);
  const description = descMatch ? descMatch[1].trim() : null;

  return {
    sourceId: `${source.id}-${jobId}`,
    source: source.id.toUpperCase(),
    title,
    company: source.config.company || null,
    locationRaw: location,
    descriptionHtml: description,
    canonicalUrl: url,
    postedAt: null,
  };
}

async function fetchAshbyBoard(source: SourceConfig): Promise<RawJob[]> {
  const apiUrl = source.config.apiUrl || source.config.url.replace('/jobs', '/api/jobs');
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  const jobs: RawJob[] = [];

  if (Array.isArray(data.jobs)) {
    for (const job of data.jobs) {
      const locationParts = [];
      if (job.locationRequirements && Array.isArray(job.locationRequirements)) {
        locationParts.push(...job.locationRequirements);
      }
      if (job.remoteStatus) {
        locationParts.push(job.remoteStatus);
      }

      jobs.push({
        sourceId: `${source.id}-${job.id}`,
        source: source.id.toUpperCase(),
        title: job.title || 'Untitled',
        company: source.config.company || null,
        locationRaw: locationParts.join(', ') || null,
        descriptionHtml: job.description || job.descriptionHtml || null,
        canonicalUrl: job.jobUrl || `${source.config.url}/${job.id}`,
        postedAt: job.publishedDate ? new Date(job.publishedDate).toISOString() : null,
      });
    }
  }

  console.log(`[${source.id}] Fetched ${jobs.length} jobs from Ashby board`);
  return jobs;
}

async function fetchJobicy(source: SourceConfig): Promise<RawJob[]> {
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
        sourceId: `jobicy-${job.id || Date.now()}`,
        source: 'JOBICY',
        title: job.jobTitle || 'Untitled',
        company: job.companyName || null,
        locationRaw: job.jobGeo || null,
        descriptionHtml: job.jobDescription || null,
        canonicalUrl: job.url || job.jobUrl || `https://jobicy.com/job/${job.id}`,
        postedAt: job.pubDate ? new Date(job.pubDate).toISOString() : null,
      });
    }
  }

  console.log(`[${source.id}] Fetched ${jobs.length} jobs from Jobicy API`);
  return jobs;
}

async function fetchRemoteOK(source: SourceConfig): Promise<RawJob[]> {
  const response = await fetch(source.config.url, {
    headers: {
      'User-Agent': 'JobRadarApp/1.0 (Job aggregator for quality/testing roles)',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  const jobs: RawJob[] = [];

  if (Array.isArray(data)) {
    for (let i = 1; i < data.length; i++) {
      const job = data[i];
      if (!job || typeof job !== 'object') continue;

      jobs.push({
        sourceId: `remoteok-${job.id || Date.now()}`,
        source: 'REMOTEOK',
        title: job.position || 'Untitled',
        company: job.company || null,
        locationRaw: job.location || null,
        descriptionHtml: job.description || null,
        canonicalUrl: job.url || `https://remoteok.com/remote-jobs/${job.id}`,
        postedAt: job.date ? new Date(job.date * 1000).toISOString() : null,
      });
    }
  }

  console.log(`[${source.id}] Fetched ${jobs.length} jobs from RemoteOK API`);
  return jobs;
}

async function fetchHTMLScrape(source: SourceConfig): Promise<RawJob[]> {
  console.log(`[${source.id}] HTML scraping not yet implemented, returning empty result`);
  return [];
}

function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
}
