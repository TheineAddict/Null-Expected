# Job Radar App - Hidden Page Documentation

## Overview

A hidden, self-contained job listing application at `/null-expected-job-radar-app` that fetches job data from a static JSON file. The page is isolated from the main Null Expected site.

## URL

**Production:** `https://www.nullexpected.com/null-expected-job-radar-app`
**Local:** `http://localhost:5173/null-expected-job-radar-app`

## Architecture

```
src/apps/job-radar/           # Self-contained app folder
├── JobRadarApp.tsx           # Main app component
├── types.ts                  # TypeScript interfaces
└── README.md                 # Detailed app documentation

src/pages/JobRadarApp.tsx     # Page wrapper with SEO meta tags

public/null-expected-job-radar-app/data/
└── jobs.json                 # Job snapshot data (auto-copied to dist/)
```

## Features

### Job Radar UI
- **Snapshot Info Panel**: Displays last updated timestamp and total job count
- **Job Listings**: Shows title, company, and apply button for each job
- **Client-Side Search**: Filter jobs in real-time by title or company name
- **Empty States**:
  - "No snapshot found yet. Run ingestion." (when JSON is missing/invalid)
  - "No jobs in snapshot. Run ingestion to populate." (when jobs array is empty)
  - "No jobs match your search." (when search returns no results)
- **Responsive Design**: Works on mobile and desktop

### Complete Isolation
- **No Header/Footer**: The page renders without the Null Expected header and footer
- **No Navigation Links**: Not linked from anywhere on the site
- **Self-Contained**: All app code lives in `src/apps/job-radar/`
- **No Database**: Uses static JSON file, no runtime writes

### SEO Protection
- **Robots Meta Tags**: `noindex, nofollow` prevents search engine indexing
- **Robots.txt**: Explicitly disallows crawling of this path
- **Sitemap Exclusion**: Not included in sitemap.xml
- **Build Exclusion**: Not prerendered during build process

## Data Contract

The app fetches data from: `/null-expected-job-radar-app/data/jobs.json`

### Schema

```typescript
{
  schemaVersion: number;      // Version of the data schema
  updatedAt: string;          // ISO 8601 timestamp
  jobs: Array<{
    title: string;            // Job title
    company: string;          // Company name
    canonicalUrl: string;     // URL to apply
  }>;
}
```

### Example

```json
{
  "schemaVersion": 1,
  "updatedAt": "2026-02-04T12:00:00.000Z",
  "jobs": [
    {
      "title": "Senior QA Engineer",
      "company": "Example Corp",
      "canonicalUrl": "https://example.com/jobs/senior-qa"
    },
    {
      "title": "Test Automation Engineer",
      "company": "Tech Innovations",
      "canonicalUrl": "https://example.com/jobs/automation"
    }
  ]
}
```

## Updating Job Data

To update the job listings:

1. Edit the source file:
   ```bash
   public/null-expected-job-radar-app/data/jobs.json
   ```

2. Update the `updatedAt` timestamp to current time (ISO 8601 format)

3. Add/modify/remove jobs in the `jobs` array

4. Deploy - the file is automatically copied to `dist/` during build

### Placeholder Data

A placeholder snapshot with sample jobs is included. Replace with real data when ready.

## Implementation Details

### Files Created

1. **`src/apps/job-radar/JobRadarApp.tsx`** - Main app component with all UI logic
2. **`src/apps/job-radar/types.ts`** - TypeScript interfaces for type safety
3. **`src/apps/job-radar/README.md`** - Detailed app documentation
4. **`public/null-expected-job-radar-app/data/jobs.json`** - Job snapshot data

### Files Modified

1. **`src/pages/JobRadarApp.tsx`** - Page wrapper that imports the app component
2. **`src/App.tsx`** - Route registration and conditional header/footer hiding
3. **`public/robots.txt`** - Added disallow rule for this path
4. **`scripts/prerender-pages.ts`** - Excluded from prerendering
5. **`scripts/build-blog.mjs`** - Excluded from sitemap

## Testing

### Development
```bash
npm run dev
# Visit: http://localhost:5173/null-expected-job-radar-app
```

### Production Build
```bash
npm run build
npm run preview
# Visit: http://localhost:4173/null-expected-job-radar-app
```

### Test Cases

1. **Empty snapshot**: Delete or rename `jobs.json` to see empty state
2. **No jobs**: Set `jobs: []` in JSON to see "no jobs" message
3. **Search**: With sample data, search for "QA" or "Tech" to filter
4. **Date display**: Set `updatedAt` to valid ISO date to see formatted timestamp

## Security & Privacy

- The page is public and accessible to anyone with the URL
- No authentication or access control implemented
- No sensitive data - all job data is public
- No database or server-side processing
- No external API calls or paid services

## Next Steps

This is a minimal viable implementation. To enhance:

1. **Ingestion Pipeline**: Build a separate script/service to populate `jobs.json`
2. **More Fields**: Add location, salary, tags, description, etc. to job schema
3. **Filtering**: Add filters for location, job type, etc.
4. **Sorting**: Add sort by date, company, etc.
5. **Pagination**: If job list grows large
6. **Analytics**: Track which jobs are viewed/clicked
