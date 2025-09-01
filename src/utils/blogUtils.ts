import { BlogPost } from '../types/blog';
import { getAuthorByName, getAuthorById, AUTHORS } from '../config/authors';
import { getAuthorByName, AUTHORS } from '../config/authors';

// Simple, robust frontmatter parser
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    console.warn('No frontmatter found in content');
    return null;
  }
  
  const [, frontmatterStr, markdownContent] = match;
  const frontmatter: Record<string, any> = {};
  
  try {
    // Split into lines and process each one
    const lines = frontmatterStr.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      
      // Skip empty lines and comments
      if (!line || line.startsWith('#')) {
        continue;
      }
      
      // Remove inline comments (but be careful with URLs and other content)
      const hashIndex = line.indexOf('#');
      if (hashIndex > 0) {
        // Only remove if there's a space before the hash (likely a comment)
        const beforeHash = line.substring(0, hashIndex);
        if (beforeHash.trim().endsWith(' ') || beforeHash.includes(':')) {
          line = beforeHash.trim();
        }
      }
      
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');
      
      // Handle arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        if (arrayContent.trim()) {
          const arrayValues = arrayContent
            .split(',')
            .map(item => item.trim().replace(/^["']|["']$/g, ''))
            .filter(item => item.length > 0);
          frontmatter[key] = arrayValues;
        } else {
          frontmatter[key] = [];
        }
      } else {
        frontmatter[key] = value;
      }
    }
    
    return { frontmatter, content: markdownContent };
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
    return null;
  }
}

// Convert markdown to HTML
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    
    // Blockquotes
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    
    // Lists
    .replace(/^\* (.*$)/gm, '<li>$1</li>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    
    // Wrap consecutive list items in ul tags
    .replace(/(<li>.*<\/li>)/gs, (match) => {
      return `<ul>${match}</ul>`;
    })
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    
    // Paragraphs
    .split('\n\n')
    .map(paragraph => {
      paragraph = paragraph.trim();
      if (!paragraph) return '';
      if (paragraph.startsWith('<')) return paragraph;
      return `<p>${paragraph.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');
}

// Get display category from tags
function getDisplayCategory(tags: string[]): string {
  const tagToCategoryMap: Record<string, string> = {
    'qa-processes': 'QA Processes',
    'quality-mindset': 'Quality Mindset',
    'career-advice': 'Career Advice',
    'industry-trends': 'Industry Trends',
    'tools-tech': 'Tools & Tech',
    'case-studies': 'Case Studies'
  };

  for (const tag of tags) {
    if (tagToCategoryMap[tag]) {
      return tagToCategoryMap[tag];
    }
  }

  return 'QA Processes';
}

// Generate ID from filename
function generateId(filename: string): number {
  let hash = 0;
  for (let i = 0; i < filename.length; i++) {
    const char = filename.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % 10000 + 1;
}

// Check if filename should be skipped
function shouldSkipFile(filename: string): boolean {
  const skipPatterns = [
    '_template',
    'template',
    'example',
    'your-post-title',
    'your-blog-post'
  ];
  
  // Skip if starts with _ or draft-
  if (filename.startsWith('_') || filename.startsWith('draft-')) {
    return true;
  }
  
  // Skip if contains any skip patterns
  return skipPatterns.some(pattern => filename.includes(pattern));
}

// Check if slug should be skipped
function shouldSkipSlug(slug: string): boolean {
  const skipPatterns = [
    'template',
    'example', 
    'your-post-title',
    'your-blog-post'
  ];
  
  return skipPatterns.some(pattern => slug.includes(pattern));
}

// Load all blog posts dynamically
export async function loadBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  try {
    // Get all markdown files dynamically
    const modules = import.meta.glob('../data/posts/*.md', { 
      eager: false,
      as: 'raw' 
    });
    
    console.log('Found markdown files:', Object.keys(modules));
    
    // Process each file
    for (const [path, moduleLoader] of Object.entries(modules)) {
      try {
        const filename = path.split('/').pop()?.replace('.md', '') || '';
        console.log(`Processing file: ${filename}`);
        
        // Skip template and draft files
        if (shouldSkipFile(filename)) {
          console.log(`Skipping file: ${filename} (template/draft)`);
          continue;
        }
        
        // Load the file content
        const content = await moduleLoader() as string;
        
        if (!content || typeof content !== 'string' || content.trim().length === 0) {
          console.warn(`Skipping empty file: ${filename}`);
          continue;
        }
        
        // Parse frontmatter
        const parsed = parseFrontmatter(content);
        if (!parsed) {
          console.warn(`Failed to parse frontmatter for: ${filename}`);
          continue;
        }
        
        const { frontmatter, content: markdownContent } = parsed;
        
        // Validate required fields
        if (!frontmatter.title || !frontmatter.slug) {
          console.warn(`Missing required fields in: ${filename}`);
          continue;
        }
        
        // Skip template slugs
        if (shouldSkipSlug(frontmatter.slug)) {
          console.log(`Skipping template slug: ${frontmatter.slug}`);
          continue;
        }
        
        // Create blog post object
        const post: BlogPost = {
          id: generateId(filename),
          title: frontmatter.title || 'Untitled',
          excerpt: frontmatter.excerpt || '',
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          readTime: frontmatter.readTime || '5 min read',
          date: frontmatter.date || new Date().toISOString().split('T')[0],
          slug: frontmatter.slug || filename,
          author: resolveAuthorName(frontmatter.author),
          content: markdownToHtml(markdownContent),
          category: getDisplayCategory(Array.isArray(frontmatter.tags) ? frontmatter.tags : [])
        };
        
        console.log(`Successfully processed: ${filename} -> ${post.slug}`);
        posts.push(post);
        
      } catch (error) {
        console.error(`Error processing file ${path}:`, error);
      }
    }
    
    console.log(`Total posts loaded: ${posts.length}`);
    
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Helper function to resolve author names from IDs or names
function resolveAuthorName(authorInput: string): string {
  if (!authorInput) {
    return AUTHORS.author1.name;
  }
  
  // Check if it's an author ID first
  const authorById = getAuthorById(authorInput);
  if (authorById) {
    return authorById.name;
  }
  
  // Check if it's already a valid author name
  const authorByName = getAuthorByName(authorInput);
  if (authorByName) {
    return authorInput;
  }
  
  // Fallback to first author
  return AUTHORS.author1.name;
}

// Get posts by category
export function getPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
  if (category === 'All') return posts;
  
  const categoryToTagMap: Record<string, string> = {
    'QA Processes': 'qa-processes',
    'Quality Mindset': 'quality-mindset',
    'Career Advice': 'career-advice',
    'Industry Trends': 'industry-trends',
    'Tools & Tech': 'tools-tech',
    'Case Studies': 'case-studies'
  };
  
  const tagToFind = categoryToTagMap[category];
  if (!tagToFind) return posts;
  
  return posts.filter(post => post.tags.includes(tagToFind));
}

// Get post by slug
export function getPostBySlug(posts: BlogPost[], slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug);
}

// Get latest posts
export function getLatestPosts(posts: BlogPost[], count: number = 3): BlogPost[] {
  return posts.slice(0, count);
}

// Get posts by tag
export function getPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter(post => post.tags && post.tags.includes(tag));
}

// Get featured posts
export function getFeaturedPosts(posts: BlogPost[], count: number = 3): BlogPost[] {
  const featuredPosts = posts.filter(post => post.tags && post.tags.includes('featured'));
  return featuredPosts.slice(0, count);
}

// Get posts by author
export function getPostsByAuthor(posts: BlogPost[], authorName: string): BlogPost[] {
  return posts.filter(post => post.author === authorName);
}

// Get posts by author slug
export function getPostsByAuthorSlug(posts: BlogPost[], authorSlug: string): BlogPost[] {
  const author = Object.values(AUTHORS).find(a => a.slug === authorSlug);
  if (!author) return [];
  return posts.filter(post => post.author === author.name);
}

// Legacy exports for backward compatibility
export const getBlogPosts = loadBlogPosts;