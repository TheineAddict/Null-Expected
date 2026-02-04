# Job Radar Ingestion Script

Fetches, normalizes, classifies, scores, and deduplicates jobs from multiple sources.

## Usage

```bash
npm run job-radar:ingest
```

## Architecture

```
scripts/job-radar-ingest/
├── index.ts         # Main orchestrator
├── connectors.ts    # Source-specific fetchers
├── normalize.ts     # HTML cleaning, hashing, UUID generation
├── classify.ts      # Workplace and remote scope classification
├── score.ts         # Scoring and reason generation
├── types.ts         # TypeScript interfaces
└── README.md        # This file
```

## Configuration

**Input**: `data/null-expected-job-radar-app/sources.json`

```json
{
  "schemaVersion": 1,
  "sources": [
    {
      "id": "wwr",
      "type": "WWR_RSS",
      "name": "We Work Remotely",
      "enabled": true,
      "config": { "url": "https://weworkremotely.com/remote-jobs.rss" }
    }
  ]
}
```

## Data Sources

### 1. We Work Remotely (WWR_RSS)
- Fetches from RSS feed
- Parses XML to extract title, company, description, location
- Source ID: `wwr-{job-slug}`

### 2. Remotive (REMOTIVE_API)
- Fetches from JSON API
- Extracts structured job data
- Source ID: `remotive-{job-id}`

### 3. Himalayas (HIMALAYAS_API)
- Fetches paginated JSON API
- Default limit: 20 jobs per page
- Max pages: 5 (100 jobs total)
- Source ID: `himalayas-{job-id}`

## Processing Pipeline

### 1. Normalization
- **HTML Cleaning**: Strips tags, decodes entities, preserves structure
- **Hash Generation**: `sha256(lowercase(company)|lowercase(title)|url)`
- **UUID Stability**: Generates consistent UUIDs from hash for deduplication
- **Date Parsing**: Converts various date formats to ISO 8601
- **First-Seen Tracking**: Keeps original `collectedAt` for recurring jobs

### 2. Classification

#### Workplace Type (priority order)
1. **HYBRID**: hybrid, flexible location, part remote
2. **ONSITE**: on-site, in-office, relocation required
3. **REMOTE**: remote, work from home, WFH, distributed
4. **UNKNOWN**: no clear indicators

#### Remote Scope (when REMOTE)
1. **WORLDWIDE**: worldwide, global, anywhere, any country
2. **ROMANIA**: romania, bucharest, cluj, timisoara
3. **EU_EEA**: EU, EEA, European Union
4. **EUROPE**: europe, european
5. **EMEA**: EMEA, Europe/Middle East/Africa
6. **COUNTRY_ONLY**: restricted to single country
7. **MULTI_COUNTRY**: 2-5 specific countries
8. **UNKNOWN**: no clear scope

#### Eligible Countries
- Extracts country names and ISO-2 codes
- Supports 25+ common countries
- Sorts alphabetically

### 3. Scoring (0-100 scale)

**Base**: 50 points

**Remote Scope Boosts**:
- WORLDWIDE: +10
- EU_EEA/EUROPE: +8
- ROMANIA: +6
- EMEA: +5

**Remote Scope Penalties**:
- COUNTRY_ONLY (non-RO): -20
- MULTI_COUNTRY (no RO): -10

**Role Boosts**:
- QA/Quality keywords: +15
- Release/Delivery keywords: +10
- Senior/Lead/Principal: +5

**Role Penalties**:
- Automation-only (SDET): -15
- Manual-only: -10
- 8+ years required: -5

**Workplace Penalties**:
- HYBRID: -5
- ONSITE: -15

**Top 3 Reasons**: Sorted by absolute delta, displayed in UI

### 4. Deduplication
- Groups by `hashDedup`
- Preserves stable `id` across runs
- Keeps original `collectedAt` from first ingestion
- Tracks `new` vs `updated` in metadata

## Outputs

### jobs.json
```json
{
  "schemaVersion": 1,
  "updatedAt": "2026-02-04T15:30:00.000Z",
  "jobs": [...]
}
```

### meta.json
```json
{
  "schemaVersion": 1,
  "lastRunAt": "2026-02-04T15:30:00.000Z",
  "lastRunStats": {
    "new": 12,
    "updated": 8,
    "total": 20,
    "sourcesOk": 3,
    "sourcesFailed": 0
  }
}
```

## Error Handling

- Per-source try/catch: failures don't stop other sources
- Failed sources increment `sourcesFailed` counter
- Console logs show progress and errors
- Process exits with code 1 on fatal errors

## Performance

- Concurrent source fetching (all at once)
- Pagination for large result sets
- Single-pass normalization and scoring
- In-memory deduplication

## Testing

Run ingestion in dry-run mode:
```bash
npm run job-radar:ingest 2>&1 | tee ingestion.log
```

Verify outputs:
```bash
cat public/null-expected-job-radar-app/data/jobs.json | jq '.jobs | length'
cat public/null-expected-job-radar-app/data/meta.json | jq '.lastRunStats'
```

## Limitations

- No AI/LLM classification (rule-based only)
- No authentication for private job boards
- No incremental updates (full snapshot each run)
- No historical tracking (only current snapshot)
- Classification accuracy depends on text patterns
