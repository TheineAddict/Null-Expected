// This file now imports from the new blog utilities
// All blog posts are managed as individual markdown files in src/data/posts/
// But now primarily fetches from Blogger API

export { 
  loadBlogPosts as getBlogPosts,
  getPostsByCategory,
  getPostBySlug,
  getLatestPosts
} from '../utils/blogUtils';
