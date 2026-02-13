# Test Utilities

This directory contains shared utilities for Playwright tests.

## Self-Healing Locators

The self-healing locator strategy helps tests remain stable even when the DOM structure changes. Instead of relying on a single locator strategy, these helpers try multiple approaches in order of preference.

### Strategy

The locator system attempts strategies in this order:

1. **Semantic (Role-based)**: `getByRole()` with accessible name - Most resilient, follows ARIA/accessibility standards
2. **Test ID**: `getByTestId()` - Explicit test hooks (requires data-testid attributes)
3. **Text Content**: `getByText()` - Finds elements by visible text
4. **CSS Selector**: `locator()` - Traditional CSS selectors as last resort

If a primary strategy fails (element not found), the system automatically tries the next fallback and logs which strategy was used. This makes tests self-healing when minor DOM changes occur.

### Usage

#### Basic Helpers

```typescript
import { findHeading, findLink, findButton, findHeader, findFooter } from './utils/locators';

// Find heading by text (tries role, text, then h1-h6 selectors)
const heading = await findHeading(page, 'Welcome');
await expect(heading).toBeVisible();

// Find link by name (tries role, text, then 'a' selector)
const link = await findLink(page, 'About');
await link.click();

// Find button (tries role, text, then 'button' selector)
const button = await findButton(page, /submit/i);
await button.click();

// Find header (tries role='banner', then 'header' selector)
const header = await findHeader(page);
await expect(header).toContainText('Site Name');

// Find footer (tries role='contentinfo', then 'footer' selector)
const footer = await findFooter(page);
await expect(footer).toBeVisible();
```

#### Advanced: Custom Strategies

```typescript
import { findElement } from './utils/locators';

// Define multiple fallback strategies
const element = await findElement(page, {
  role: 'button',
  name: 'Submit',
  testId: 'submit-btn',
  text: 'Submit',
  css: '.submit-button',
});
```

### Logging

When a fallback strategy is used, the helper logs to console:

```
[Self-Healing Locator] Primary strategy failed, used fallback: getByText('About')
```

This helps identify when locators are becoming fragile and need updates.

### Error Messages

If all strategies fail, a detailed error is thrown:

```
[Self-Healing Locator] All locator strategies failed after 5000ms.
Attempted strategies: getByRole('link', name: 'About'), getByText('About'), locator('a')
Current URL: http://localhost:4173/
Suggestion: Verify the element exists and update the locator strategies.
```

### Benefits

1. **Resilience**: Tests survive minor DOM structure changes
2. **Visibility**: Logs show when fallbacks are triggered
3. **Best Practices**: Encourages semantic/accessible locators first
4. **Clear Failures**: When tests fail, error messages explain what was tried
5. **Gradual Migration**: Can be adopted incrementally alongside existing locators

### When to Use

- Use for critical user journeys that must remain stable
- Use for elements that may change implementation but keep the same purpose
- Use when writing new tests to make them more maintainable

### When NOT to Use

- Don't use for elements that genuinely shouldn't exist (negative assertions)
- Don't use if you need very specific DOM structure validation
- Don't over-engineer simple tests that already work well

### Migration Example

Before:
```typescript
const header = page.locator('header');
await expect(header).toBeVisible();
```

After:
```typescript
const header = await findHeader(page);
await expect(header).toBeVisible();
```

The self-healing version will work even if someone changes the HTML from `<header>` to `<div role="banner">`.
