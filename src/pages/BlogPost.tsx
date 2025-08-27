import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import { getPostBySlug } from '../data/blogPosts';
import { BlogPost as BlogPostType } from '../types/blog';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | undefined>(undefined);

  useEffect(() => {
    if (slug) {
      const fetchedPost = getPostBySlug(slug);
      setPost(fetchedPost);
    }
  }, [slug]);

  // Get author info based on post author
  const getAuthorInfo = (authorName: string) => {
    const authors = {
      'Jane Smith': {
        initials: 'JS',
        bio: 'Senior QA Engineer with over 8 years of experience in test automation frameworks and performance testing. Passionate about building scalable testing strategies and mentoring junior QA professionals.',
        tag: '[ automation_enthusiast = true ]'
      },
      'Alex Davis': {
        initials: 'AD',
        bio: 'QA Lead & Strategy Consultant with 10+ years of experience in quality strategy and team leadership. Known for pragmatic approach to QA and ability to translate technical concepts into business value.',
        tag: '[ process_optimizer = true ]'
      }
    };
    return authors[authorName as keyof typeof authors] || authors['Jane Smith'];
  };

  if (!post) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Post Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The blog post you're looking for doesn't exist.
        </p>
        <Link to="/blog" className="text-indigo-900 hover:text-purple-800 font-semibold">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="py-12">
      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-indigo-900 hover:text-purple-800 font-semibold transition-colors"
          onClick={() => window.scrollTo(0, 0)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      {/* Post Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="mb-6">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-600">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            {post.author}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {post.readTime}
          </div>
        </div>

        {/* Share Button */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <button className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            <Share2 className="h-4 w-4 mr-2" />
            Share Article
          </button>
        </div>
      </header>

      {/* Post Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="prose prose-lg prose-indigo max-w-none
                     prose-headings:font-bold prose-headings:text-gray-900
                     prose-p:text-gray-700 prose-p:leading-relaxed
                     prose-a:text-indigo-900 prose-a:no-underline hover:prose-a:text-purple-800
                     prose-blockquote:border-indigo-200 prose-blockquote:bg-indigo-50 prose-blockquote:p-6 prose-blockquote:rounded-lg prose-blockquote:not-italic
                     prose-ul:text-gray-700 prose-ol:text-gray-700
                     prose-li:my-2
                     prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Author Bio */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-gray-200">
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-white">{getAuthorInfo(post.author).initials}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{post.author}</h3>
              <p className="text-gray-600 mb-4">
                {getAuthorInfo(post.author).bio}
              </p>
              <div className="text-sm text-gray-500 font-mono">
                {getAuthorInfo(post.author).tag}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Explore More Insights
        </h3>
        <Link
          to="/blog"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-900 to-purple-800 text-white font-semibold rounded-lg hover:from-indigo-800 hover:to-purple-700 transition-all duration-300"
          onClick={() => window.scrollTo(0, 0)}
        >
          View All Posts
          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;