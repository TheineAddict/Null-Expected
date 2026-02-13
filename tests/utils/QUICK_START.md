# Self-Healing Locators - Quick Start

## Import the helpers

```typescript
import { findHeader, findFooter, findLink, findHeading, findButton } from '../utils/locators';
```

## Use in tests

```typescript
// Find header (tries role='banner', then 'header' CSS)
const header = await findHeader(page);
await expect(header).toBeVisible();

// Find footer (tries role='contentinfo', then 'footer' CSS)
const footer = await findFooter(page);
await expect(footer).toBeVisible();

// Find heading by text (tries role, text, then h1-h6)
const heading = await findHeading(page, 'Welcome');
await expect(heading).toBeVisible();

// Find link by text (tries role, text, then 'a' CSS)
const link = await findLink(page, /click here/i);
await link.click();

// Find button (tries role, text, then 'button' CSS)
const button = await findButton(page, 'Submit');
await button.click();
```

## See full documentation

For complete guide, see: `tests/utils/README.md`
For implementation summary, see: `tests/SELF_HEALING_LOCATORS.md`
