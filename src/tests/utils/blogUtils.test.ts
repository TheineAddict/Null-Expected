import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BlogPost } from '../../types/blog';

// Mock the import.meta.glob function
const mockModules = {
  '../../data/posts/test-post-1.md': () => Promise.resolve(`---
title: "Test Post 1"
excerpt: "Excerpt for test post 1."
tags: ["qa-processes", "featured"]
author: "Ade Vitan 2"
date: "2024-01-01"
readTime: "5 min read"
slug: "test-post-1"
---
# Test Post 1 Content

This is the content of test post 1.
`),
  '../../data/posts/test-post-2.md': () => Promise.resolve(`---
title: "Test Post 2"
excerpt: "Excerpt for test post 2."
tags: ["quality-mindset"]
author: "Alex Davis"
date: "2024-01-02"
readTime: "7 min read"
slug: "test-post-2"
---
# Test Post 2 Content

This is the content of test post 2.
`),
  '../../data/posts/draft-test-post.md': () => Promise.resolve(`---
title: "Draft Post"
excerpt: "This is a draft."
tags: ["qa-processes"]
author: "Ade Vitan 2"
date: "2024-01-03"
readTime: "3 min read"
slug: "draft-post"
---
# Draft Post Content
`),
  '../../data/posts/_template-post.md': () => Promise.resolve(`---
title: "Template Post"
excerpt: "This is a template."
tags: ["qa-processes"]
author: "Ade Vitan 2"
date: "2024-01-04"
readTime: "2 min read"
slug: "template-post"
---
# Template Post Content
`),
};

// Mock import.meta.glob
vi.stubGlobal('import', {
  meta: {
    glob: vi.fn(() => mockModules)
  }
});

// Import the functions after mocking
import {
  loadBlogPosts,
  getPostBySlug,
  getFeaturedPosts,
  getPostsByCategory
} from '../../utils/blogUtils';

// Import the internal functions for testing
const { parseFrontmatter, markdownToHtml } = await import('../../utils/blogUtils');

describe('blogUtils', () => {
  let allPosts: BlogPost[];

  beforeEach(async () => {
    vi.clearAllMocks();
    allPosts = await loadBlogPosts();
  });

  // Test Case 1: loadBlogPosts Utility Function
  describe('loadBlogPosts', () => {
    it('should correctly load and filter blog posts', async () => {
      expect(allPosts).toHaveLength(2); // Only test-post-1 and test-post-2 should load
      expect(allPosts[0].title).toBe('Test Post 2'); // Sorted by date, newest first
      expect(allPosts[1].title).toBe('Test Post 1');
    });

    it('should filter out draft and template posts', async () => {
      const postSlugs = allPosts.map(post => post.slug);
      expect(postSlugs).not.toContain('draft-post');
      expect(postSlugs).not.toContain('template-post');
    });

    it('should assign correct categories based on tags', async () => {
      const qaPost = allPosts.find(post => post.slug === 'test-post-1');
      const qualityPost = allPosts.find(post => post.slug === 'test-post-2');
      
      expect(qaPost?.category).toBe('QA Processes');
      expect(qualityPost?.category).toBe('Quality Mindset');
    });
  });

  // Test Case 2: getPostBySlug Utility Function
  describe('getPostBySlug', () => {
    it('should retrieve a post by its slug', () => {
      const post = getPostBySlug(allPosts, 'test-post-1');
      expect(post).toBeDefined();
      expect(post?.title).toBe('Test Post 1');
      expect(post?.slug).toBe('test-post-1');
    });

    it('should return undefined for a non-existent slug', () => {
      const post = getPostBySlug(allPosts, 'non-existent-slug');
      expect(post).toBeUndefined();
    });
  });

  // Test Case 3: getFeaturedPosts Utility Function
  describe('getFeaturedPosts', () => {
    it('should return only featured posts', () => {
      const featured = getFeaturedPosts(allPosts);
      expect(featured).toHaveLength(1);
      expect(featured[0].title).toBe('Test Post 1');
      expect(featured[0].tags).toContain('featured');
    });

    it('should respect the count parameter', () => {
      const featured = getFeaturedPosts(allPosts, 1);
      expect(featured).toHaveLength(1);
    });
  });

  // Test Case 4: getPostsByCategory Utility Function
  describe('getPostsByCategory', () => {
    it('should return posts filtered by category', () => {
      const qaPosts = getPostsByCategory(allPosts, 'QA Processes');
      expect(qaPosts).toHaveLength(1);
      expect(qaPosts[0].title).toBe('Test Post 1');
      expect(qaPosts[0].tags).toContain('qa-processes');
    });

    it('should return all posts for "All" category', () => {
      const allCategoryPosts = getPostsByCategory(allPosts, 'All');
      expect(allCategoryPosts).toHaveLength(2);
    });

    it('should return empty array for non-existent category', () => {
      const nonExistentPosts = getPostsByCategory(allPosts, 'Non-Existent Category');
      expect(nonExistentPosts).toHaveLength(0);
    });
  });

  // Test Case 6: markdownToHtml Utility Function
  describe('markdownToHtml', () => {
    it('should convert basic markdown to HTML correctly', () => {
      const markdown = `# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*.

- List item 1
- List item 2

\`inline code\`

> Blockquote text

[Link text](https://example.com)`;

      const html = markdownToHtml(markdown);
      
      expect(html).toContain('<h1 id="heading-1">Heading 1</h1>');
      expect(html).toContain('<h2 id="heading-2">Heading 2</h2>');
      expect(html).toContain('<h3 id="heading-3">Heading 3</h3>');
      expect(html).toContain('<strong>Bold text</strong>');
      expect(html).toContain('<em>italic text</em>');
      expect(html).toContain('<li>List item 1</li>');
      expect(html).toContain('<li>List item 2</li>');
      expect(html).toContain('<code>inline code</code>');
      expect(html).toContain('<blockquote>Blockquote text</blockquote>');
      expect(html).toContain('<a href="https://example.com">Link text</a>');
    });

    it('should handle code blocks correctly', () => {
      const markdown = '```javascript\nconst a = 1;\n```';
      const html = markdownToHtml(markdown);
      expect(html).toContain('<pre><code>const a = 1;\n</code></pre>');
    });
  });

  // Test Case 7: parseFrontmatter Utility Function
  describe('parseFrontmatter', () => {
    it('should correctly parse frontmatter from a markdown string', () => {
      const content = `---
title: "Parsed Title"
excerpt: "Parsed Excerpt."
tags: ["tag1", "tag2"]
author: "Test Author"
date: "2024-01-05"
readTime: "10 min read"
slug: "parsed-slug"
---
# Markdown Content

This is the markdown content.`;

      const parsed = parseFrontmatter(content);
      expect(parsed).toBeDefined();
      expect(parsed?.frontmatter.title).toBe('Parsed Title');
      expect(parsed?.frontmatter.excerpt).toBe('Parsed Excerpt.');
      expect(parsed?.frontmatter.tags).toEqual(['tag1', 'tag2']);
      expect(parsed?.frontmatter.author).toBe('Test Author');
      expect(parsed?.content.trim()).toContain('# Markdown Content');
    });

    it('should return null if no frontmatter is found', () => {
      const content = `# Just Markdown Content

No frontmatter here.`;
      const parsed = parseFrontmatter(content);
      expect(parsed).toBeNull();
    });

    it('should handle empty arrays correctly', () => {
      const content = `---
title: "Test"
tags: []
---
# Content`;
      const parsed = parseFrontmatter(content);
      expect(parsed?.frontmatter.tags).toEqual([]);
    });
  });
});