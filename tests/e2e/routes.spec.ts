import { test, expect } from '@playwright/test';

const routes = [
  {
    path: '/',
    title: 'Null:Expected - A QA Thought Hub by Andreea Vitan',
    heading: 'Null:Expected',
    uniqueContent: ['A QA thought hub. What did you expect?', 'Testing and release management for grown-up software'],
  },
  {
    path: '/mission',
    title: 'Our Mission - Null:Expected QA Thought Hub',
    heading: 'Our Mission',
    uniqueContent: ['unpack the trade-offs of "done,"', 'Quality is a mindset, not a metric'],
  },
  {
    path: '/about',
    title: 'About Us - Null:Expected QA Professionals',
    heading: 'About Us',
    uniqueContent: ['far too many opinions about software quality', 'Published Works'],
  },
  {
    path: '/blog',
    title: 'Blog - Quality Insights | Null:Expected',
    heading: 'Blog',
    uniqueContent: ['Filter by category', 'Latest posts from the QA community'],
  },
  {
    path: '/manifesto',
    title: 'QA Manifesto - Null:Expected Quality Principles',
    heading: 'The Null:Expected Manifesto',
    uniqueContent: ['Because quality isn\'t accidental - and silence still speaks', 'Intention over output'],
  },
  {
    path: '/consulting',
    title: 'QA Consulting Services - Null:Expected Quality Transformation',
    heading: 'QA Consulting Services',
    uniqueContent: ['Transform your quality assurance and release management practices', 'Strategic Assessment'],
  },
];

test.describe('Route Loading and Navigation', () => {
  for (const route of routes) {
    test(`${route.path} - loads correctly with no redirects`, async ({ page }) => {
      await page.goto(route.path);

      expect(page.url()).toBe(`http://127.0.0.1:4173${route.path}`);

      const mainHeading = page.locator('h1').first();
      await expect(mainHeading).toBeVisible();
      await expect(mainHeading).toContainText(route.heading);
    });

    test(`${route.path} - has correct runtime title`, async ({ page }) => {
      await page.goto(route.path);

      await expect(page).toHaveTitle(route.title);
    });

    test(`${route.path} - has correct title in HTML source`, async ({ page, request }) => {
      const response = await request.get(route.path);
      const html = await response.text();

      expect(html).toContain(`<title>${route.title}</title>`);
    });

    test(`${route.path} - contains unique page identity content`, async ({ page }) => {
      await page.goto(route.path);

      for (const content of route.uniqueContent) {
        await expect(page.locator('body')).toContainText(content);
      }
    });
  }
});

test.describe('Global Layout Elements', () => {
  test('Header is present on all routes', async ({ page }) => {
    for (const route of routes) {
      await page.goto(route.path);

      const header = page.locator('header');
      await expect(header).toBeVisible();

      await expect(header).toContainText('Null:Expected');
    }
  });

  test('Footer is present on all routes', async ({ page }) => {
    for (const route of routes) {
      await page.goto(route.path);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    }
  });

  test('Navigation links work correctly', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    await expect(header.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Mission' })).toBeVisible();
  });
});

test.describe('Console Errors', () => {
  test('No console errors on homepage', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (error) => {
      consoleErrors.push(error.message);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(consoleErrors).toHaveLength(0);
  });

  test('No console errors on key routes', async ({ page }) => {
    const testRoutes = ['/mission', '/about', '/blog', '/manifesto', '/consulting'];

    for (const route of testRoutes) {
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', (error) => {
        consoleErrors.push(error.message);
      });

      await page.goto(route);
      await page.waitForLoadState('networkidle');

      expect(consoleErrors, `Route ${route} should have no console errors`).toHaveLength(0);
    }
  });
});

test.describe('404 Not Found Page', () => {
  test('Shows 404 UI for invalid route', async ({ page }) => {
    await page.goto('/this-should-404');

    await expect(page.locator('h1')).toContainText('404');

    await expect(page.locator('body')).toContainText('Page Not Found');

    const homeLink = page.getByRole('link', { name: /go home/i });
    await expect(homeLink).toBeVisible();
  });

  test('404 page has correct title', async ({ page }) => {
    await page.goto('/non-existent-page');

    await expect(page).toHaveTitle(/404.*Not Found/i);
  });

  test('404 page navigation works', async ({ page }) => {
    await page.goto('/invalid-route');

    await page.getByRole('link', { name: /go home/i }).click();

    await expect(page).toHaveURL('http://127.0.0.1:4173/');
    await expect(page.locator('h1')).toContainText('Null:Expected');
  });

  test('404 page has quick links', async ({ page }) => {
    await page.goto('/does-not-exist');

    await expect(page.getByRole('link', { name: /^Blog$/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^About$/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^Mission$/i })).toBeVisible();
  });
});
