import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, TrendingUp, Settings, BookOpen } from 'lucide-react';
import { loadBlogPosts, getFeaturedPosts } from '../utils/blogUtils';
import { BlogPost } from '../types/blog';
import { SEO } from '../components/SEO';

const Landing = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        console.log('Loading posts for homepage...');
        const allPosts = await loadBlogPosts();
        console.log('All posts loaded:', allPosts.length);
        const featured = getFeaturedPosts(allPosts, 3);
        console.log('Featured posts:', featured.length);
        setFeaturedPosts(featured);
      } catch (error) {
        console.error('Failed to load featured posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const categories = [
    {
      title: 'QA Processes',
      description: 'Methodologies, frameworks, and systematic approaches to quality',
      icon: Target,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Quality Mindset',
      description: 'Philosophy and thinking patterns that drive quality excellence',
      icon: Users,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Career Advice',
      description: 'Growth strategies and insights for QA professionals',
      icon: TrendingUp,
      color: 'from-indigo-600 to-blue-600'
    },
    {
      title: 'Industry Trends',
      description: 'Latest developments and emerging patterns in QA',
      icon: Settings,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Tools & Tech',
      description: 'Reviews, tutorials, and insights on QA tools and technologies',
      icon: BookOpen,
      color: 'from-purple-600 to-indigo-600'
    },
    {
      title: 'Case Studies',
      description: 'Practical examples, lessons learned, and QA stories from the field',
      icon: Settings,
      color: 'from-indigo-800 to-purple-900'
    }
  ];

  return (
    <main>
      <SEO
        title="Null:Expected - A QA Thought Hub by Andreea Vitan"
        description="Testing and release management for grown-up software. Practical, evidence-first QA insights and strategies from an experienced QA and Release Manager."
        path="/"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-screen flex items-center justify-center overflow-hidden py-12 md:py-0">
        {/* Circuit Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(46, 0, 163, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(46, 0, 163, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(80, 0, 255, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(46, 0, 163, 0.3) 0%, transparent 50%)
            `
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6">
              <span className="brand-gradient">
                Null:Expected
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4 font-light">
              A QA thought hub. What did you expect?
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
            Testing and release management for grown-up software. Practical, evidence-first, slightly rebellious.
            </p>
            <p className="text-sm text-gray-500 mb-6 md:mb-8">
              By <Link to="/about" className="text-indigo-900 hover:text-gray-900 transition-colors" onClick={() => window.scrollTo(0, 0)}>Andreea Vitan</Link>
            </p>
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500 mb-8 md:mb-12">
              <span className="px-3 py-1 bg-gray-100 rounded-full font-mono">[ curiosity ]</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full font-mono">[ quality ]</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full font-mono">[ growth ]</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/about"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-indigo-800 hover:border-indigo-900 hover:bg-gray-50 transition-all duration-300 text-sm sm:text-base"
              onClick={() => window.scrollTo(0, 0)}
            >
              About
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 btn-themed font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
              onClick={() => window.scrollTo(0, 0)}
            >
              Explore the Hub
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Explore Quality Insights
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Dive into curated content across different aspects of quality assurance and professional growth
            </p>
          </div>

          {/* Mobile: Show only 3 categories initially with "View More" */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-4 mb-6">
              {categories.slice(0, 3).map((category, index) => (
                <Link
                  to={`/blog?category=${encodeURIComponent(category.title)}`}
                  key={category.title}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 block group"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center flex-shrink-0`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-900 transition-colors">{category.title}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center text-indigo-900 hover:text-gray-900 font-semibold transition-colors"
                onClick={() => window.scrollTo(0, 0)}
              >
                View All Categories
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Desktop: Show all categories in grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                to="/blog"
                key={category.title}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 block group"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-6`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-900 transition-colors">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="text-sm text-gray-500 font-mono">
                  [ {index + 1} of 6 ]
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Featured Insights
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Latest thoughts from the QA community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Loading featured posts...</p>
                <div className="text-sm text-gray-400 font-mono mt-2">
                  [ loading_featured = true ]
                </div>
              </div>
            ) : featuredPosts.length > 0 ? (
              featuredPosts.map((post, index) => (
              <article
                key={post.title}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
              >
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-1 text-sm sm:text-base">{post.excerpt}</p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Link
                        key={tag}
                        to={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-2 py-1 bg-gray-100 text-indigo-900 text-xs rounded hover:text-gray-900 transition-colors"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        #{tag}
                      </Link>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="px-2 py-1 text-gray-400 text-xs">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <div className="mt-auto">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-indigo-900 hover:text-gray-900 font-semibold transition-colors text-sm sm:text-base"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Read Article
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No featured posts available yet.</p>
                <div className="text-sm text-gray-400 font-mono mt-2">
                  [ featured_posts = 0 ]
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-indigo-900 to-purple-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Follow the breadcrumbs
          </h2>
          <p className="text-lg sm:text-xl text-indigo-200 mb-6 md:mb-8">
            Explore articles, rants, and real-world QA strategy in practice.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 btn-themed font-semibold rounded-lg transition-colors shadow-lg text-sm sm:text-base"
            onClick={() => window.scrollTo(0, 0)}
          >
            Browse All Posts
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Landing;
