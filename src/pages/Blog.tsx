import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Clock, ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadBlogPosts } from '../utils/blogUtils';
import { BlogPost } from '../types/blog';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState<BlogPost[]>([]);
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

  // Check for category parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [location.search]);

  // Load posts when category changes
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const allPosts = await loadBlogPosts();
        
        let filteredPosts = allPosts;
        if (activeCategory !== 'All') {
          // Map display category back to tag
          const categoryToTagMap: Record<string, string> = {
            'QA Processes': 'qa-processes',
            'Quality Mindset': 'quality-mindset',
            'Career Advice': 'career-advice',
            'Industry Trends': 'industry-trends',
            'Tools & Tech': 'tools-tech',
            'Case Studies': 'case-studies'
          };
          
          const tagToFind = categoryToTagMap[activeCategory];
          if (tagToFind) {
            filteredPosts = allPosts.filter(post => post.tags.includes(tagToFind));
          }
        }
        
        setPosts(filteredPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [activeCategory]);

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
        <div className="text-sm text-gray-500 font-mono">
          [ total_posts: {posts.length} ]
        </div>
      </section>

      {/* Category Filter */}
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

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading posts...</p>
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
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                    {post.category}
                  </span>
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
              No posts found in this category yet. Stay tuned!
            </p>
            <div className="text-sm text-gray-400 font-mono mt-2">
              [ coming_soon = true ]
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