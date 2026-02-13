import { test, expect } from '@playwright/test';
import { findLink, findButton, findHeading } from '../../utils/locators';

test.describe('Filter Blog Posts by Tag', () => {
  test('Filter Blog Posts by Tag', async ({ page }) => {
    // Given the user is on the blog listing page
    await page.goto('/blog');
    // When the user clicks on a tag filter
    const tagButton2 = page.locator('button[class*="tag"], a[class*="tag"]').first();
    await tagButton2.click();
    await page.waitForTimeout(500);
    // Then the blog listing should update to show only posts with that tag
    await page.waitForTimeout(300);
    const posts3 = page.locator('article, [class*="post"]');
    await expect(posts3.first()).toBeVisible();
    // And the filter should be visually indicated as active
    const activeFilter4 = page.locator('[class*="active"], [aria-pressed="true"]');
    await expect(activeFilter4).toBeVisible();
    // When the user clicks on the reset or clear filters button
    const resetButton5 = await findButton(page, /reset|clear|all/i);
    await resetButton5.click();
    await page.waitForTimeout(500);
    // Then the blog listing should show all posts again
    const posts6 = page.locator('article, [class*="post"]');
    const postCount6 = await posts6.count();
    expect(postCount6).toBeGreaterThan(0);
    // And no filters should be active
    const activeFilters7 = page.locator('[class*="active"], [aria-pressed="true"]');
    const count7 = await activeFilters7.count();
    expect(count7).toBe(0);
  });
});