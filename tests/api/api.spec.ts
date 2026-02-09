import { test, expect } from '@playwright/test';

test.describe('Static Assets and Resources', () => {
  test('should serve favicon correctly', async ({ request }) => {
    const response = await request.get('/favicon.svg');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('image/svg');
  });

  test('should serve robots.txt', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('text/plain');
  });

  test('should serve apple touch icon', async ({ request }) => {
    const response = await request.get('/apple-touch-icon.png');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('should serve manifest file', async ({ request }) => {
    const response = await request.get('/site.webmanifest');
    expect(response.ok()).toBeTruthy();
    const manifest = await response.json();
    expect(manifest).toHaveProperty('name');
  });
});
