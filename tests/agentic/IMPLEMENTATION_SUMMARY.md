# Agentic Exploratory Testing - Implementation Summary

## Overview

A deterministic exploratory QA runner that automatically navigates the site, discovers issues, and generates detailed reports with evidence.

## What Was Implemented

### 1. Core Runner (`exploratory-runner.ts`)

**Features:**
- Automatic site navigation starting from home page
- Link discovery from nav, header, and main content
- Blog-specific flows (posts, filters, tags)
- Deterministic exploration with visited set, maxPages, and maxDepth
- Real-time issue detection and evidence collection
- Screenshot capture for all issues
- Markdown report generation

**Evidence Collection:**
- Console errors
- Page errors (unhandled exceptions)
- Failed network requests (status >= 400)
- Broken navigations (404s, timeouts)
- Missing h1 elements
- Empty or missing titles

### 2. Configuration

**Environment Variables:**
- `BASE_URL` - Base URL to explore (default: http://127.0.0.1:5173)
- `MAX_PAGES` - Maximum pages to explore (default: 25)
- `MAX_DEPTH` - Maximum depth from home (default: 3)

**Examples:**
```bash
# Default configuration
npm run test:explore

# Custom configuration
BASE_URL=http://localhost:4173 MAX_PAGES=50 npm run test:explore
```

### 3. Exploration Strategy

**Deterministic Behavior:**
- Visited set prevents loops
- Breadth-first traversal for predictable order
- Max pages limits total exploration
- Max depth prevents infinite depth

**Discovery Flow:**
1. Start at home (/)
2. Discover links from nav, header, main
3. Navigate to blog and find posts
4. Apply filters and reset them
5. Follow tag pages when found
6. Continue until limits reached

**Link Prioritization:**
- Navigation links (nav, header)
- Main content links (limited to 10 per page)
- Blog posts (automatically detected)
- Tag pages (followed when found)

### 4. Output Structure

```
tests/agentic/
├── .gitignore              # Ignore artifacts and reports
├── README.md               # Full documentation
├── IMPLEMENTATION_SUMMARY.md  # This file
├── exploratory-runner.ts   # Main runner script
├── artifacts/              # Screenshots organized by timestamp
│   ├── .gitkeep
│   └── YYYY-MM-DDTHH-MM-SS/
│       ├── screenshot-1.png
│       └── screenshot-2.png
└── reports/                # Markdown reports
    ├── .gitkeep
    └── YYYY-MM-DDTHH-MM-SS-exploratory-report.md
```

### 5. Report Format

**Sections:**
- Summary: Total issues, pages explored, issues by type
- Issues Found: Detailed list with URLs, descriptions, screenshots, timestamps
- Pages Visited: Complete alphabetically sorted list

**Example:**
```markdown
# Exploratory Testing Report

**Generated:** 2026-02-13T10:30:00.000Z
**Base URL:** http://127.0.0.1:5173
**Pages Explored:** 25/25
**Max Depth:** 3

## Summary

- Total Issues Found: **0**
- Pages Visited: **25**

## Results

✅ No issues found! All pages passed basic checks.
```

### 6. NPM Script

Added to `package.json`:
```json
"test:explore": "tsx tests/agentic/exploratory-runner.ts"
```

## Usage Examples

### Basic Usage

```bash
# Run with defaults (25 pages, depth 3, local dev server)
npm run test:explore
```

### Custom Configuration

```bash
# Test with CI server
BASE_URL=http://localhost:4173 npm run test:explore

# Quick smoke test (5 pages, depth 2)
MAX_PAGES=5 MAX_DEPTH=2 npm run test:explore

# Deep exploration (50 pages, depth 4)
MAX_PAGES=50 MAX_DEPTH=4 npm run test:explore
```

### CI/CD Integration

```yaml
- name: Run Exploratory Tests
  run: |
    BASE_URL=http://localhost:4173 npm run test:explore
  continue-on-error: true  # Optional, don't block deployments
```

## Technical Implementation Details

### Browser Automation

- Uses Playwright's Chromium in headless mode
- Automatic event listeners for console and page errors
- Response interceptor for network failures
- Full-page screenshots for all issues

### Issue Detection

**Console Errors:**
```typescript
page.on('console', (msg) => {
  if (msg.type() === 'error') {
    // Record issue with screenshot
  }
});
```

**Page Errors:**
```typescript
page.on('pageerror', (error) => {
  // Record unhandled exception
});
```

**Network Failures:**
```typescript
page.on('response', (response) => {
  if (response.status() >= 400) {
    // Record failed request
  }
});
```

**Basic Checks:**
```typescript
// Check for h1
const h1Count = await page.locator('h1').count();
if (h1Count === 0) {
  // Record missing h1
}

// Check for title
const title = await page.title();
if (!title || title.trim() === '') {
  // Record empty title
}
```

### Link Discovery

```typescript
// Navigation links
const navLinks = await page.locator('nav a, header a').evaluateAll(...);

// Main content links
const mainLinks = await page.locator('main a').evaluateAll(...);

// Filter to internal links only
const internal = links.filter(link => {
  return new URL(link).origin === baseOrigin;
});
```

### Blog-Specific Flows

**Find Blog Posts:**
```typescript
const postLinks = await page.locator(
  'main article a, main .post a, main [class*="post"] a'
).all();
```

**Apply Filters:**
```typescript
const filterButtons = await page.locator(
  'button:has-text("Filter"), button:has-text("Category")'
).all();
```

**Follow Tag Links:**
```typescript
const tagLinks = await page.locator(
  'a[href*="/blog/tag/"], a[href*="tag="]'
).all();
```

## Design Decisions

### Why Deterministic?

- **Reproducibility**: Same configuration produces same results
- **Debugging**: Easy to narrow down issues
- **CI/CD**: Predictable runtime and behavior
- **Testing**: Can verify the runner itself

### Why Breadth-First?

- Explores widely before deeply
- Finds issues on many pages quickly
- Better for smoke testing
- More predictable page count

### Why Screenshot Every Issue?

- Visual evidence helps debugging
- Shows exact state when issue occurred
- Useful for non-technical stakeholders
- Archives historical issues

### Why Markdown Reports?

- Human-readable in any text editor
- Version control friendly
- Easy to share and review
- Can be rendered in CI/CD dashboards

## Compliance

### ✓ Hard Constraints Met

- **No app content changes**: Only adds tests
- **No database**: Pure browser automation
- **No paid services**: Uses open-source Playwright
- **NPM only**: No Docker, Ollama, or binaries
- **Optional**: Doesn't block deployments
- **Preserves existing tests**: e2e, visual, api unchanged
- **BaseURL behavior**: 5173 local, 4173 CI

### ✓ Acceptance Criteria

- `npm run test:explore` works locally
- Generates markdown reports
- Saves screenshots to artifacts/
- No secrets required
- No src/ modifications

## Future Enhancements

### Possible Additions

1. **Custom Checks**: Add domain-specific validations
2. **Performance Metrics**: Track page load times
3. **Accessibility Scanning**: Add a11y checks
4. **Link Validation**: Check for broken external links
5. **Content Validation**: Verify specific text or elements
6. **API Testing**: Call backend endpoints during exploration
7. **Mobile Viewport**: Test responsive behavior
8. **Multiple Browsers**: Test Firefox, Safari

### Extension Points

**Add Custom Issue Types:**
```typescript
// In performBasicChecks()
const hasFooter = await page.locator('footer').count();
if (hasFooter === 0) {
  this.recordIssue({
    type: 'missing-footer',
    url: page.url(),
    description: 'Page is missing a footer',
    timestamp: new Date().toISOString(),
  });
}
```

**Add Custom Flows:**
```typescript
// In explore()
if (currentURL.includes('/products')) {
  await this.exploreProducts();
}
```

**Add Custom Link Discovery:**
```typescript
// In discoverLinks()
const customLinks = await page.locator('.special-nav a').all();
```

## Troubleshooting

### Common Issues

**"Browser not found"**
```bash
npx playwright install chromium
```

**"Connection refused"**
- Ensure dev/preview server is running
- Check BASE_URL configuration

**"Too many screenshots"**
- Reduce MAX_PAGES
- Increase MAX_DEPTH (explore fewer pages more deeply)

**"Missing pages in report"**
- Check MAX_DEPTH (some pages may be too deep)
- Check visited set (pages may be duplicates)

**"Timeouts"**
- Increase timeout in navigateToPage()
- Reduce MAX_PAGES
- Check network connectivity

## Files Modified

### New Files
- `tests/agentic/exploratory-runner.ts` - Main runner
- `tests/agentic/README.md` - Documentation
- `tests/agentic/IMPLEMENTATION_SUMMARY.md` - This file
- `tests/agentic/.gitignore` - Ignore artifacts/reports
- `tests/agentic/artifacts/.gitkeep` - Keep directory
- `tests/agentic/reports/.gitkeep` - Keep directory

### Modified Files
- `package.json` - Added "test:explore" script

### No Changes To
- `src/**` - No app content modified
- `tests/e2e/**` - Existing e2e tests unchanged
- `tests/visual/**` - Visual tests unchanged
- `tests/api/**` - API tests unchanged
- `.github/**` - No CI modifications (yet)

## Testing the Implementation

### Verify Installation

```bash
# Install Playwright browsers if needed
npx playwright install chromium

# Run with dev server
npm run dev &
sleep 5
npm run test:explore
```

### Verify Reports

```bash
# Check reports were generated
ls -la tests/agentic/reports/

# View latest report
cat tests/agentic/reports/*.md | tail -50
```

### Verify Artifacts

```bash
# Check screenshots were saved
ls -la tests/agentic/artifacts/

# Count screenshots
find tests/agentic/artifacts -name "*.png" | wc -l
```

## Summary

The agentic exploratory testing runner provides:
- ✅ Automated site exploration
- ✅ Deterministic behavior
- ✅ Evidence collection
- ✅ Detailed reporting
- ✅ Screenshot artifacts
- ✅ Blog-specific flows
- ✅ No external dependencies
- ✅ Optional, non-blocking
- ✅ Easy to extend

Perfect for smoke testing, regression detection, and continuous monitoring.
