import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadBlogPosts, getPostsByCategory, getPostsByTag, getVisibleBlogTags } from '../utils/blogUtils';
import { BlogPost } from '../types/blog';
import { SEO } from '../components/SEO';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const location = useLocation();

  const categories = [
    'All',
    'QA Processes',
    'Quality Mindset',
    'Career Advice',
    'Industry Trends',
    'Tools & Tech',
    'Case Studies',
    'Unpopular Opinion',
    'Expected Behaviour'
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
      setVisibleCount(6);
    }
  }, [activeCategory, activeTag, allPosts]);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleJumpToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <SEO
        title="Writing & Insights | Null Expected"
        description="Practitioner-led writing on software quality, testing, release governance, technical delivery, and QA careers."
        path="/blog"
      />
      {/* Header */}
      <section className="py-18 md:py-22" style={{ paddingTop: '72px', paddingBottom: '72px' }}>
        <div className="site-shell">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
                Articles &amp; field notes
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Practitioner-led writing on software quality, testing, release governance, technical delivery and QA careers.
              </p>
              {activeTag && (
                <div className="mt-6">
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
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="/Null-Expected-Cat-Icon-Pack/cat-working.svg"
                alt="Null Expected cat writing practitioner notes"
                className="w-[260px] md:w-[360px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      {!activeTag && (
        <section className="border-t border-gray-200">
          <div className="site-shell pt-6 pb-10">
            <span className="block text-sm font-medium text-gray-500 mb-4">Filter by topic</span>
            <div className="flex md:flex-wrap gap-2 overflow-x-auto md:overflow-visible md:justify-start -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-shrink-0 px-4 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeCategory === category
                      ? 'bg-indigo-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ minHeight: '44px' }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="site-shell">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-8" aria-hidden="true">
                <div className="flex items-center justify-between mb-4">
                  <div className="skeleton h-6 w-24 rounded-full" />
                  <div className="skeleton h-4 w-12 rounded" />
                </div>
                <div className="skeleton h-6 w-full rounded mb-3" />
                <div className="skeleton h-6 w-3/4 rounded mb-4" />
                <div className="skeleton h-4 w-full rounded mb-2" />
                <div className="skeleton h-4 w-full rounded mb-2" />
                <div className="skeleton h-4 w-2/3 rounded mb-6" />
                <div className="flex items-center justify-between">
                  <div className="skeleton h-4 w-28 rounded" />
                  <div className="skeleton h-4 w-20 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post) => (
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

                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-bold text-indigo-900 mb-3 leading-tight hover:text-gray-900 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {getVisibleBlogTags(post.tags).slice(0, 3).map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-2 py-1 bg-gray-100 text-indigo-900 text-xs rounded hover:text-gray-900 transition-colors"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      #{tag}
                    </Link>
                  ))}
                  {getVisibleBlogTags(post.tags).length > 3 && (
                    <span className="px-2 py-1 text-gray-400 text-xs">
                      +{getVisibleBlogTags(post.tags).length - 3} more
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
                    className="inline-flex items-center text-indigo-900 hover:text-gray-900 font-semibold transition-colors"
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
            <div className="flex justify-center mb-6">
              <img
                src="/Null-Expected-Cat-Icon-Pack/cat-looking-for-bugs.svg"
                alt="Cat looking for posts"
                className="w-32 h-32"
                style={{ transform: 'rotate(-10deg)' }}
              />
            </div>
            <p className="text-gray-500 text-lg">
              {activeTag ? `No posts found with tag "${activeTag}" yet.` : 'No posts found in this category yet.'} Stay tuned!
            </p>
            <div className="text-sm text-gray-400 font-mono mt-2">
              [ {activeTag ? 'posts_with_tag' : 'posts_in_category'} = 0 ]
            </div>
          </div>
        )}

        {/* Show More / Jump to Top */}
        {!loading && posts.length > 6 && (
          <div className="text-center mt-12">
            {hasMore ? (
              <button
                onClick={handleShowMore}
                className="inline-flex items-center px-8 py-3 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-indigo-800 transition-colors shadow-lg hover:shadow-xl"
              >
                Show More
                <ChevronDown className="ml-2 h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleJumpToTop}
                className="inline-flex items-center px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Jump to Top
                <ChevronUp className="ml-2 h-5 w-5" />
              </button>
            )}
            <div className="text-sm text-gray-400 font-mono mt-4">
              [ showing: {visiblePosts.length} / {posts.length} posts ]
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

export default Blog;
