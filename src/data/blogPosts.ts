// This file now imports from the new blog utilities
// All blog posts are managed as individual markdown files in src/data/posts/

export { 
  loadBlogPosts as getBlogPosts,
  getPostsByCategory,
  getPostBySlug,
  getLatestPosts
} from '../utils/blogUtils';

// For backward compatibility, export the main blog posts array
import { loadBlogPosts } from '../utils/blogUtils';
export const blogPosts = loadBlogPosts();