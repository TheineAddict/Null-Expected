# Job Radar App - Hidden Page Documentation

## Overview

A hidden, isolated page has been created at `/null-expected-job-radar-app` for hosting your Job Radar application without interfering with the main Null Expected site.

## URL

**Production:** `https://www.nullexpected.com/null-expected-job-radar-app`
**Local:** `http://localhost:5173/null-expected-job-radar-app`

## Features

### Complete Isolation
- **No Header/Footer**: The page renders without the Null Expected header and footer
- **Clean Canvas**: Full page available for your app
- **No Navigation Links**: Not linked from anywhere on the site
- **Separate Root**: Uses `#job-radar-root` as the main container

### SEO Protection
- **Robots Meta Tags**: `noindex, nofollow` prevents search engine indexing
- **Robots.txt**: Explicitly disallows crawling of this path
- **Sitemap Exclusion**: Not included in sitemap.xml
- **Build Exclusion**: Not prerendered during build process

## Implementation Details

### Files Created/Modified

1. **Created: `src/pages/JobRadarApp.tsx`**
   - Standalone page component
   - Includes meta tags for SEO blocking
   - Provides placeholder content

2. **Modified: `src/App.tsx`**
   - Added route for `/null-expected-job-radar-app`
   - Conditionally hides header/footer for this route
   - Uses dedicated `AppContent` component for layout control

3. **Modified: `public/robots.txt`**
   - Added `Disallow: /null-expected-job-radar-app`

4. **Modified: `scripts/prerender-pages.ts`**
   - Excluded `JobRadarApp.tsx` from prerendering

5. **Modified: `scripts/build-blog.mjs`**
   - Excluded from sitemap generation

## Adding Your App

You can replace the placeholder content in `src/pages/JobRadarApp.tsx`:

```tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
// Import your app components here

const JobRadarApp: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Job Radar App</title>
      </Helmet>
      <div className="min-h-screen bg-white">
        <div id="job-radar-root" className="w-full h-full">
          {/* Add your Job Radar App components here */}
        </div>
      </div>
    </>
  );
};

export default JobRadarApp;
```

## Important Notes

- This page will NOT appear in search results
- This page will NOT be linked from the main site
- This page will NOT show Null Expected branding (header/footer)
- The route is fully functional and accessible via direct URL
- The page has full access to React Router, Tailwind CSS, and other dependencies

## Security Considerations

- The page is public and accessible to anyone with the URL
- If you need authentication or access control, implement it within your app
- Consider adding environment-specific configurations if needed
- API keys and sensitive data should be handled through environment variables

## Testing

To test locally:
```bash
npm run dev
# Then visit: http://localhost:5173/null-expected-job-radar-app
```

To test production build:
```bash
npm run build
npm run preview
# Then visit: http://localhost:4173/null-expected-job-radar-app
```
