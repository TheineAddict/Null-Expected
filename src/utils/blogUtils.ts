import { BlogPost } from '../types/blog';

// Import all markdown files from the posts directory
const postModules = import.meta.glob('../data/posts/*.md', { 
  eager: true, 
  as: 'raw' 
});

// Parse frontmatter from markdown content
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('Invalid markdown format - missing frontmatter');
  }
  
  const [, frontmatterStr, markdownContent] = match;
  const frontmatter: Record<string, string> = {};
  
  // Parse YAML-like frontmatter
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
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

// Load and parse all blog posts
export function loadBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  
  Object.entries(postModules).forEach(([path, content]) => {
    try {
      const filename = path.split('/').pop()?.replace('.md', '') || '';
      
      // Skip empty or invalid files
      if (!content || typeof content !== 'string' || content.trim().length === 0) {
        console.warn(`Skipping empty or invalid file: ${path}`);
        return;
      }
      
      const { frontmatter, content: markdownContent } = parseFrontmatter(content as string);
      
      const post: BlogPost = {
        id: generateId(filename),
        title: frontmatter.title || 'Untitled',
        excerpt: frontmatter.excerpt || '',
        category: frontmatter.category as BlogPost['category'] || 'QA Processes',
        readTime: frontmatter.readTime || '5 min read',
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        slug: frontmatter.slug || filename,
        author: frontmatter.author as BlogPost['author'] || 'Jane Smith',
        content: markdownToHtml(markdownContent)
      };
      
      posts.push(post);
    } catch (error) {
      console.error(`Error parsing blog post ${path}:`, error);
    }
  });
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  const posts = loadBlogPosts();
  if (category === 'All') return posts;
  return posts.filter(post => post.category === category);
}

// Get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = loadBlogPosts();
  return posts.find(post => post.slug === slug);
}

// Get latest posts
export function getLatestPosts(count: number = 3): BlogPost[] {
  const posts = loadBlogPosts();
  return posts.slice(0, count);
}