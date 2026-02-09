import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:5173';

test.describe('Static Assets and Resources', () => {
  test('should serve favicon correctly', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/favicon.svg`);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('image/svg');
  });

  test('should serve robots.txt', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/robots.txt`);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('text/plain');
  });

  test('should serve apple touch icon', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/apple-touch-icon.png`);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('should serve manifest file', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/site.webmanifest`);
    expect(response.ok()).toBeTruthy();
    const manifest = await response.json();
    expect(manifest).toHaveProperty('name');
  });
});
