import { test, expect, devices } from '@playwright/test';

const viewports = [
  {
    name: 'mobile',
    viewport: devices['iPhone 12'].viewport,
  },
  {
    name: 'desktop',
    viewport: devices['Desktop Chrome'].viewport,
  },
];

test.describe('Visual Regression Tests', () => {
  for (const { name, viewport } of viewports) {
    test.describe(`${name} viewport`, () => {
      test.use({ viewport });

      test(`landing page - ${name}`, async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Wait for the featured posts section to finish loading
        // This handles both cases: when posts exist and when they don't
        await page.waitForFunction(() => {
          const loadingText = document.body.textContent?.includes('Loading featured posts...');
          return !loadingText;
        }, { timeout: 15000 });

        // Verify content is present (either articles or empty state message)
        const hasArticles = await page.locator('article').count() > 0;
        const hasEmptyState = await page.locator('text=No featured posts available yet').count() > 0;

        if (!hasArticles && !hasEmptyState) {
          throw new Error('Expected either featured post articles or empty state message, but found neither');
        }

        await page.addStyleTag({
          content: `
            *, *::before, *::after {
              animation-duration: 0s !important;
              animation-delay: 0s !important;
              transition-duration: 0s !important;
              transition-delay: 0s !important;
            }
          `
        });

        await page.evaluate(() => document.fonts.ready);

        await expect(page).toHaveScreenshot(`landing-${name}.png`, {
          fullPage: true,
          maxDiffPixels: 100,
          timeout: 10000,
        });
      });

      test(`blog listing - ${name}`, async ({ page }) => {
        await page.goto('/blog');
        await page.waitForLoadState('networkidle');

        // Wait for the blog posts section to finish loading
        // This handles both cases: when posts exist and when they don't
        await page.waitForFunction(() => {
          const loadingText = document.body.textContent?.includes('Loading posts...');
          return !loadingText;
        }, { timeout: 15000 });

        // Verify content is present (either articles or empty state message)
        const hasArticles = await page.locator('article').count() > 0;
        const hasEmptyState = await page.locator('text=No posts found').count() > 0;

        if (!hasArticles && !hasEmptyState) {
          throw new Error('Expected either blog post articles or empty state message, but found neither');
        }

        await page.addStyleTag({
          content: `
            *, *::before, *::after {
              animation-duration: 0s !important;
              animation-delay: 0s !important;
              transition-duration: 0s !important;
              transition-delay: 0s !important;
            }
          `
        });

        await page.evaluate(() => document.fonts.ready);

        await expect(page).toHaveScreenshot(`blog-listing-${name}.png`, {
          fullPage: true,
          maxDiffPixels: 100,
          timeout: 10000,
        });
      });
    });
  }
});
