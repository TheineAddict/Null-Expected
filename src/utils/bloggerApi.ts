// Blogger API integration utilities
export interface BloggerPost {
  id: string;
  title: string;
  content: string;
  published: string;
  updated: string;
  url: string;
  author: {
    displayName: string;
    image?: {
      url: string;
    };
  };
  labels?: string[];
}

export interface BloggerResponse {
  items?: BloggerPost[];
  nextPageToken?: string;
}

// Configuration - you'll need to set these in your environment
const BLOGGER_API_KEY = import.meta.env.VITE_BLOGGER_API_KEY || '';
const BLOG_ID = import.meta.env.VITE_BLOGGER_BLOG_ID || '';

// Base API URL
const BLOGGER_API_BASE = 'https://www.googleapis.com/blogger/v3';

// Fetch posts from Blogger API
export async function fetchBloggerPosts(maxResults: number = 50): Promise<BloggerPost[]> {
  if (!BLOGGER_API_KEY || !BLOG_ID) {
    console.warn('Blogger API key or Blog ID not configured. Using fallback data.');
    return [];
  }

  try {
    const response = await fetch(
      `${BLOGGER_API_BASE}/blogs/${BLOG_ID}/posts?key=${BLOGGER_API_KEY}&maxResults=${maxResults}&status=LIVE&orderBy=published`
    );

    if (!response.ok) {
      throw new Error(`Blogger API error: ${response.status}`);
    }

    const data: BloggerResponse = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching posts from Blogger:', error);
    return [];
  }
}

// Fetch a single post by ID
export async function fetchBloggerPost(postId: string): Promise<BloggerPost | null> {
  if (!BLOGGER_API_KEY || !BLOG_ID) {
    console.warn('Blogger API key or Blog ID not configured.');
    return null;
  }

  try {
    const response = await fetch(
      `${BLOGGER_API_BASE}/blogs/${BLOG_ID}/posts/${postId}?key=${BLOGGER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Blogger API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching post from Blogger:', error);
    return null;
  }
}

// Convert Blogger post to our BlogPost format
export function convertBloggerPost(bloggerPost: BloggerPost): import('../types/blog').BlogPost {
  // Extract excerpt from content (first 200 characters, clean HTML)
  const excerpt = bloggerPost.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 200)
    .trim() + '...';

  // Map author names to our system
  const authorMapping: Record<string, 'Jane Smith' | 'Alex Davis'> = {
    'Jane Smith': 'Jane Smith',
    'Alex Davis': 'Alex Davis',
    // Add more mappings as needed
  };

  const author = authorMapping[bloggerPost.author.displayName] || 'Jane Smith';

  // Determine category from labels
  const validCategories = ['QA Processes', 'Quality Mindset', 'Career Advice', 'Industry Trends', 'Tools & Tech', 'Case Studies'];
  const category = bloggerPost.labels?.find(label => validCategories.includes(label)) as any || 'QA Processes';

  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = bloggerPost.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200)) + ' min read';

  // Create slug from title
  const slug = bloggerPost.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  return {
    id: parseInt(bloggerPost.id) || Math.floor(Math.random() * 1000000),
    title: bloggerPost.title,
    excerpt,
    category,
    readTime,
    date: bloggerPost.published.split('T')[0], // Convert to YYYY-MM-DD
    slug,
    author,
    content: bloggerPost.content
  };
}