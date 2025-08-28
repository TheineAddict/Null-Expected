import React, { useEffect, useState } from 'react';
import { loadBlogPosts } from '../utils/blogUtils';
import { BlogPost } from '../types/blog';

interface BlogLoaderProps {
  children: (posts: BlogPost[], loading: boolean) => React.ReactNode;
}

export const BlogLoader: React.FC<BlogLoaderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const loadedPosts = await loadBlogPosts();
        setPosts(loadedPosts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return <>{children(posts, loading)}</>;
};