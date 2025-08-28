# Null:Expected - QA Thought Hub

A modern, professional blog and thought hub for QA professionals, built with React, TypeScript, and Tailwind CSS.

## 🚀 Development
```bash
npm install
npm run dev
```

## Adding New Blog Posts

### 1. Create a New Markdown File

**Copy the template file** to get started:

1. Copy `src/data/posts/_template-your-post-title.md`
2. Rename it to your desired filename in the same directory:
```
src/data/posts/draft-your-post-title.md
```

**Important:** Start with `draft-` to keep it private while you work on it.

### 🚨 Draft Posts Safety Feature

To prevent accidental publishing of unfinished posts:

**Draft Posts:** Always start with `draft-` when creating new posts (e.g., `draft-my-new-post.md`)
- ✅ **Safe**: Draft posts are completely invisible on the website
- ✅ **Local Testing**: You can still test drafts locally with `npm run dev`
- ✅ **No Accidents**: Even if you push to GitHub, drafts won't appear live

**Publishing:** When ready to publish, rename the file to remove `draft-`
- `draft-my-new-post.md` → `my-new-post.md`
- Push the renamed file to GitHub
- The post becomes live automatically

### **Template File**
- Use `_template-your-post-title.md` as your starting point
- This file is invisible on the website (starts with `_`)
- Copy it and rename to `draft-your-new-post.md` to begin writing

### **Featured Posts**
To make a post appear in the "Featured Insights" section on the homepage:
- Add `"featured"` to the tags array in frontmatter
- Example: `tags: ["featured", "automation", "strategy"]`
- Only posts tagged with "featured" will appear in this section

### **Category Filtering**
For posts to appear when users click category cards on the homepage:
- Include the corresponding category tag in your tags array:
  - **QA Processes** → `"qa-processes"`
  - **Quality Mindset** → `"quality-mindset"`
  - **Career Advice** → `"career-advice"`
  - **Industry Trends** → `"industry-trends"`
  - **Tools & Tech** → `"tools-tech"`
  - **Case Studies** → `"case-studies"`
- Example: `tags: ["featured", "qa-processes", "automation"]`
- Posts without category tags will only appear in "All Posts" view

### 2. Add Frontmatter and Content

The template file already has the correct structure, but here's what each field means:

```typescript
---
title: "Your Blog Post Title"
excerpt: "A brief summary of your post that appears on the blog listing page."
category: "QA Processes"
tags: ["featured", "automation", "strategy"]
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

## 📝 Quick Start Process

1. **Copy template**: `_template-your-post-title.md` → `draft-your-new-post.md`
2. **Edit content**: Update frontmatter and write your post
3. **Test locally**: `npm run dev` to preview
4. **Publish**: Rename to remove `draft-` prefix
5. **Push to GitHub**: `git add . && git commit -m "Add new post" && git push`
6. **Goes live**: Automatically deployed in 2-3 minutes

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
- **tags**: Array of tags for filtering and featuring. **Important**: Include at least one category tag for proper filtering:
  - `"qa-processes"` - for QA Processes category
  - `"quality-mindset"` - for Quality Mindset category  
  - `"career-advice"` - for Career Advice category
  - `"industry-trends"` - for Industry Trends category
  - `"tools-tech"` - for Tools & Tech category
  - `"case-studies"` - for Case Studies category
  - `"featured"` - to appear in Featured Insights section
  - Example: `["featured", "qa-processes", "automation", "strategy"]`
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
