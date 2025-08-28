// This file now imports from the blog utilities
// All blog posts are managed as individual markdown files in src/data/posts/

export { 
  loadBlogPosts as getBlogPosts,
  getPostsByCategory,
  getPostBySlug,
  getLatestPosts,
  getPostsByTag,
  getFeaturedPosts
} from '../utils/blogUtils';