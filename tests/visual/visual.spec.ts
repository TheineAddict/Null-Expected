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

        await page.waitForSelector('article', {
          timeout: 15000,
          state: 'visible'
        });

        await page.waitForFunction(() => {
          const loadingText = document.body.textContent?.includes('Loading featured posts');
          return !loadingText;
        }, { timeout: 10000 });

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

        await page.waitForSelector('article', {
          timeout: 15000,
          state: 'visible'
        });

        await page.waitForFunction(() => {
          const loadingText = document.body.textContent?.includes('Loading posts');
          return !loadingText;
        }, { timeout: 10000 });

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
