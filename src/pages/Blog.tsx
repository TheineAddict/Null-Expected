import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Clock, ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadBlogPosts, getPostsByCategory, getPostsByTag } from '../utils/blogUtils';
import { BlogPost } from '../types/blog';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const categories = [
    'All',
    'QA Processes',
    'Quality Mindset',
    'Career Advice',
    'Industry Trends',
    'Tools & Tech',
    'Case Studies'
  ];

  // Check for category and tag parameters in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category');
    const tagParam = urlParams.get('tag');
    
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
      setActiveTag(null); // Clear tag filter when category is set
    } else if (tagParam) {
      setActiveTag(tagParam);
      setActiveCategory('All'); // Reset category when tag is set
    }
  }, [location.search]);

  // Load all posts once
  useEffect(() => {
    const loadAllPosts = async () => {
      setLoading(true);
      try {
        console.log('Loading all blog posts...');
        const loadedPosts = await loadBlogPosts();
        console.log('Loaded posts:', loadedPosts.length);
        setAllPosts(loadedPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllPosts();
  }, []);

  // Filter posts when category or tag changes
  useEffect(() => {
    if (allPosts.length > 0) {
      let filteredPosts;
      
      if (activeTag) {
        filteredPosts = getPostsByTag(allPosts, activeTag);
        console.log(`Filtered posts for tag ${activeTag}:`, filteredPosts.length);
      } else {
        filteredPosts = getPostsByCategory(allPosts, activeCategory);
        console.log(`Filtered posts for ${activeCategory}:`, filteredPosts.length);
      }
      
      setPosts(filteredPosts);
    }
  }, [activeCategory, activeTag, allPosts]);

  return (
    <div className="py-20">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          The QA Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Insights, strategies, and honest conversations about software quality
        </p>
        {activeTag && (
          <div className="mb-4">
            <span className="text-sm text-gray-500">Filtered by tag: </span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
              #{activeTag}
            </span>
            <button
              onClick={() => {
                setActiveTag(null);
                setActiveCategory('All');
                window.history.pushState({}, '', '/blog');
              }}
              className="ml-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Clear filter
            </button>
          </div>
        )}
        <div className="text-sm text-gray-500 font-mono">
          [ total_posts: {allPosts.length} | filtered: {posts.length} ]
        </div>
      </section>

      {/* Category Filter */}
      {!activeTag && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-center mb-8">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500 font-medium">Filter by Category</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-indigo-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading posts...</p>
            <div className="text-sm text-gray-400 font-mono mt-2">
              [ scanning_markdown_files = true ]
            </div>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <Link
                    to={`/blog?category=${encodeURIComponent(post.category)}`}
                    className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full hover:bg-indigo-200 transition-colors"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {post.category}
                  </Link>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-900 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      #{tag}
                    </Link>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 text-gray-400 text-xs">
                      +{post.tags.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-indigo-900 hover:text-purple-800 font-semibold transition-colors"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        )}

        {/* No posts message */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {activeTag ? `No posts found with tag "${activeTag}" yet.` : 'No posts found in this category yet.'} Stay tuned!
            </p>
            <div className="text-sm text-gray-400 font-mono mt-2">
              [ {activeTag ? 'posts_with_tag' : 'posts_in_category'} = 0 ]
            </div>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-800 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-indigo-200 mb-8">
            Get notified when we publish new insights and deep-dives into QA practices.
          </p>
          <div className="text-sm text-indigo-300 font-mono">
            [ newsletter_coming_soon = true ]
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;