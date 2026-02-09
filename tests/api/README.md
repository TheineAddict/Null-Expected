# API Tests

This directory contains API-level tests using Playwright's request context.

## Test Files

- `api.spec.ts` - Tests for static assets and resources

## Running API Tests

```bash
# Run all API tests
npx playwright test --project=api

# Run API tests in UI mode
npx playwright test --project=api --ui

# Run API tests in debug mode
npx playwright test --project=api --debug
```

## What These Tests Cover

- Static asset serving (favicon, robots.txt, apple-touch-icon, site.webmanifest)
- Correct content-type headers for various file types
- Resource availability and proper HTTP responses
- Progressive web app manifest validation
