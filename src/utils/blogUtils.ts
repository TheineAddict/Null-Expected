import { BlogPost } from '../types/blog';

// Dynamic import function that works at runtime
async function loadMarkdownFiles(): Promise<Record<string, string>> {
  const modules: Record<string, string> = {};
  
  try {
    // Use dynamic imports to load all markdown files
    const postModules = import.meta.glob('../data/posts/*.md', { 
      eager: false,  // Changed to false for dynamic loading
      as: 'raw' 
    });
    
    // Load all modules dynamically
    for (const [path, moduleLoader] of Object.entries(postModules)) {
      try {
        const content = await moduleLoader() as string;
        modules[path] = content;
      } catch (error) {
        console.warn(`Failed to load ${path}:`, error);
      }
    }
  } catch (error) {
    console.error('Failed to load markdown modules:', error);
  }
  
  return modules;
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('Invalid markdown format - missing frontmatter');
  }
  
  const [, frontmatterStr, markdownContent] = match;
  const frontmatter: Record<string, string | string[]> = {};
  
  // Parse YAML-like frontmatter
  frontmatterStr.split('\n').forEach(line => {
    // Skip comment-only lines
    if (line.trim().startsWith('#')) {
      return;
    }
    
    // Remove inline comments more carefully
    const commentIndex = line.indexOf('#');
    if (commentIndex > 0) {
      // Only remove comment if there's actual YAML content before it
      const beforeComment = line.substring(0, commentIndex).trim();
      if (beforeComment.includes(':')) {
        line = beforeComment;
      }
    }
    
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      
      // Handle arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        const arrayValues = arrayContent.split(',').map(item => item.trim().replace(/^["']|["']$/g, '')).filter(item => item.length > 0);
        frontmatter[key] = arrayValues;
        return;
      }
      
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter, content: markdownContent };
}

// Convert markdown content to HTML (basic conversion)
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
    
    // Wrap consecutive list items in ul/ol tags
    .replace(/(<li>.*<\/li>)/gs, (match) => {
      return `<ul>${match}</ul>`;
    })
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    
    // Paragraphs (split by double newlines)
    .split('\n\n')
    .map(paragraph => {
      paragraph = paragraph.trim();
      if (!paragraph) return '';
      if (paragraph.startsWith('<')) return paragraph; // Already HTML
      return `<p>${paragraph.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');
}

// Convert tag to display category
function getDisplayCategory(tags: string[]): string {
  const tagToCategoryMap: Record<string, string> = {
    'qa-processes': 'QA Processes',
    'quality-mindset': 'Quality Mindset',
    'career-advice': 'Career Advice',
    'industry-trends': 'Industry Trends',
    'tools-tech': 'Tools & Tech',
    'case-studies': 'Case Studies'
  };

  // Find the first category tag
  for (const tag of tags) {
    if (tagToCategoryMap[tag]) {
      return tagToCategoryMap[tag];
    }
  }

  // Default category if no category tag found
  return 'QA Processes';
}

// Generate auto-incrementing ID based on filename
function generateId(filename: string): number {
  // Extract number from filename or use hash of filename
  const match = filename.match(/(\d+)/);
  if (match) {
    return parseInt(match[1]);
  }
  
  // If no number in filename, generate based on filename hash
  let hash = 0;
  for (let i = 0; i < filename.length; i++) {
    const char = filename.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) % 1000 + 1; // Keep it reasonable
}

// Cache for loaded posts to avoid reloading on every call
let cachedPosts: BlogPost[] | null = null;
let lastLoadTime = 0;
const CACHE_DURATION = 5000; // 5 seconds cache

// Load and parse all blog posts with caching
export async function loadBlogPosts(): Promise<BlogPost[]> {
  // Return cached posts if still valid (for performance)
  const now = Date.now();
  if (cachedPosts && (now - lastLoadTime) < CACHE_DURATION) {
    return cachedPosts;
  }

  const posts: BlogPost[] = [];
  
  try {
    const postModules = await loadMarkdownFiles();
    
    Object.entries(postModules).forEach(([path, content]) => {
      try {
        const filename = path.split('/').pop()?.replace('.md', '') || '';
        console.log(`Processing file: ${filename}`);
        
        // Skip template files and invalid filenames
        if (filename.includes('your-post-title') || 
            filename.includes('template') || 
            filename.includes('example') ||
            filename.startsWith('_') ||
            filename.startsWith('draft-')) {
          console.log(`Skipping template/example file: ${filename}`);
          return;
        }
        
        // Skip empty or invalid files
        if (!content || typeof content !== 'string' || content.trim().length === 0) {
          console.warn(`Skipping empty or invalid file: ${path}`);
          return;
        }
        
        const { frontmatter, content: markdownContent } = parseFrontmatter(content);
        console.log(`Parsed frontmatter for ${filename}:`, frontmatter);
        
        // Additional validation - skip if slug contains template indicators
        if (frontmatter.slug && (
            frontmatter.slug.includes('your-blog-post') || 
            frontmatter.slug.includes('template') ||
            frontmatter.slug.includes('example'))) {
          console.log(`Skipping template post with slug: ${frontmatter.slug}`);
          return;
        }
        
        const post: BlogPost = {
          id: generateId(filename),
          title: frontmatter.title as string || 'Untitled',
          excerpt: frontmatter.excerpt as string || '',
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          readTime: frontmatter.readTime as string || '5 min read',
          date: frontmatter.date as string || new Date().toISOString().split('T')[0],
          slug: frontmatter.slug as string || filename,
          author: frontmatter.author as BlogPost['author'] || 'Jane Smith',
          content: markdownToHtml(markdownContent),
          category: getDisplayCategory(Array.isArray(frontmatter.tags) ? frontmatter.tags : [])
        };
        
        posts.push(post);
      } catch (error) {
        console.error(`Error parsing blog post ${path}:`, error);
      }
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
  
  // Sort by date (newest first)
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Update cache
  cachedPosts = sortedPosts;
  lastLoadTime = now;
  
  return sortedPosts;
}

// Synchronous wrapper that returns cached posts or empty array
export function getBlogPosts(): BlogPost[] {
  if (cachedPosts) {
    return cachedPosts;
  }
  
  // Trigger async load and return empty array for now
  loadBlogPosts().then(posts => {
    cachedPosts = posts;
  });
  
  return [];
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getBlogPosts();
  if (category === 'All') return posts;
  
  // Map display category back to tag
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
export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug);
}

// Get latest posts
export function getLatestPosts(count: number = 3): BlogPost[] {
  const posts = getBlogPosts();
  return posts.slice(0, count);
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getBlogPosts();
  return posts.filter(post => post.tags && post.tags.includes(tag));
}

// Get featured posts
export function getFeaturedPosts(count: number = 3): BlogPost[] {
  const posts = getBlogPosts();
  const featuredPosts = posts.filter(post => post.tags && post.tags.includes('featured'));
  return featuredPosts.slice(0, count);
}