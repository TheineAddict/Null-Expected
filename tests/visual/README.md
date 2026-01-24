# Visual Regression Tests

Visual regression testing for key pages using Playwright's screenshot comparison.

## What's Tested

- **Landing page** (`/`) - Full page screenshot
- **Blog listing** (`/blog`) - Full page screenshot

Each page is tested in two viewports:
- Mobile (iPhone 12)
- Desktop (Chrome desktop)

## Running Visual Tests

### Run visual tests
```bash
npm run test:visual
```

### Generate/update baseline snapshots
When running for the first time or when intentional visual changes are made:
```bash
npm run test:visual:update
```

### Run with UI mode (interactive)
```bash
npm run test:visual:ui
```

## Snapshot Location

Baseline screenshots are stored in:
```
tests/visual/__screenshots__/
```

## How It Works

1. Tests navigate to each page and wait for network idle
2. Full page screenshots are captured
3. Screenshots are compared against baseline images
4. Tests fail if visual differences exceed threshold (100 pixels)

## Handling Changes

### Intentional Changes
If you've made intentional design changes:
1. Review the visual diff in the test report
2. If changes are correct, update snapshots: `npm run test:visual:update`
3. Commit the new baseline screenshots

### Unintentional Changes
If tests fail unexpectedly:
1. Review the diff in the Playwright report
2. Investigate what caused the visual change
3. Fix the issue and re-run tests

## Notes

- Visual tests are NOT part of CI/CD pipeline yet
- Tests use `maxDiffPixels: 100` for slight anti-aliasing tolerance
- Dynamic content (dates, post counts) are generally stable and don't require masking
- Full page screenshots ensure footer and all content is captured
