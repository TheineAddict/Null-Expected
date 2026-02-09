# API Tests

This directory contains API-level tests using Playwright's request context.

## Test Files

- `api.spec.ts` - Tests for API endpoints and data loading

## Running API Tests

```bash
# Run all API tests
npm run test:e2e -- tests/api

# Run API tests in headed mode
npm run test:e2e:headed -- tests/api

# Run API tests in debug mode
npm run test:e2e:debug -- tests/api

# Run API tests in UI mode
npm run test:e2e:ui -- tests/api
```

## What These Tests Cover

- Job Radar data endpoint availability
- Metadata endpoint functionality
- Error handling for non-existent endpoints
- Static asset serving
