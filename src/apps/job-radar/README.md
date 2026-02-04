# Job Radar App

A self-contained job listing application accessible at `/null-expected-job-radar-app`.

## Architecture

```
src/apps/job-radar/
├── JobRadarApp.tsx    # Main app component
├── types.ts           # TypeScript interfaces
└── README.md          # This file

public/null-expected-job-radar-app/data/
└── jobs.json          # Job snapshot data
```

## Data Contract

The app fetches job data from `/null-expected-job-radar-app/data/jobs.json`.

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
    }
  ]
}
```

## Features

- **Snapshot Info Panel**: Displays last updated time and total job count
- **Job Listings**: Shows title, company, and apply button for each job
- **Client-Side Search**: Filter jobs by title or company name
- **Empty State**: Shows message when no snapshot exists or no jobs match search
- **Responsive Design**: Works on mobile and desktop

## Usage

### Development
```bash
npm run dev
# Visit: http://localhost:5173/null-expected-job-radar-app
```

### Production
```bash
npm run build
# Jobs data at: dist/null-expected-job-radar-app/data/jobs.json
```

## Updating Job Data

To update the job listings, modify the JSON file:
```bash
public/null-expected-job-radar-app/data/jobs.json
```

The file is automatically copied to `dist/` during build.

## SEO

This page is explicitly blocked from search engines:
- `<meta name="robots" content="noindex, nofollow">`
- Listed in `robots.txt` as `Disallow`
- Excluded from `sitemap.xml`
- Not prerendered during build

## Isolation

- No database or external services
- No navigation links to this page
- No impact on existing site pages
- Self-contained in `src/apps/job-radar/`
