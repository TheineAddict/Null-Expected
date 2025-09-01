import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, ArrowRight, User } from 'lucide-react';
import { loadBlogPosts, getPostsByAuthorSlug } from '../utils/blogUtils';
import { BlogPost } from '../types/blog';
import { getAuthorBySlug } from '../config/authors';

const AuthorBlog = () => {
  const { authorSlug } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState<any>(null);

  useEffect(() => {
    const loadAuthorPosts = async () => {
      if (authorSlug) {
        setLoading(true);
        try {
          console.log('Loading posts for author:', authorSlug);
          
          // Get author info
          const authorInfo = getAuthorBySlug(authorSlug);
          setAuthor(authorInfo);
          
          if (authorInfo) {
            // Load all posts and filter by author
            const allPosts = await loadBlogPosts();
            const authorPosts = getPostsByAuthorSlug(allPosts, authorSlug);
            console.log(`Found ${authorPosts.length} posts by ${authorInfo.name}`);
            setPosts(authorPosts);
          }
        } catch (error) {
          console.error('Failed to load author posts:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadAuthorPosts();
  }, [authorSlug]);

  if (loading) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600">Loading author posts...</p>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Author Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The author you're looking for doesn't exist.
        </p>
        <Link to="/blog" className="text-indigo-900 hover:text-purple-800 font-semibold">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-20">
      {/* Back to Blog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-indigo-900 hover:text-purple-800 font-semibold transition-colors"
          onClick={() => window.scrollTo(0, 0)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      {/* Author Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6">
            <img 
              src={author.imageUrl} 
              alt={`${author.name} - ${author.title}`}
              className="w-full h-full object-cover rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {author.name}
          </h1>
          <p className="text-xl text-indigo-900 font-semibold mb-6">
            {author.title}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {author.bio}
          </p>
          <div className="text-sm text-gray-500 font-mono mt-6">
            {author.tag}
          </div>
        </div>
        
        <div className="text-sm text-gray-500 font-mono">
          [ posts_by_author: {posts.length} ]
        </div>
      </section>

      {/* Author's Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Posts by {author.name}
          </h2>
        </div>

        {posts.length > 0 ? (
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

                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-900 transition-colors">
                    {post.title}
                  </h3>

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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No posts by this author yet. Stay tuned!
            </p>
            <div className="text-sm text-gray-400 font-mono mt-2">
              [ author_posts = 0 ]
            </div>
          </div>
        )}
      </section>

      {/* Back to All Posts CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-900 to-purple-800 text-white font-semibold rounded-lg hover:from-indigo-800 hover:to-purple-700 transition-all duration-300"
            onClick={() => window.scrollTo(0, 0)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            View All Posts
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AuthorBlog;