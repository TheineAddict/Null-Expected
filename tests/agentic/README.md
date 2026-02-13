# Agentic Exploratory Testing

Automated exploratory testing that discovers and validates pages across the site.

## Overview

The exploratory runner automatically:
- Navigates from the home page
- Discovers links in navigation and main content
- Opens blog posts from listings
- Applies tag filters and resets them
- Follows tag pages when found
- Collects evidence of issues
- Generates detailed reports with screenshots

## Usage

### Run Exploratory Tests

```bash
npm run test:explore
```

### Configuration

Configure via environment variables:

```bash
# Set base URL (default: http://127.0.0.1:5173)
BASE_URL=http://localhost:4173 npm run test:explore

# Set maximum pages to explore (default: 25)
MAX_PAGES=50 npm run test:explore

# Set maximum depth (default: 3)
MAX_DEPTH=4 npm run test:explore

# Combine options
BASE_URL=http://localhost:4173 MAX_PAGES=50 npm run test:explore
```

## Exploration Strategy

### Deterministic Behavior

The runner uses:
- **Visited Set**: Prevents revisiting pages
- **Max Pages**: Limits total pages explored (default: 25)
- **Max Depth**: Limits how deep to navigate from home (default: 3)
- **Queue**: Breadth-first traversal for predictable exploration

### Discovery Flow

1. **Start at home page** (`/`)
2. **Discover links** from `nav`, `header`, and `main` elements
3. **Navigate to blog** and find blog posts
4. **Apply filters** (if on blog page)
5. **Reset filters** after testing
6. **Follow tag links** when found
7. **Continue breadth-first** until max pages or max depth reached

### Link Discovery

Links are discovered from:
- `nav a` - Navigation links
- `header a` - Header links
- `main a` - Main content links (limited to 10 per page)

Only internal links (same origin) are followed.

## Evidence Collection

### Issues Detected

The runner automatically detects:

1. **Console Errors**: JavaScript errors logged to console
2. **Page Errors**: Unhandled exceptions and runtime errors
3. **Network Failures**: Failed requests (status >= 400)
4. **Navigation Failures**: Pages that fail to load or return 404
5. **Missing H1**: Pages without an h1 element
6. **Empty Title**: Pages with missing or empty title tags

### Artifacts

For each issue found:
- **Screenshot**: Full-page screenshot saved to artifacts directory
- **URL**: The page where the issue occurred
- **Description**: Details about the issue
- **Timestamp**: When the issue was detected

### Output Structure

```
tests/agentic/
├── artifacts/
│   └── 2026-02-13T10-30-00/
│       ├── screenshot-1.png
│       ├── screenshot-2.png
│       └── ...
└── reports/
    └── 2026-02-13T10-30-00-exploratory-report.md
```

## Report Format

The generated markdown report includes:

### Summary Section
- Total issues found
- Pages explored
- Issues grouped by type

### Issues Section
- Detailed list of each issue
- URL where it occurred
- Screenshot link
- Timestamp

### Pages Visited Section
- Complete list of all pages explored
- Sorted alphabetically

## Example Report

```markdown
# Exploratory Testing Report

**Generated:** 2026-02-13T10:30:00.000Z
**Base URL:** http://127.0.0.1:5173
**Pages Explored:** 25/25
**Max Depth:** 3

## Summary

- Total Issues Found: **0**
- Pages Visited: **25**

### Issues by Type

(No issues found)

## Results

✅ No issues found! All pages passed basic checks.

## Pages Visited

- /
- /about
- /blog
- /blog/post-1
- /consulting
- /manifesto
- /mission
...
```

## CI/CD Integration

This test suite is **optional** and does not block deployments.

To integrate in CI:

```yaml
- name: Run Exploratory Tests
  run: npm run test:explore
  continue-on-error: true  # Don't block deployments
```

The runner will:
- Use the preview server (port 4173) in CI
- Use the dev server (port 5173) locally
- Generate timestamped reports and artifacts
- Exit cleanly with status code

## Limitations

### What It Tests
- Page loading and navigation
- Basic page structure (h1, title)
- Console and page errors
- Network request failures

### What It Doesn't Test
- Visual appearance (use visual tests)
- API contracts (use API tests)
- Complex user interactions
- Authentication flows
- Form submissions

## Tips

### Focus on Specific Areas

Explore fewer pages with more depth:
```bash
MAX_PAGES=10 MAX_DEPTH=5 npm run test:explore
```

### Quick Smoke Test

Explore more pages with less depth:
```bash
MAX_PAGES=50 MAX_DEPTH=2 npm run test:explore
```

### Test Specific Environments

```bash
# Test staging
BASE_URL=https://staging.example.com npm run test:explore

# Test production (read-only, no writes)
BASE_URL=https://example.com npm run test:explore
```

## Maintenance

### Adding Custom Checks

Edit `exploratory-runner.ts` and add checks to `performBasicChecks()`:

```typescript
private async performBasicChecks(): Promise<void> {
  // Existing checks...

  // Add your custom check
  const hasFooter = await this.page!.locator('footer').count();
  if (hasFooter === 0) {
    this.recordIssue({
      type: 'missing-footer',
      url: this.page!.url(),
      description: 'Page is missing a footer',
      timestamp: new Date().toISOString(),
    });
  }
}
```

### Adjusting Discovery

Modify `discoverLinks()` to change link discovery behavior.

### Custom Exploration Flows

Add domain-specific flows to `explore()` method (similar to blog post and filter exploration).

## Troubleshooting

### Runner times out

Increase timeout or reduce max pages:
```bash
MAX_PAGES=10 npm run test:explore
```

### Too many screenshots

Reduce max pages or increase depth to visit fewer unique pages.

### Missing pages in report

Check max depth setting - some pages might be deeper than the limit.

### Browser launch fails

Ensure Playwright browsers are installed:
```bash
npx playwright install chromium
```
