# End-to-End Tests with Playwright

This directory contains comprehensive E2E tests for the Null:Expected QA blog site.

## Test Coverage

The tests cover the following high-value scenarios:

### 1. Route Loading Tests
- Verifies all key routes load correctly (`/`, `/mission`, `/about`, `/blog`, `/manifesto`, `/consulting`)
- Ensures no unexpected redirects occur
- Validates main headings are rendered on each page

### 2. Page Identity Tests
- Confirms unique content exists on each page
- Tests for distinctive strings/selectors specific to each route
- Example: `/manifesto` has "Because quality isn't accidental - and silence still speaks"

### 3. Document Title Tests (Runtime)
- Validates `page.title()` matches expected values for each route
- Tests runtime title after JavaScript hydration

### 4. HTML Source Title Tests
- Fetches raw HTML via `request.get()`
- Extracts and validates `<title>` tags from source
- Ensures proper SSR/pre-rendering of titles

### 5. Global Layout Tests
- Verifies header navigation is present on all routes
- Confirms footer appears on all pages
- Tests brand text "Null:Expected" is visible
- Validates navigation links work correctly

### 6. Console Error Tests
- Monitors for `console.error` messages
- Catches uncaught page errors
- Ensures clean console output on all routes

### 7. 404 Not Found Tests
- Validates 404 UI appears for invalid routes
- Tests 404 page has correct title
- Confirms navigation from 404 page works
- Verifies quick links are present

## Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run tests with UI
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Debug tests
```bash
npm run test:e2e:debug
```

### View test report
```bash
npm run test:e2e:report
```

## Test Configuration

Tests are configured in `playwright.config.ts`:
- Base URL: `http://127.0.0.1:4173` (Vite preview server)
- Browsers: Chromium (can be extended to Firefox, WebKit)
- Timeout: 30 seconds per test
- Retries: 1 retry on failure (2 in CI)
- Automatic web server startup before tests

## Test Structure

```
tests/e2e/
├── routes.spec.ts    # Main test file with all route tests
└── README.md         # This file
```

## Prerequisites

Before running tests:

1. Build the project:
```bash
npm run build
```

2. Install Playwright browsers (if not already installed):
```bash
npx playwright install chromium
```

## CI/CD Integration

Tests are configured to run in CI environments with:
- 2 retries on failure
- Single worker for stability
- HTML and list reporters
- Screenshots on failure
- Video recording on failure

## Adding New Tests

When adding new routes or features:

1. Add route configuration to the `routes` array in `routes.spec.ts`
2. Include unique content identifiers for the new route
3. Update expected title
4. Tests will automatically run for the new route

## Troubleshooting

### Browsers not found
Run: `npx playwright install chromium`

### Tests timing out
- Ensure the build is up to date: `npm run build`
- Check the preview server starts correctly: `npm run preview`
- Increase timeout in `playwright.config.ts` if needed

### Port already in use
- Stop other processes using port 4173
- Or change the port in both `vite.config.ts` and `playwright.config.ts`
