// Internal-only blog tag slugs.
//
// These tags should remain in each post's `tags` array so that:
// - `/blog?tag=<slug>` continues to filter/group posts correctly
// - cross-linking between theme series works
//
// But they must be hidden from tag-chip UI (cards + post header).
//
// Add new internal theme slugs here as you introduce them.
export const INTERNAL_BLOG_TAG_SLUGS: string[] = [
  // Example placeholder (no current posts use it, so it won't affect visuals yet).
  'theme-example',
];

export const INTERNAL_BLOG_TAG_SLUGS_SET: ReadonlySet<string> = new Set(
  INTERNAL_BLOG_TAG_SLUGS,
);

