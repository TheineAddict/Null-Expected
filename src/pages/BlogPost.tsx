import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Linkedin, Facebook, Twitter, Mail, Link as LinkIcon, Check } from 'lucide-react';
import { loadBlogPosts, getPostBySlug } from '../utils/blogUtils';
import { BlogPost as BlogPostType } from '../types/blog';
import { getAuthorByName } from '../config/authors';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (slug) {
        setLoading(true);
        try {
          console.log('Loading post with slug:', slug);
          const allPosts = await loadBlogPosts();
          console.log('All posts loaded for single post:', allPosts.length);
          const foundPost = getPostBySlug(allPosts, slug);
          console.log('Found post:', foundPost ? foundPost.title : 'Not found');

          if (foundPost) {
            setPost(foundPost);

            // --- SEO update ---
            document.title = `${foundPost.title} | Null Expected`;

            // meta description
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
              metaDescription = document.createElement('meta');
              metaDescription.name = 'description';
              document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', foundPost.excerpt || foundPost.title);

            // og:title
            let ogTitle = document.querySelector('meta[property="og:title"]');
            if (!ogTitle) {
              ogTitle = document.createElement('meta');
              ogTitle.setAttribute('property', 'og:title');
              document.head.appendChild(ogTitle);
            }
            ogTitle.setAttribute('content', foundPost.title);

            // og:description
            let ogDescription = document.querySelector('meta[property="og:description"]');
            if (!ogDescription) {
              ogDescription = document.createElement('meta');
              ogDescription.setAttribute('property', 'og:description');
              document.head.appendChild(ogDescription);
            }
            ogDescription.setAttribute('content', foundPost.excerpt || foundPost.title);

            // og:url
            let ogUrl = document.querySelector('meta[property="og:url"]');
            if (!ogUrl) {
              ogUrl = document.createElement('meta');
              ogUrl.setAttribute('property', 'og:url');
              document.head.appendChild(ogUrl);
            }
            ogUrl.setAttribute('content', `https://www.nullexpected.com/blog/${foundPost.slug}`);
          }
        } catch (error) {
          console.error('Failed to load blog post:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPost();

    // --- Optional cleanup: restore default metadata ---
    return () => {
      document.title = 'Null Expected | A QA Thought Hub';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          'content',
          'A QA thought hub. What did you expect?'
        );
      }
    };
  }, [slug]);

  const shareUrl = post ? `https://www.nullexpected.com/blog/${post.slug}` : '';
  const shareTitle = post?.title || '';
  const shareText = post?.excerpt || '';

  const handleShare = async (platform: string) => {
    switch (platform) {
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
          '_blank',
          'width=600,height=400'
        );
        break;
      case 'email':
        const emailSubject = 'Check out this Null:Expected article!';
        const emailBody = `I thought you might find this article interesting:\n\n${shareTitle}\n${shareUrl}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          // Fallback for browsers that don't support clipboard API
          const textArea = document.createElement('textarea');
          textArea.value = shareUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        }
        break;
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({
              title: shareTitle,
              text: shareText,
              url: shareUrl,
            });
          } catch (err) {
            console.log('Error sharing:', err);
          }
        }
        break;
    }
    setShowShareMenu(false);
  };

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showShareMenu && !target.closest('.share-menu-container')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showShareMenu]);
  if (loading) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600">Loading post...</p>
      </div>
    );
  }

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
          <Link
            to={`/blog?category=${encodeURIComponent(post.category)}`}
            className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full hover:bg-indigo-200 transition-colors"
            onClick={() => window.scrollTo(0, 0)}
          >
            {post.category}
          </Link>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/blog?tag=${encodeURIComponent(tag)}`}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded hover:bg-gray-200 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              #{tag}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6 text-gray-600">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            {(() => {
              const author = getAuthorByName(post.author);
              if (author) {
                return (
                  <Link 
                    to={`/blog/author/${author.slug}`}
                    className="text-indigo-900 hover:text-purple-800 font-semibold transition-colors"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {post.author}
                  </Link>
                );
              }
              return post.author;
            })()}
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
          <div className="relative share-menu-container">
            <button 
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Article
            </button>

            {showShareMenu && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                {/* Native Share (if supported) */}
                {navigator.share && (
                  <button
                    onClick={() => handleShare('native')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center transition-colors"
                  >
                    <Share2 className="h-4 w-4 mr-3 text-gray-600" />
                    <span className="text-gray-700">Share...</span>
                  </button>
                )}
                
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center transition-colors"
                >
                  <Linkedin className="h-4 w-4 mr-3 text-blue-600" />
                  <span className="text-gray-700">Share on LinkedIn</span>
                </button>
                
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center transition-colors"
                >
                  <Facebook className="h-4 w-4 mr-3 text-blue-500" />
                  <span className="text-gray-700">Share on Facebook</span>
                </button>
                
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center transition-colors"
                >
                  <Twitter className="h-4 w-4 mr-3 text-blue-400" />
                  <span className="text-gray-700">Share on X</span>
                </button>
                
                <button
                  onClick={() => handleShare('email')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center transition-colors"
                >
                  <Mail className="h-4 w-4 mr-3 text-gray-600" />
                  <span className="text-gray-700">Share via Email</span>
                </button>
                
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center transition-colors"
                >
                  {copySuccess ? (
                    <>
                      <Check className="h-4 w-4 mr-3 text-green-600" />
                      <span className="text-green-600">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <LinkIcon className="h-4 w-4 mr-3 text-gray-600" />
                      <span className="text-gray-700">Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
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
          {(() => {
            const author = getAuthorByName(post.author);
            if (!author) return null;
            
            return (
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 flex-shrink-0">
                  <img 
                    src={author.imageUrl} 
                    alt={`${author.name} - ${author.title}`}
                    className="w-full h-full object-cover rounded-full shadow-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{author.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {author.bio}
                  </p>
                  <div className="text-sm text-gray-500 font-mono">
                    {author.tag}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Related Posts CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Explore More Insights
        </h3>
        <Link
          to="/blog"
          className="inline-flex items-center px-6 py-3 btn-themed font-semibold rounded-lg transition-all duration-300"
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
