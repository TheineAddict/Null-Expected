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
    id: string;                        // Unique job identifier (UUID)
    sourceId: string;                  // Source-specific ID
    canonicalUrl: string;              // URL to apply
    title: string;                     // Job title
    company: string | null;            // Company name
    locationRaw: string | null;        // Location description
    workplaceType: WorkplaceType;      // REMOTE | HYBRID | ONSITE | UNKNOWN
    remoteScope: RemoteScope;          // WORLDWIDE | EUROPE | EU_EEA | EMEA | ROMANIA | COUNTRY_ONLY | MULTI_COUNTRY | UNKNOWN
    eligibleCountries: string[];       // ISO country codes (e.g., ["RO", "DE"])
    scopeText: string | null;          // Human-readable scope description
    descriptionText: string | null;    // Full job description
    postedAt: string | null;           // ISO 8601 timestamp when posted
    collectedAt: string;               // ISO 8601 timestamp when collected
    hashDedup: string;                 // Deduplication hash
    score: number;                     // Relevance score (0-100)
    reasons: string[];                 // Reasons for score/match
    source: JobSource;                 // WWR | REMOTIVE | HIMALAYAS | RSS | GREENHOUSE | LEVER
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
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "sourceId": "wwr-12345",
      "canonicalUrl": "https://example.com/jobs/senior-qa",
      "title": "Senior QA Engineer",
      "company": "Example Corp",
      "locationRaw": "Europe / Remote",
      "workplaceType": "REMOTE",
      "remoteScope": "EUROPE",
      "eligibleCountries": ["RO", "DE", "FR"],
      "scopeText": "Open to candidates in European countries",
      "descriptionText": "We are looking for...",
      "postedAt": "2026-02-01T10:00:00.000Z",
      "collectedAt": "2026-02-04T12:00:00.000Z",
      "hashDedup": "abc123def456",
      "score": 85,
      "reasons": ["Remote-friendly", "Europe-based", "QA role"],
      "source": "WWR"
    }
  ]
}
```

## Features

- **Snapshot Info Panel**: Displays last updated time, total jobs, and filtered count
- **Advanced Filtering**:
  - Multi-select remote scope (WORLDWIDE, EU_EEA, EUROPE, ROMANIA)
  - Toggle to include COUNTRY_ONLY jobs (default: OFF)
  - Toggle to include UNKNOWN scope jobs (default: OFF)
  - Minimum score slider (0-100, default: 40)
  - Text search by title or company
- **Smart Sorting**: Jobs sorted by collection date (newest first), then by score
- **Rich Job Cards**: Display score badges, remote scope, location, collection time, and match reasons (up to 3)
- **Job Detail Drawer**: Click info button to view full job description in a modal
- **Empty State**: Shows message when no snapshot exists or no jobs match filters
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
