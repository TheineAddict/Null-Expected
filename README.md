# Null:Expected - QA Thought Hub

A modern, professional blog and thought hub for QA professionals, built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Configure your Blogger API credentials in `.env`:
```
VITE_BLOGGER_API_KEY=your_api_key_here
VITE_BLOGGER_BLOG_ID=your_blog_id_here
```

### Getting Blogger API Credentials

#### 1. Get API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Blogger API v3"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key to your `.env` file

#### 2. Get Blog ID
1. Go to your [Blogger Dashboard](https://blogger.com)
2. Select your blog
3. In the URL, you'll see something like: `https://www.blogger.com/blog/posts/1234567890123456789`
4. The long number is your Blog ID
5. Copy it to your `.env` file

### Development
```bash
npm install
npm run dev
```

## 📝 Content Management

This website now uses **Blogger as the primary content source**. This means:

✅ **Authors can write posts using the familiar Blogger interface**
✅ **Posts automatically appear on the website**
✅ **No need to work with Git or code**
✅ **Real-time publishing**

## Adding New Blog Posts

### Method 1: Using Blogger Interface (Recommended)

1. **Go to your Blogger dashboard**
2. **Click "New Post"**
3. **Write your post** using Blogger's rich text editor
4. **Add labels/categories** for proper categorization:
   - `QA Processes`
   - `Quality Mindset` 
   - `Career Advice`
   - `Industry Trends`
   - `Tools & Tech`
   - `Case Studies`
5. **Publish the post**
6. **The post will automatically appear on your website!**

### Method 2: Markdown Files (Fallback)

If the Blogger API is unavailable, the system falls back to local markdown files.

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

### Blogger Post Requirements

When writing posts in Blogger, follow these guidelines for best results:

#### **Labels/Categories**
Use these exact labels in Blogger for proper categorization:
- `QA Processes` - Testing methodologies, frameworks, workflows
- `Quality Mindset` - Philosophy, thinking patterns, culture  
- `Career Advice` - Professional growth, skills, transitions
- `Industry Trends` - New developments, future predictions
- `Tools & Tech` - Tool reviews, comparisons, tutorials
- `Case Studies` - Real-world examples, lessons learned

#### **Author Attribution**
Set your Blogger display name to match one of these authors:
- `Jane Smith` - Automation and technical focus
- `Alex Davis` - Process and strategy focus

#### **Content Structure**
- **Engaging Title**: Make it specific and benefit-focused
- **Strong Opening**: Hook readers with the first paragraph
- **Clear Headings**: Use Blogger's heading styles for structure
- **Scannable Content**: Short paragraphs, bullet points, numbered lists
- **Call to Action**: End with a question or next step

### Markdown Guidelines (Fallback Method)

- **Markdown Format**: Write in standard Markdown (automatically converted to HTML)
- **Headings**: Use `##` for main sections, `###` for subsections
- **Paragraphs**: Regular text automatically becomes paragraphs
- **Lists**: Use `-` or `*` for bullet points, `1.` for numbered lists
- **Emphasis**: Use `**bold**` and `*italics*`
- **Code**: Use `` `inline code` `` and ``` for code blocks
- **Quotes**: Use `>` for blockquotes
- **Links**: Use `[text](url)` for links

## 🔧 Technical Architecture

### Content Flow
```
Blogger Interface → Blogger API → Website Display
       ↓
   Automatic sync, real-time updates
```

### Fallback System
```
Blogger API unavailable → Local Markdown Files → Website Display
```

### API Integration
- **Primary Source**: Blogger API v3
- **Fallback Source**: Local markdown files in `src/data/posts/`
- **Caching**: Browser-level caching for performance
- **Error Handling**: Graceful fallback with user feedback

## 🎨 Design Features

The website maintains exact visual consistency with the Blogger template:

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

## 🔍 Troubleshooting

### Posts Not Appearing?
1. **Check API credentials** in `.env` file
2. **Verify Blog ID** is correct
3. **Ensure posts are published** (not drafts) in Blogger
4. **Check browser console** for API errors
5. **Try refreshing** the page

### API Rate Limits?
- Blogger API has generous limits for personal use
- If exceeded, the system falls back to local markdown files
- Consider implementing caching for high-traffic sites

### Styling Issues?
- The website automatically styles Blogger HTML content
- Use Blogger's built-in formatting tools for best results
- Avoid custom HTML/CSS in Blogger posts

## 🚀 Deployment

The website automatically deploys when changes are pushed to the main branch. No additional configuration needed for Blogger integration.

### Environment Variables in Production
Make sure to set these in your hosting platform:
```
VITE_BLOGGER_API_KEY=your_production_api_key
VITE_BLOGGER_BLOG_ID=your_blog_id
```

## 📈 Analytics & Monitoring

- **Blogger Analytics**: Built into Blogger dashboard
- **Website Analytics**: Add Google Analytics to track website traffic
- **API Monitoring**: Check browser console for API errors
- **Performance**: Monitor Core Web Vitals for optimal user experience

---

## Legacy Documentation (Markdown Method)

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
