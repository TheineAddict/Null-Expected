# Null:Expected - QA Thought Hub

A modern, professional blog and thought hub for QA professionals, built with React, TypeScript, and Tailwind CSS.

## 🚀 Development
```bash
npm install
npm run dev
```

## Adding New Blog Posts

### 1. Create a New Markdown File

Create a new `.md` file in the `src/data/posts/` directory:

```
src/data/posts/your-post-title.md
```

### 2. Add Frontmatter and Content

Structure your markdown file with frontmatter at the top:

```typescript
---
title: "Your Blog Post Title"
excerpt: "A brief summary of your post that appears on the blog listing page."
category: "QA Processes"
author: "Jane Smith"
date: "2024-01-25"
readTime: "10 min read"
slug: "your-blog-post-url-slug"
---

# Your Blog Post Title

Your blog post content goes here in **Markdown format**.

## Section Headings
Use ## for main sections and ### for subsections.

- Use bullet points for lists
- Markdown is automatically converted to HTML
- No need to write HTML manually

> Use blockquotes for important quotes or callouts.

### Code Examples
```javascript
// Code blocks are supported with syntax highlighting
function example() {
  return "formatted code";
}
```
```

## 📋 Content Guidelines

- **Markdown Format**: Write in standard Markdown (automatically converted to HTML)
- **Headings**: Use `##` for main sections, `###` for subsections
- **Paragraphs**: Regular text automatically becomes paragraphs
- **Lists**: Use `-` or `*` for bullet points, `1.` for numbered lists
- **Emphasis**: Use `**bold**` and `*italics*`
- **Code**: Use `` `inline code` `` and ``` for code blocks
- **Quotes**: Use `>` for blockquotes
- **Links**: Use `[text](url)` for links

## 🎨 Design Features

- ✅ **Same Colors**: Deep indigo (#2E00A3, #5000FF) with clean neutrals
- ✅ **Same Typography**: Inter font family throughout
- ✅ **Same Layout**: Grid-based responsive design
- ✅ **Same Components**: Hero section, category cards, post previews
- ✅ **Same Interactions**: Hover effects, transitions, animations

## 📊 SEO & Performance

- **Fast Loading**: Static generation with dynamic content
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Mobile First**: Responsive design for all devices
- **Accessibility**: WCAG compliant with proper contrast and navigation

### Frontmatter Fields

- **title**: The post title (displayed as H1)
- **excerpt**: Brief summary for blog listing and SEO
- **category**: Choose from: 'QA Processes', 'Quality Mindset', 'Career Advice', 'Industry Trends', 'Tools & Tech', 'Case Studies'
- **author**: Choose from: 'Jane Smith' or 'Alex Davis'
- **date**: Publication date in YYYY-MM-DD format
- **readTime**: Estimated reading time (e.g., "10 min read")
- **slug**: URL-friendly version of the title

### Slug Guidelines

Create URL-friendly slugs by:
- Converting to lowercase
- Replacing spaces with hyphens
- Removing special characters
- Keeping it descriptive but concise

Example: "The Art of Questioning: Why Curiosity Drives Quality" → "art-of-questioning-curiosity-drives-quality"

### Read Time Estimation

Estimate reading time based on content length:
- ~200 words per minute average reading speed
- 1,000 words ≈ 5 min read
- 2,000 words ≈ 10 min read
- 3,000 words ≈ 15 min read
