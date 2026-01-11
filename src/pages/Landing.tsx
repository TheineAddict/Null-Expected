import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, TrendingUp, Settings, BookOpen } from 'lucide-react';
import { loadBlogPosts, getFeaturedPosts } from '../utils/blogUtils';
import { BlogPost } from '../types/blog';

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
    <div>
      {/* Hero Section */}
      <header className="relative min-h-screen md:min-h-screen flex items-center justify-center overflow-hidden py-12 md:py-0">
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8">
              <span className="brand-gradient">
                Null:Expected - QA Management & Test Management
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto">
              Null:Expected (Null Expected) is a QA thought hub by Andreea Vitan. I write practical notes on QA management, test management, and shipping software with fewer surprises - for testers, tech leads, and recruiters who want signal over vibes.
            </p>

            {/* Start Here Navigation */}
            <nav aria-label="Start here" className="mb-8 md:mb-12">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <Link
                  to="/blog"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-900 transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Read the blog
                </Link>
                <Link
                  to="/about"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-900 transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  About Andreea Vitan
                </Link>
                <Link
                  to="/mission"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-900 transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Our mission
                </Link>
              </div>
            </nav>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 btn-themed font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
            onClick={() => window.scrollTo(0, 0)}
          >
            Explore the Hub
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </header>

      <main>
        {/* Main Content Pillars */}
        <div className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* QA Processes */}
              <section className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">QA Processes</h2>
                <p className="text-gray-600 mb-6">Methodologies, frameworks, and systematic approaches to quality</p>
                <Link
                  to="/blog?category=QA%20Processes"
                  className="inline-flex items-center text-indigo-900 hover:text-purple-800 font-semibold transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Explore articles
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </section>

              {/* Quality Mindset */}
              <section className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Quality Mindset</h2>
                <p className="text-gray-600 mb-6">Philosophy and thinking patterns that drive quality excellence</p>
                <Link
                  to="/blog?category=Quality%20Mindset"
                  className="inline-flex items-center text-indigo-900 hover:text-purple-800 font-semibold transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Explore articles
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </section>

              {/* Career Advice */}
              <section className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Career Advice</h2>
                <p className="text-gray-600 mb-6">Growth strategies and insights for QA professionals</p>
                <Link
                  to="/blog?category=Career%20Advice"
                  className="inline-flex items-center text-indigo-900 hover:text-purple-800 font-semibold transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Explore articles
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </section>
            </div>
          </div>
        </div>

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
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
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
                      className="inline-flex items-center text-indigo-900 hover:text-purple-800 font-semibold transition-colors text-sm sm:text-base"
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
    </div>
  );
};

export default Landing;
