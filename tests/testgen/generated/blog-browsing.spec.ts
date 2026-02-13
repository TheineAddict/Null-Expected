import { test, expect } from '@playwright/test';
import { findLink, findButton, findHeading } from '../../utils/locators';

test.describe('Browse Blog Listing and Open a Post', () => {
  test('Browse Blog Listing and Open a Post', async ({ page }) => {
    // Given the user is on the home page
    await page.goto('/');
    // When the user clicks on the "Blog" navigation link
    const blogLink2 = await findLink(page, /blog/i);
    await blogLink2.click();
    await page.waitForURL(/\/blog/);
    // Then the blog listing page should be displayed
    await expect(page).toHaveURL(/\/blog/);
    const blogHeading3 = await findHeading(page, /blog|posts/i);
    await expect(blogHeading3).toBeVisible();
    // When the user clicks on the first blog post
    const firstPost4 = page.locator('main article a, main [class*="post"] a').first();
    await firstPost4.click();
    await page.waitForLoadState('networkidle');
    // Then the blog post page should be displayed
    await expect(page).toHaveURL(/\/blog\/.+/);
    // And the post should have a title
    const postTitle6 = page.locator('h1');
    await expect(postTitle6).toBeVisible();
    await expect(postTitle6).not.toBeEmpty();
    // And the post should have content
    const postContent7 = page.locator('article, main');
    await expect(postContent7).toBeVisible();
  });
});