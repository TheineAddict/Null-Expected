import { chromium, Browser, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Issue {
  type: 'console-error' | 'page-error' | 'network-failure' | 'navigation-failure' | 'missing-h1' | 'empty-title';
  url: string;
  description: string;
  screenshot?: string;
  timestamp: string;
}

interface ExplorationConfig {
  baseURL: string;
  maxPages: number;
  maxDepth: number;
  timestamp: string;
  artifactsDir: string;
  reportsDir: string;
}

interface PageState {
  url: string;
  depth: number;
}

class ExploratoryRunner {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private visited = new Set<string>();
  private issues: Issue[] = [];
  private config: ExplorationConfig;
  private queue: PageState[] = [];
  private pagesExplored = 0;

  constructor(config: ExplorationConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();

    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        this.recordIssue({
          type: 'console-error',
          url: this.page!.url(),
          description: `Console error: ${msg.text()}`,
          timestamp: new Date().toISOString(),
        });
      }
    });

    this.page.on('pageerror', (error) => {
      this.recordIssue({
        type: 'page-error',
        url: this.page!.url(),
        description: `Page error: ${error.message}`,
        timestamp: new Date().toISOString(),
      });
    });

    this.page.on('response', (response) => {
      if (response.status() >= 400) {
        this.recordIssue({
          type: 'network-failure',
          url: this.page!.url(),
          description: `Failed request: ${response.url()} (${response.status()})`,
          timestamp: new Date().toISOString(),
        });
      }
    });
  }

  async cleanup(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.close();
  }

  private normalizeURL(url: string): string {
    try {
      const urlObj = new URL(url, this.config.baseURL);
      return urlObj.pathname + urlObj.search;
    } catch {
      return url;
    }
  }

  private recordIssue(issue: Issue): void {
    const existingIssue = this.issues.find(
      (i) => i.type === issue.type && i.url === issue.url && i.description === issue.description
    );
    if (!existingIssue) {
      this.issues.push(issue);
    }
  }

  private async takeScreenshot(issueName: string): Promise<string> {
    if (!this.page) return '';

    const filename = `${this.config.timestamp}-${issueName.replace(/[^a-z0-9]/gi, '-')}.png`;
    const screenshotPath = path.join(this.config.artifactsDir, filename);

    try {
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      return filename;
    } catch (error) {
      console.error(`Failed to take screenshot: ${error}`);
      return '';
    }
  }

  private async performBasicChecks(): Promise<void> {
    if (!this.page) return;

    const currentURL = this.page.url();

    try {
      const h1Count = await this.page.locator('h1').count();
      if (h1Count === 0) {
        const screenshot = await this.takeScreenshot(`missing-h1-${this.pagesExplored}`);
        this.recordIssue({
          type: 'missing-h1',
          url: currentURL,
          description: 'Page is missing an h1 element',
          screenshot,
          timestamp: new Date().toISOString(),
        });
      }

      const title = await this.page.title();
      if (!title || title.trim() === '') {
        const screenshot = await this.takeScreenshot(`empty-title-${this.pagesExplored}`);
        this.recordIssue({
          type: 'empty-title',
          url: currentURL,
          description: 'Page has an empty or missing title',
          screenshot,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error(`Basic checks failed for ${currentURL}: ${error}`);
    }
  }

  private async discoverLinks(): Promise<string[]> {
    if (!this.page) return [];

    try {
      const navLinks = await this.page.locator('nav a, header a').evaluateAll((links) =>
        links.map((link: any) => link.href).filter((href: string) => href)
      );

      const mainLinks = await this.page.locator('main a').evaluateAll((links) =>
        links.map((link: any) => link.href).filter((href: string) => href)
      );

      const allLinks = [...new Set([...navLinks, ...mainLinks])];

      return allLinks.filter((link) => {
        try {
          const url = new URL(link);
          return url.origin === new URL(this.config.baseURL).origin;
        } catch {
          return false;
        }
      });
    } catch (error) {
      console.error(`Failed to discover links: ${error}`);
      return [];
    }
  }

  private async exploreFilters(): Promise<void> {
    if (!this.page) return;

    const currentURL = this.page.url();
    if (!currentURL.includes('/blog')) return;

    console.log('  Exploring blog filters...');

    try {
      const filterButtons = await this.page.locator('button:has-text("Filter"), button:has-text("Category")').all();

      if (filterButtons.length > 0) {
        const firstFilter = filterButtons[0];
        await firstFilter.click();
        await this.page.waitForTimeout(500);
        await this.performBasicChecks();

        const resetButton = await this.page.locator('button:has-text("Reset"), button:has-text("Clear")').first();
        if (await resetButton.isVisible()) {
          await resetButton.click();
          await this.page.waitForTimeout(500);
        }
      }

      const tagLinks = await this.page.locator('a[href*="/blog/tag/"], a[href*="tag="]').all();
      if (tagLinks.length > 0) {
        const tagLink = tagLinks[0];
        const tagURL = await tagLink.getAttribute('href');
        if (tagURL) {
          const normalizedTagURL = this.normalizeURL(tagURL);
          if (!this.visited.has(normalizedTagURL)) {
            this.queue.push({ url: normalizedTagURL, depth: 2 });
          }
        }
      }
    } catch (error) {
      console.log(`  Filter exploration failed: ${error}`);
    }
  }

  private async exploreBlogPost(): Promise<void> {
    if (!this.page) return;

    const currentURL = this.page.url();
    if (!currentURL.includes('/blog')) return;

    console.log('  Looking for blog posts...');

    try {
      const postLinks = await this.page.locator('main article a, main .post a, main [class*="post"] a').all();

      if (postLinks.length > 0) {
        const firstPost = postLinks[0];
        const postURL = await firstPost.getAttribute('href');

        if (postURL) {
          const normalizedPostURL = this.normalizeURL(postURL);
          if (!this.visited.has(normalizedPostURL) && normalizedPostURL.startsWith('/blog/')) {
            this.queue.push({ url: normalizedPostURL, depth: 2 });
            console.log(`  Found blog post: ${normalizedPostURL}`);
          }
        }
      }
    } catch (error) {
      console.log(`  Blog post discovery failed: ${error}`);
    }
  }

  private async navigateToPage(url: string): Promise<boolean> {
    if (!this.page) return false;

    try {
      const response = await this.page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      if (!response || response.status() === 404) {
        const screenshot = await this.takeScreenshot(`navigation-failure-${this.pagesExplored}`);
        this.recordIssue({
          type: 'navigation-failure',
          url: url,
          description: `Navigation failed or returned 404 (status: ${response?.status() || 'unknown'})`,
          screenshot,
          timestamp: new Date().toISOString(),
        });
        return false;
      }

      return true;
    } catch (error) {
      const screenshot = await this.takeScreenshot(`navigation-error-${this.pagesExplored}`);
      this.recordIssue({
        type: 'navigation-failure',
        url: url,
        description: `Navigation error: ${error}`,
        screenshot,
        timestamp: new Date().toISOString(),
      });
      return false;
    }
  }

  async explore(): Promise<void> {
    console.log('Starting exploratory testing...\n');

    this.queue.push({ url: '/', depth: 0 });

    while (this.queue.length > 0 && this.pagesExplored < this.config.maxPages) {
      const state = this.queue.shift()!;
      const normalizedURL = this.normalizeURL(state.url);

      if (this.visited.has(normalizedURL)) continue;
      if (state.depth > this.config.maxDepth) continue;

      this.visited.add(normalizedURL);
      this.pagesExplored++;

      const fullURL = normalizedURL.startsWith('http') ? normalizedURL : `${this.config.baseURL}${normalizedURL}`;
      console.log(`[${this.pagesExplored}/${this.config.maxPages}] Exploring: ${normalizedURL} (depth: ${state.depth})`);

      const success = await this.navigateToPage(fullURL);
      if (!success) continue;

      await this.page!.waitForTimeout(1000);

      await this.performBasicChecks();

      if (normalizedURL === '/' || normalizedURL.includes('/blog')) {
        await this.exploreBlogPost();
        await this.exploreFilters();
      }

      if (state.depth < this.config.maxDepth) {
        const links = await this.discoverLinks();

        for (const link of links.slice(0, 10)) {
          const normalizedLink = this.normalizeURL(link);
          if (!this.visited.has(normalizedLink)) {
            this.queue.push({ url: normalizedLink, depth: state.depth + 1 });
          }
        }
      }
    }

    console.log(`\nExploration complete. Visited ${this.pagesExplored} pages.`);
    console.log(`Found ${this.issues.length} issues.\n`);
  }

  private generateMarkdownReport(): string {
    const lines: string[] = [];

    lines.push('# Exploratory Testing Report');
    lines.push('');
    lines.push(`**Generated:** ${new Date().toISOString()}`);
    lines.push(`**Base URL:** ${this.config.baseURL}`);
    lines.push(`**Pages Explored:** ${this.pagesExplored}/${this.config.maxPages}`);
    lines.push(`**Max Depth:** ${this.config.maxDepth}`);
    lines.push('');

    lines.push('## Summary');
    lines.push('');
    lines.push(`- Total Issues Found: **${this.issues.length}**`);
    lines.push(`- Pages Visited: **${this.visited.size}**`);
    lines.push('');

    const issuesByType = this.issues.reduce((acc, issue) => {
      acc[issue.type] = (acc[issue.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    lines.push('### Issues by Type');
    lines.push('');
    Object.entries(issuesByType).forEach(([type, count]) => {
      lines.push(`- ${type}: ${count}`);
    });
    lines.push('');

    if (this.issues.length === 0) {
      lines.push('## Results');
      lines.push('');
      lines.push('✅ No issues found! All pages passed basic checks.');
      lines.push('');
    } else {
      lines.push('## Issues Found');
      lines.push('');

      const groupedIssues = this.issues.reduce((acc, issue) => {
        if (!acc[issue.type]) acc[issue.type] = [];
        acc[issue.type].push(issue);
        return acc;
      }, {} as Record<string, Issue[]>);

      Object.entries(groupedIssues).forEach(([type, issues]) => {
        lines.push(`### ${type.replace(/-/g, ' ').toUpperCase()}`);
        lines.push('');

        issues.forEach((issue, index) => {
          lines.push(`#### Issue ${index + 1}`);
          lines.push('');
          lines.push(`**URL:** ${issue.url}`);
          lines.push(`**Description:** ${issue.description}`);
          lines.push(`**Timestamp:** ${issue.timestamp}`);

          if (issue.screenshot) {
            lines.push(`**Screenshot:** [View](../artifacts/${this.config.timestamp}/${issue.screenshot})`);
          }

          lines.push('');
        });
      });
    }

    lines.push('## Pages Visited');
    lines.push('');
    Array.from(this.visited).sort().forEach((url) => {
      lines.push(`- ${url}`);
    });
    lines.push('');

    lines.push('---');
    lines.push('');
    lines.push('*Report generated by Exploratory QA Runner*');

    return lines.join('\n');
  }

  async saveReport(): Promise<void> {
    const reportContent = this.generateMarkdownReport();
    const reportPath = path.join(
      this.config.reportsDir,
      `${this.config.timestamp}-exploratory-report.md`
    );

    fs.writeFileSync(reportPath, reportContent, 'utf-8');
    console.log(`Report saved to: ${reportPath}`);
  }
}

async function main() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('.')[0];
  const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5173';
  const maxPages = parseInt(process.env.MAX_PAGES || '25', 10);
  const maxDepth = parseInt(process.env.MAX_DEPTH || '3', 10);

  const projectRoot = path.resolve(__dirname, '../..');
  const artifactsDir = path.join(projectRoot, 'tests/agentic/artifacts', timestamp);
  const reportsDir = path.join(projectRoot, 'tests/agentic/reports');

  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const config: ExplorationConfig = {
    baseURL,
    maxPages,
    maxDepth,
    timestamp,
    artifactsDir,
    reportsDir,
  };

  console.log('Exploratory Testing Configuration:');
  console.log(`  Base URL: ${baseURL}`);
  console.log(`  Max Pages: ${maxPages}`);
  console.log(`  Max Depth: ${maxDepth}`);
  console.log(`  Artifacts: ${artifactsDir}`);
  console.log(`  Reports: ${reportsDir}`);
  console.log('');

  const runner = new ExploratoryRunner(config);

  try {
    await runner.initialize();
    await runner.explore();
    await runner.saveReport();
  } catch (error) {
    console.error('Exploratory testing failed:', error);
    process.exit(1);
  } finally {
    await runner.cleanup();
  }

  process.exit(0);
}

main();
