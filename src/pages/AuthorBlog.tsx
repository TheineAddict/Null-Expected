import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { loadBlogPosts, getPostsByAuthorSlug } from '../utils/blogUtils';
import { BlogPost } from '../types/blog';
import { getAuthorBySlug } from '../config/authors';
import { SEO } from '../components/SEO';
import ArticleCard from '../components/ArticleCard';
import StandardPageHero from '../components/site/StandardPageHero';
import SectionHeading from '../components/site/SectionHeading';

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
    <div>
      <SEO
        title={`${author.name} - Articles on ${author.title} | Null:Expected`}
        description={`Read articles by ${author.name} on QA management, test management, and quality practices. ${author.bio}`}
        path={`/blog/author/${authorSlug}`}
      />
      <StandardPageHero
        title={author.name}
        description={
          <>
            <p className="text-lg text-indigo-900 font-semibold mb-3">
              {author.title}
            </p>
            <p className="leading-relaxed">
              {author.bio}
            </p>
          </>
        }
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

      {/* Author's Posts */}
      <section className="site-section site-shell">
        <div className="mb-10">
          <SectionHeading title={`Posts by ${author.name}`} />
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
                className="site-button-secondary"
              >
                Show more
                <ChevronDown className="ml-2 h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleJumpToTop}
                className="site-button-secondary"
              >
                Back to top
                <ChevronUp className="ml-2 h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </section>

      {/* Back to All Posts CTA */}
      <section className="site-section">
        <div className="site-shell text-center">
          <Link
            to="/blog"
            className="site-button-primary"
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
