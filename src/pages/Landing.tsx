import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, TrendingUp, Settings, BookOpen } from 'lucide-react';
import { loadBlogPosts, getFeaturedPosts } from '../utils/blogUtils';
import { BlogPost } from '../types/blog';
import { SEO } from '../components/SEO';
import ArticleCard from '../components/ArticleCard';

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
      description: 'Test strategy, planning, exploratory testing, risk-based coverage and the mechanics of delivery.',
      icon: Target
    },
    {
      title: 'Quality Mindset',
      description: 'Evidence, ownership and the difference between a green process and a sound decision.',
      icon: Users
    },
    {
      title: 'Career Advice',
      description: 'QA careers, leadership, communication and judgement beyond test execution.',
      icon: TrendingUp
    },
    {
      title: 'Industry Trends',
      description: 'AI in testing, observability and industry shifts examined through practical use.',
      icon: Settings
    },
    {
      title: 'Tools & Tech',
      description: 'Occasional tool coverage focused on process, evidence and outcomes.',
      icon: BookOpen
    },
    {
      title: 'Case Studies',
      description: 'Delivery situations, failure modes and lessons that survive contact with real teams.',
      icon: Settings
    }
  ];

  const consultingAreas = [
    {
      title: 'Software Quality & Test Strategy',
      description:
        'How quality is defined, planned and evidenced so testing reflects real product risk instead of volume.',
      icon: Target
    },
    {
      title: 'Release Governance & Readiness',
      description:
        'Release decisions based on clear, honest information so go/no-go calls are timely and defensible.',
      icon: TrendingUp
    },
    {
      title: 'Technical Delivery',
      description:
        'Coordination across teams so milestones, dependencies and risks stay visible and decisions arrive on time.',
      icon: Users
    },
  ];

  return (
    <main>
      <SEO
        title="Null:Expected - Software Quality, Release Governance & Technical Delivery"
        description="Practitioner-led consulting and independent writing on software quality, release management and technical delivery. Evidence-first, slightly sceptical of process theatre."
        path="/"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20">
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

        <div className="relative z-10 site-shell text-center">
          <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <img
                src="/Null-Expected-Cat-Icon-Pack/cat-mascot.svg"
                alt="Null Expected QA Cat Mascot"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 transition-all duration-300 hover:scale-110"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6">
              <span className="brand-gradient">
                Null:Expected
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4 font-light">
              Software quality, release governance and technical delivery.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-4 max-w-2xl mx-auto">
              Practitioner-led consulting, paired with independent writing about testing, delivery, release management and quality. Evidence-first, slightly sceptical of process theatre.
            </p>
            <p className="text-sm text-gray-500 mb-6 md:mb-8">
              By <Link to="/about" className="text-indigo-900 hover:text-gray-900 transition-colors" onClick={() => window.scrollTo(0, 0)}>Andreea Vitan</Link>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/consulting"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 btn-themed font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
              onClick={() => window.scrollTo(0, 0)}
            >
              Explore consulting
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-indigo-800 hover:border-indigo-900 hover:bg-gray-50 transition-all duration-300 text-sm sm:text-base"
              onClick={() => window.scrollTo(0, 0)}
            >
              Read the blog
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="site-section">
        <div className="site-shell">
          <div className="mb-10 md:mb-12 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Featured Writing
            </h2>
            <p className="site-section-intro">
              Practitioner field notes on testing, delivery and release management - not theory decks.
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
              featuredPosts.map((post) => (
                <ArticleCard key={post.title} post={post} />
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

      {/* Consultancy Areas */}
      <section className="site-section bg-gray-50">
        <div className="site-shell">
          <div className="mb-10 md:mb-12 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Consulting Practice
            </h2>
            <p className="site-section-intro">
              Independent, founder-led work across three related areas - most engagements draw on more than one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-gray-200">
            {consultingAreas.map((area) => (
              <Link
                to="/consulting"
                key={area.title}
                className="block group p-8 md:px-8 md:first:pl-0 md:last:pr-0 border-b md:border-b-0 border-gray-200 last:border-b-0"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="site-icon-tile mb-5">
                  <area.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-900 transition-colors">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="site-section">
        <div className="site-shell">
          <div className="mb-10 md:mb-12 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Explore by Topic
            </h2>
            <p className="site-section-intro">
              Field notes and essays across the breadth of quality, delivery and release work
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {categories.map((category) => (
              <Link
                to={`/blog?category=${encodeURIComponent(category.title)}`}
                key={category.title}
                className="bg-white p-6 block group transition-colors hover:bg-gray-50"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="flex items-center space-x-4">
                  <div className="site-icon-tile !w-11 !h-11">
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-indigo-900 transition-colors">{category.title}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="site-section bg-gradient-to-r from-indigo-900 to-purple-800">
        <div className="site-shell">
          <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Read the latest writing
          </h2>
          <p className="text-lg sm:text-xl text-indigo-200 mb-6 md:mb-8">
            Essays and field notes on software quality, release governance and delivery decisions.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 btn-themed font-semibold rounded-lg transition-colors shadow-lg text-sm sm:text-base"
            onClick={() => window.scrollTo(0, 0)}
          >
            Browse all articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
