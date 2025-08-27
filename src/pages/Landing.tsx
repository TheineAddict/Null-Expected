import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, TrendingUp, Settings, BookOpen } from 'lucide-react';
import { getLatestPosts } from '../data/blogPosts';

const Landing = () => {
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

  const featuredPosts = getLatestPosts(3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent">
                Null:Expected
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
              A QA thought hub. What did you expect?
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-12">
              <span className="px-3 py-1 bg-gray-100 rounded-full font-mono">[ curiosity ]</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full font-mono">[ quality ]</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full font-mono">[ growth ]</span>
            </div>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-900 to-purple-800 text-white font-semibold rounded-lg hover:from-indigo-800 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => window.scrollTo(0, 0)}
          >
            Explore the Hub
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Quality Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive into curated content across different aspects of quality assurance and professional growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.title}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-6`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="text-sm text-gray-500 font-mono">
                  [ {index + 1} of 6 ]
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Insights
            </h2>
            <p className="text-xl text-gray-600">
              Latest thoughts from the QA community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <article
                key={post.title}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{post.excerpt}</p>
                  <Link
                    to="/blog"
                    className="inline-flex items-center text-indigo-900 hover:text-purple-800 font-semibold transition-colors"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Read Article
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Follow the breadcrumbs
          </h2>
          <p className="text-xl text-indigo-200 mb-8">
            Explore articles, rants, and real-world QA strategy in practice.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            onClick={() => window.scrollTo(0, 0)}
          >
            Browse All Posts
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;