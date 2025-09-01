# Null:Expected - QA Thought Hub

A modern, professional blog and thought hub for QA professionals, built with React, TypeScript, and Tailwind CSS.

## 🚀 Development
```bash
npm install
npm run dev
```

## Adding New Blog Posts

### 1. Create a New Markdown File

**Create the folder structure and copy the template file** to get started:

1. Create the folder structure for your post:
```
src/data/posts/[author-slug]/[year]/[month]/
```
   - `[author-slug]`: Use your author slug (e.g., `adevitan`, `alexdavis`)
   - `[year]`: Four-digit year (e.g., `2025`)
   - `[month]`: Two-digit month (e.g., `01`, `09`, `12`)

2. Copy the template file `src/data/posts/_template-your-post-title.md`
3. Place it in your new folder structure and rename it:
```
src/data/posts/adevitan/2025/01/draft-your-post-title.md
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
- Use `src/data/posts/_template-your-post-title.md` as your starting point
- This file is invisible on the website (starts with `_`)
- Copy it to your author/year/month folder and rename to `draft-your-new-post.md` to begin writing

### **Featured Posts**
To make a post appear in the "Featured Insights" section on the homepage:
- Add `"featured"` to the tags array in frontmatter
- Example: `tags: ["featured", "automation", "strategy"]`
- Only posts tagged with "featured" will appear in this section

### **Category Filtering**
For posts to appear when users click category cards on the homepage:
- Include the corresponding category tag as the **first tag** in your tags array:
  - **QA Processes** → `"qa-processes"`
  - **Quality Mindset** → `"quality-mindset"`
  - **Career Advice** → `"career-advice"`
  - **Industry Trends** → `"industry-trends"`
  - **Tools & Tech** → `"tools-tech"`
  - **Case Studies** → `"case-studies"`
- Example: `tags: ["qa-processes", "featured", "automation"]`
- Posts without category tags will only appear in "All Posts" view

### 2. Add Frontmatter and Content

The template file already has the correct structure, but here's what each field means:

```typescript
---
title: "Your Blog Post Title"
excerpt: "A brief summary of your post that appears on the blog listing page."
tags: ["qa-processes", "featured", "automation", "strategy"]
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

1. **Create folders**: `src/data/posts/[author-slug]/[year]/[month]/`
2. **Copy template**: `_template-your-post-title.md` → `[author-folder]/[year]/[month]/draft-your-new-post.md`
2. **Edit content**: Update frontmatter and write your post
3. **Test locally**: `npm run dev` to preview
4. **Publish**: Rename to remove `draft-` prefix
5. **Push to GitHub**: `git add . && git commit -m "Add new post" && git push`
6. **Goes live**: Automatically deployed in 2-3 minutes

## 🔧 System Architecture

### **Organized File Structure**
- Posts are organized by author, then by year and month for better scalability
- Structure: `src/data/posts/[author-slug]/[year]/[month]/post-name.md`
- Example: `src/data/posts/adevitan/2025/01/testing-vs-quality.md`
- Template files remain in the root posts directory for easy access

### **Dynamic File Loading**
- Posts are loaded dynamically at runtime using `import.meta.glob()` with recursive search
- New `.md` files are automatically discovered without rebuilds
- Robust frontmatter parsing handles various comment styles
- Comprehensive error handling prevents parsing failures

### **File Filtering Rules**
Files are automatically skipped if they:
- Start with `_` (template files)
- Start with `draft-` (draft posts)
- Contain `template`, `example`, or `your-post-title` in filename or slug
- Have invalid or missing frontmatter

### **Category System**
- Categories are determined by the first tag in the `tags` array
- Supported categories: `qa-processes`, `quality-mindset`, `career-advice`, `industry-trends`, `tools-tech`, `case-studies`
- Posts without category tags default to "QA Processes"
- Featured posts require the `"featured"` tag

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

## 🔧 Required Setup Steps:**

### **GitHub Actions + Netlify Deployment:**
This project uses GitHub Actions to automatically deploy to Netlify whenever you push to the main branch. See [DEPLOYMENT.md](DEPLOYMENT.md) for complete setup instructions.

**Quick Setup:**
1. Create a Netlify site (don't connect to GitHub in Netlify UI)
2. Get your Netlify Site ID and Personal Access Token
2. Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` as GitHub repository secrets
3. Point your DNS to Netlify (CNAME for www, A record for apex domain)
4. Configure custom domain in Netlify
5. Push changes to main branch - automatic deployment happens in 2-3 minutes!

**Benefits:**
- ✅ **Independent from Bolt**: Run completely on your own infrastructure
- ✅ **Automatic deployments**: Push to GitHub → Auto-deploy to Netlify
- ✅ **Custom domain**: Use nullexpected.com with SSL
- ✅ **Free hosting**: Netlify free tier + GitHub Actions
- ✅ **Full control**: Manage your own deployment pipeline

### Frontmatter Fields

- **title**: The post title (displayed as H1)
- **excerpt**: Brief summary for blog listing and SEO
- **tags**: Array of tags for categorization, filtering and featuring. **Required**: Include at least one category tag as the first tag:
  - `"qa-processes"` - for QA Processes category
  - `"quality-mindset"` - for Quality Mindset category  
  - `"career-advice"` - for Career Advice category
  - `"industry-trends"` - for Industry Trends category
  - `"tools-tech"` - for Tools & Tech category
  - `"case-studies"` - for Case Studies category
  - `"featured"` - to appear in Featured Insights section
  - Example: `["qa-processes", "featured", "automation", "strategy"]`
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