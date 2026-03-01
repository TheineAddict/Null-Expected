# App-Specific Public Assets

This folder is intended for **app-specific static assets** that need to be served directly from `/apps/<app-name>/...`.

Currently, one app already uses its own public path:

- Job Radar app data lives under `/null-expected-job-radar-app/data/...` for backward compatibility.

Going forward:

- If you build new self-contained app sections (e.g. `/character-sheet-app`), and they need static assets that must be publicly reachable by URL, prefer putting them under:

  ```text
  public/apps/<app-name>/...
  ```

  and referencing them as `/apps/<app-name>/...`.

- For existing apps with established paths (like `/null-expected-job-radar-app/data/...`), keep those paths as-is to avoid breaking bookmarked URLs, SEO previews, or ingestion scripts.

This folder mainly serves as a **convention anchor** for future app assets, not something you need to retrofit today.

