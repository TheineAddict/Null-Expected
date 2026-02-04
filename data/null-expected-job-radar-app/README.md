# Job Radar Configuration

This directory contains the configuration for the Job Radar ingestion script.

## Quick Start

Run the ingestion script to fetch and process jobs:

```bash
npm run job-radar:ingest
```

This will:
1. Fetch jobs from all enabled sources
2. Normalize, classify, and score each job
3. Write outputs to `public/null-expected-job-radar-app/data/`

## Configuration

### sources.json

Configure which job sources to fetch from:

```json
{
  "schemaVersion": 1,
  "sources": [
    {
      "id": "wwr",
      "type": "WWR_RSS",
      "name": "We Work Remotely",
      "enabled": true,
      "config": {
        "url": "https://weworkremotely.com/remote-jobs.rss"
      }
    }
  ]
}
```

### Source Types

- **WWR_RSS**: We Work Remotely RSS feed
- **REMOTIVE_API**: Remotive JSON API
- **HIMALAYAS_API**: Himalayas paginated JSON API

## Outputs

After running ingestion, check:

- `public/null-expected-job-radar-app/data/jobs.json` - Job listings
- `public/null-expected-job-radar-app/data/meta.json` - Ingestion metadata

## Scheduling

To run ingestion regularly:

### Using cron (Linux/Mac)
```bash
# Run daily at 6am
0 6 * * * cd /path/to/project && npm run job-radar:ingest >> ingestion.log 2>&1
```

### Using Task Scheduler (Windows)
Create a scheduled task that runs:
```
cmd /c "cd /d C:\path\to\project && npm run job-radar:ingest"
```

### Using GitHub Actions
Add to `.github/workflows/ingest-jobs.yml`:
```yaml
name: Ingest Jobs
on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 6am UTC
  workflow_dispatch:      # Manual trigger

jobs:
  ingest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run job-radar:ingest
      - name: Commit changes
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add public/null-expected-job-radar-app/data/
          git commit -m "Update job listings" || true
          git push
```

## Troubleshooting

### No jobs fetched
- Check network connectivity
- Verify source URLs are accessible
- Check console logs for errors

### Low scores
- Review scoring logic in `scripts/job-radar-ingest/score.ts`
- Adjust boosts/penalties as needed
- Check classification accuracy

### Duplicate jobs
- Verify `hashDedup` generation is working
- Check if jobs have slight variations in URL/title/company

## Advanced Usage

### Custom Sources

Add a new source to `sources.json`:

```json
{
  "id": "custom",
  "type": "CUSTOM_API",
  "name": "Custom Source",
  "enabled": true,
  "config": {
    "url": "https://api.example.com/jobs",
    "params": {
      "category": "tech"
    }
  }
}
```

Then implement the connector in `scripts/job-radar-ingest/connectors.ts`.

### Adjusting Scoring

Edit `scripts/job-radar-ingest/score.ts` to modify:
- Base score (default: 50)
- Remote scope boosts (WORLDWIDE: +10, EU: +8, etc.)
- Keyword boosts (QA: +15, Release: +10, etc.)
- Penalties (COUNTRY_ONLY: -20, etc.)

### Classification Rules

Edit `scripts/job-radar-ingest/classify.ts` to modify:
- Workplace type patterns (REMOTE, HYBRID, ONSITE)
- Remote scope detection (WORLDWIDE, EUROPE, EU_EEA, etc.)
- Country extraction logic

## See Also

- [Ingestion Script README](../../scripts/job-radar-ingest/README.md)
- [Job Radar App README](../../src/apps/job-radar/README.md)
