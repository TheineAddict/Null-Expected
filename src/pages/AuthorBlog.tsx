import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { loadBlogPosts, getPostsByAuthorSlug } from '../utils/blogUtils';
import { BlogPost } from '../types/blog';
import { getAuthorBySlug } from '../config/authors';
import { SEO } from '../components/SEO';
import ArticleCard from '../components/ArticleCard';

const AuthorBlog = () => {
  const { authorSlug } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState<any>(null);
  const [visibleCount, setVisibleCount] = useState(6);

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
            setVisibleCount(6);
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

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleJumpToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="site-shell py-20 text-center">
        <p className="text-gray-600">Loading author posts...</p>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="site-shell py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Author not found
        </h1>
        <p className="text-gray-600 mb-8">
          The author you're looking for doesn't exist.
        </p>
        <Link to="/blog" className="text-indigo-900 hover:text-gray-900 font-semibold">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16">
      <SEO
        title={`${author.name} - Articles on ${author.title} | Null:Expected`}
        description={`Read articles by ${author.name} on QA management, test management, and quality practices. ${author.bio}`}
        path={`/blog/author/${authorSlug}`}
      />
      {/* Back to Blog */}
      <div className="site-shell mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-indigo-900 hover:text-gray-900 font-semibold transition-colors"
          onClick={() => window.scrollTo(0, 0)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to blog
        </Link>
      </div>

      {/* Author Header — compact two-column */}
      <section className="site-shell mb-14">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
          <div className="flex justify-center md:justify-start">
            <img
              src={author.imageUrl}
              alt={`${author.name} - ${author.title}`}
              className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-full shadow-md"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {author.name}
            </h1>
            <p className="text-lg text-indigo-900 font-semibold mb-3">
              {author.title}
            </p>
            <p className="text-gray-600 leading-relaxed max-w-2xl md:mx-0 mx-auto">
              {author.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Author's Posts */}
      <section className="site-shell">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Posts by {author.name}
          </h2>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No posts by this author yet. Stay tuned!
            </p>
          </div>
        )}

        {/* Show more / Back to top */}
        {!loading && posts.length > 6 && (
          <div className="text-center mt-12">
            {hasMore ? (
              <button
                onClick={handleShowMore}
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Show more
                <ChevronDown className="ml-2 h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleJumpToTop}
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Back to top
                <ChevronUp className="ml-2 h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </section>

      {/* Back to All Posts CTA */}
      <section className="py-16">
        <div className="site-shell text-center">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 btn-themed font-semibold rounded-lg transition-all duration-300"
            onClick={() => window.scrollTo(0, 0)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            View all posts
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AuthorBlog;
