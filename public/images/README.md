# Public Images

This folder is the home for **general-purpose images** that you want to serve by URL, but that are not icons or Open Graph images.

Examples:

- Hero / illustration images for landing pages.
- Inline images for static pages that are easier to manage as raw files than via markdown.
- Diagrams or screenshots used in evergreen site content.

Conventions:

- Store files under `/images/...` (e.g. `/images/landing-hero.png`).
- Use descriptive, kebab-case filenames: `landing-hero.png`, `qa-team-photo.jpg`, etc.
- Reference from the app using root-relative URLs, for example:

  ```tsx
  <img src="/images/landing-hero.png" alt="QA professionals collaborating" />
  ```

Open Graph images should live under `/og/` instead, and icons under `/icons/` or at the root if they must be there.

