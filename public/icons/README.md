# Public Icons

This folder is for icons that **do not need to live at the root URL** but should still be served from `/icons/...`.

Examples:

- Alternative favicon sizes that you reference explicitly (not via the default browser favicon lookup).
- Social / UI icons that you want to load as plain image URLs.

Root-level icon & PWA files that should stay at `/` (not moved here):

- `/favicon.ico`
- `/favicon.svg`
- `/favicon-dark.svg`
- `/apple-touch-icon.png`
- `/site.webmanifest` (which in turn may reference `/favicon-192.png`, `/favicon-512.png`, etc.)

When adding **new** icons:

- Prefer putting them here and referencing them as `/icons/<name>.<ext>`.
- Only add icons at the root of `public/` when a browser, PWA manifest, or external tool requires that exact root path.

