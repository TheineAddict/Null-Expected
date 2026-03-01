# Public Assets Structure (`/public`)

This document describes how the `/public` folder is organized and how to safely reference assets so that reorganizations do not break the site.

## Overview

Vite serves all files in `/public` from the site root. For example:

- `public/robots.txt` → `/robots.txt`
- `public/og/default.png` → `/og/default.png`

Some assets **must** live at the root path for browser / PWA compatibility, while others can live in subfolders.

## Root-level assets (do not move)

These are expected at specific URLs and should remain at the root of `/public`:

- `robots.txt` → `/robots.txt`
- `site.webmanifest` → `/site.webmanifest`
- `sw.js` → `/sw.js`
- Favicon & icons referenced from `index.html` and `site.webmanifest`:
  - `/favicon.ico`
  - `/favicon.svg`
  - `/favicon-dark.svg`
  - `/apple-touch-icon.png`
  - `/favicon-192.png`, `/favicon-512.png` (referenced from `site.webmanifest`)

If you change any of these paths:

1. Update **all references** (HTML, manifest, tests).
2. Consider leaving a backward-compatible copy at the old path, especially for favicons.

## Structured subfolders

### `/og` – Open Graph images

- Location: `public/og/`
- Served as: `/og/...`
- Purpose: Social sharing / Open Graph images used by the `SEO` component.
- Defaults:
  - `public/og/default.png` → `/og/default.png` (used when no specific image is provided).

Usage example (from `src/components/SEO.tsx`):

```ts
const ogImage = image || '/og/default.png';
```

When adding new OG images, always place them under `public/og/` and reference them as `/og/<name>.png`.

### `/icons` – non-root icons

- Location: `public/icons/`
- Served as: `/icons/...`
- Purpose: Icons that do **not** need to live at the root path.
- Examples:
  - Alternative favicon sizes referenced explicitly from components.
  - Social icons or app logos used as plain images.

Root-required icons (favicon, apple-touch-icon, etc.) should stay at `/`, not under `/icons/`.

### `/images` – general images

- Location: `public/images/`
- Served as: `/images/...`
- Purpose: General-purpose images that are easier to manage as files than via markdown.

Usage example:

```tsx
<img src=\"/images/landing-hero.png\" alt=\"QA professionals collaborating\" />
```

Do **not** put OG images here; use `/og` for those.

### `/apps` – app-specific assets

- Location: `public/apps/`
- Served as: `/apps/<app-name>/...`
- Purpose: Static assets for self-contained app sections (e.g. `/character-sheet-app`) that need direct URLs.

Current exception:

- Job Radar uses `/null-expected-job-radar-app/data/...` for historic reasons and should remain there for compatibility.

For any new app-specific assets, prefer:

```text
public/apps/<app-name>/...
→ /apps/<app-name>/...
```

## Existing app-specific data

### Job Radar snapshot data

- Data files:
  - `public/null-expected-job-radar-app/data/jobs.json`
  - `public/null-expected-job-radar-app/data/meta.json`
- Referenced by:
  - `src/apps/job-radar/JobRadarApp.tsx` (`/null-expected-job-radar-app/data/jobs.json`, `/null-expected-job-radar-app/data/meta.json`)
  - `scripts/job-radar-ingest/index.ts`
  - Several README/docs under `data/` and `scripts/`.

These paths are **already in use** and should not be moved without:

1. Updating all code and script references.
2. Updating documentation and any external tooling that reads from these files.
3. Optionally leaving copies at the old paths to avoid breaking old bookmarks or integrations.

## Safe refactor checklist (when moving assets)

If you ever decide to move a file inside `/public`:

1. **Find all references**:
   - TS/TSX components.
   - `index.html`, `public/site.webmanifest`.
   - Scripts under `scripts/` that read/write public assets.
   - Tests under `tests/` (especially `tests/api/api.spec.ts`).
   - Markdown docs (`SEO_IMPLEMENTATION.md`, `JOB_RADAR_APP.md`, etc.).
2. **Update paths consistently**:
   - Replace old root-relative URLs (e.g. `/og/old.png`) with the new ones.
3. **Consider backwards compatibility**:
   - Leave a copy at the old path if external references may still use it (e.g. already-shared OG URLs).
4. **Verify**:
   - Run `npm run test` (or at least `npm run test:api`).
   - Run `npm run build` and inspect the output for the expected paths.
   - In the browser/devtools, confirm favicons, OG tags, and images load correctly.

## Conventions for new assets

- Use **root-relative URLs** in code: `/og/...`, `/images/...`, `/icons/...`, `/apps/<app-name>/...`.
- Keep root-only assets (`robots.txt`, `site.webmanifest`, favicons, `sw.js`) at the top of `/public`.
- Prefer `/og` for OG images instead of scattering them in `/images`.
- Group app-specific assets under `/apps/<app-name>/` or, if there is already a legacy path in use, keep it stable.

