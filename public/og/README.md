# Open Graph Images

This directory contains Open Graph (OG) images for social media sharing.

## Required Images

- `default.png` - Default OG image (1200x630px recommended)
  - Used when no specific image is provided for a page
  - Should feature the Null:Expected branding

## Specifications

- Recommended size: 1200 x 630 pixels
- Format: PNG or JPG
- File size: Keep under 8MB (ideally under 1MB)
- Safe area: Keep important content within the center 1200x600px area

## Creating OG Images

You can create OG images using:
- Design tools (Figma, Canva, Photoshop)
- Online OG image generators
- Automated tools like og-image or similar services

## Usage

Images are referenced in the SEO component via the `image` prop:
```tsx
<SEO
  title="Page Title"
  description="Page description"
  path="/page-path"
  image="/og/custom-image.png"  // Optional, falls back to default.png
/>
```
