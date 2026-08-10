export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function addJitter(baseMs: number, jitterPercent: number = 20): number {
  const jitter = baseMs * (jitterPercent / 100);
  return baseMs + (Math.random() * jitter * 2 - jitter);
}

export async function delayWithJitter(baseMs: number, jitterPercent: number = 20): Promise<void> {
  const ms = addJitter(baseMs, jitterPercent);
  return delay(ms);
}

export interface RetryConfig {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  initialDelayMs: 1000,
  maxDelayMs: 10000,
  backoffMultiplier: 2,
};

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: Error | null = null;
  let delayMs = finalConfig.initialDelayMs;

  for (let attempt = 1; attempt <= finalConfig.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === finalConfig.maxAttempts) {
        break;
      }

      console.log(`  Retry attempt ${attempt}/${finalConfig.maxAttempts} after ${delayMs}ms...`);
      await delay(delayMs);

      delayMs = Math.min(delayMs * finalConfig.backoffMultiplier, finalConfig.maxDelayMs);
    }
  }

  throw lastError || new Error('Retry failed');
}

export interface RateLimitConfig {
  requestsPerMinute: number;
  burstSize: number;
}

export class RateLimiter {
  private requests: number[] = [];
  private config: RateLimitConfig;

  constructor(config: Partial<RateLimitConfig> = {}) {
    this.config = {
      requestsPerMinute: config.requestsPerMinute || 60,
      burstSize: config.burstSize || 10,
    };
  }

  async waitForSlot(): Promise<void> {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    this.requests = this.requests.filter(time => time > oneMinuteAgo);

    if (this.requests.length >= this.config.requestsPerMinute) {
      const oldestRequest = this.requests[0];
      const waitTime = oldestRequest + 60000 - now;
      console.log(`  Rate limit: waiting ${waitTime}ms...`);
      await delay(waitTime);
      return this.waitForSlot();
    }

    const recentRequests = this.requests.filter(time => time > now - 1000);
    if (recentRequests.length >= this.config.burstSize) {
      await delay(1000);
      return this.waitForSlot();
    }

    this.requests.push(now);
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    await this.waitForSlot();
    return fn();
  }
}

export const SOURCE_DELAYS = {
  RSS_GENERIC: 0,
  WWR_RSS: 0,
  REMOTIVE_API: 1000,
  REMOTEOK_API: 5000,
  JOBICY_API: 1000,
  HIMALAYAS_API: 1000,
  GREENHOUSE_BOARD: 2000,
  ASHBY_BOARD: 1000,
  SITEMAP_XML: 2000,
  HTML_SCRAPE: 3000,
} as const;

export function getDelayForSourceType(sourceType: string): number {
  return SOURCE_DELAYS[sourceType as keyof typeof SOURCE_DELAYS] || 1000;
}
