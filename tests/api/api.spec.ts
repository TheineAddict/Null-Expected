import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:5173';

test.describe('API and Data Loading Tests', () => {
  test('should load job radar data successfully', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/null-expected-job-radar-app/data/jobs.json`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test('should load job radar metadata successfully', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/null-expected-job-radar-app/data/meta.json`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('lastUpdate');
  });

  test('should handle non-existent endpoints gracefully', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/non-existent-endpoint`);
    expect(response.status()).toBe(404);
  });

  test('should serve static assets correctly', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/favicon.svg`);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('image/svg');
  });
});
