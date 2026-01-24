# Testing Documentation

This document describes the testing setup for the Null:Expected QA blog.

## Test Framework

The project uses **Playwright** for end-to-end testing, providing comprehensive browser automation and testing capabilities.

## Quick Start

```bash
# Install dependencies (if not already done)
npm install

# Build the project
npm run build

# Run all E2E tests
npm run test:e2e

# Run tests with interactive UI
npm run test:e2e:ui

# Run tests in headed mode (visible browser)
npm run test:e2e:headed

# Debug tests with Playwright Inspector
npm run test:e2e:debug

# View the last test report
npm run test:e2e:report
```

## Test Coverage

### What Gets Tested

#### 1. **All Key Routes Load Correctly**
- **Routes tested:** `/`, `/mission`, `/about`, `/blog`, `/manifesto`, `/consulting`
- **Validations:**
  - No unexpected redirects occur
  - URL matches expected path
  - Main heading is visible and correct

#### 2. **Unique Page Identity Content**
- Each route has specific content that only appears on that page
- Tests verify 1-3 distinctive strings per route
- Examples:
  - `/mission`: "Quality is a mindset, not a metric"
  - `/manifesto`: "Because quality isn't accidental - and silence still speaks"
  - `/about`: "far too many opinions about software quality"

#### 3. **Document Title (Runtime)**
- Tests `page.title()` after JavaScript hydration
- Ensures correct SEO titles are set dynamically
- Validates React Helmet is working properly

#### 4. **Document Title (HTML Source)**
- Fetches raw HTML via HTTP request
- Extracts `<title>` tags from source code
- Validates server-side rendering and pre-rendering

#### 5. **Global Layout Elements**
- **Header:** Present on all routes with "Null:Expected" branding
- **Footer:** Visible on all pages
- **Navigation:** Links work correctly (About, Blog, Mission, etc.)

#### 6. **No Console Errors**
- Monitors `console.error` messages
- Catches uncaught page errors
- Ensures clean execution on:
  - Homepage
  - All key routes (`/mission`, `/about`, `/blog`, `/manifesto`, `/consulting`)

#### 7. **404 Not Found Behavior**
- Tests invalid routes show 404 UI
- Verifies 404 page contains:
  - "404" heading
  - "Page Not Found" message
  - "Go Home" link (functional)
  - Quick links to main sections
- Validates navigation from 404 page works

## Test Scripts

### E2E Tests

| Script | Description |
|--------|-------------|
| `npm run test:e2e` | Run all E2E tests in headless mode |
| `npm run test:e2e:ui` | Open Playwright UI for interactive testing |
| `npm run test:e2e:headed` | Run tests with visible browser |
| `npm run test:e2e:debug` | Debug tests with Playwright Inspector |
| `npm run test:e2e:report` | View HTML report of last test run |

### Visual Regression Tests

| Script | Description |
|--------|-------------|
| `npm run test:visual` | Run visual regression tests |
| `npm run test:visual:update` | Update baseline screenshots |
| `npm run test:visual:ui` | Open Playwright UI for visual tests |

## Test File Structure

```
tests/
├── e2e/
│   ├── routes.spec.ts    # All route and page tests
│   └── README.md         # Detailed test documentation
└── visual/
    ├── visual.spec.ts    # Visual regression tests
    ├── README.md         # Visual testing documentation
    └── __screenshots__/  # Baseline screenshots (created after first run)
```

## Visual Regression Testing

Visual regression tests capture screenshots and compare them against baseline images to detect unintended visual changes.

### What Gets Tested

- **Landing page** (`/`) - Full page screenshot
- **Blog listing** (`/blog`) - Full page screenshot

Each page is tested in two viewports:
- Mobile (iPhone 12: 390x844)
- Desktop (Chrome desktop: 1280x720)

### Running Visual Tests

```bash
# First time: Generate baseline screenshots
npm run test:visual:update

# Run visual tests against baselines
npm run test:visual

# Interactive mode
npm run test:visual:ui
```

### Handling Visual Changes

**When tests fail:**
1. Review the diff in the Playwright report
2. If changes are intentional, update baselines: `npm run test:visual:update`
3. Commit the updated screenshots to git

**Note:** Visual tests are NOT part of CI/CD pipeline yet. They can be run manually or integrated later.

### Baseline Screenshots

Baseline screenshots are stored in `tests/visual/__screenshots__/` and should be committed to git. This ensures all team members test against the same visual baseline.

## Configuration

Tests are configured in `playwright.config.ts`:

- **Base URL:** `http://127.0.0.1:4173` (Vite preview server)
- **Browser:** Chromium (can be extended to Firefox, WebKit)
- **Timeout:** 30 seconds per test
- **Retries:** 1 retry on failure (2 in CI)
- **Web Server:** Automatically starts `npm run preview` before tests
- **Reports:** HTML and list formats

## Adding New Tests

When adding new routes or features:

1. Add route configuration to `routes` array in `tests/e2e/routes.spec.ts`
2. Specify expected title
3. Define unique content identifiers
4. Tests automatically run for all routes in the array

Example:
```typescript
{
  path: '/new-page',
  title: 'New Page - Null:Expected',
  heading: 'New Page Title',
  uniqueContent: ['Distinctive text only on this page', 'Another unique identifier'],
}
```

## CI/CD Integration

Tests are ready for CI/CD with:
- Environment detection via `process.env.CI`
- Increased retries in CI (2 vs 1)
- Single worker for stability
- Automatic screenshot and video capture on failure

## Troubleshooting

### Tests fail with "Browser not found"
```bash
npx playwright install chromium
```

### Tests timeout
- Ensure project is built: `npm run build`
- Check preview server: `npm run preview`
- Verify port 4173 is available

### Port already in use
Stop other processes or update ports in:
- `vite.config.ts`
- `playwright.config.ts`

## Best Practices

1. **Always build before testing:** `npm run build`
2. **Use the UI for debugging:** `npm run test:e2e:ui`
3. **Check reports after failures:** `npm run test:e2e:report`
4. **Keep tests independent:** Each test should work standalone
5. **Update unique content:** When page content changes significantly

## Test Maintenance

### When to Update Tests

- **New routes added:** Add to `routes` array
- **Page titles change:** Update expected titles
- **Unique content changes:** Update content identifiers
- **Layout changes:** Verify header/footer tests still pass
- **404 page redesign:** Update 404 test expectations

### Monitoring Test Health

Run tests regularly during development:
```bash
# Quick check
npm run test:e2e

# Detailed check with UI
npm run test:e2e:ui
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Test Configuration Reference](https://playwright.dev/docs/test-configuration)
