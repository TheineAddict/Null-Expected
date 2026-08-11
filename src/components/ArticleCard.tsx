import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { getVisibleBlogTags } from '../utils/blogUtils';

type ArticleCardProps = {
  post: BlogPost;
};

const ArticleCard = ({ post }: ArticleCardProps) => {
  const visibleTags = getVisibleBlogTags(post.tags).slice(0, 2);

  return (
    <article className="article-card">
      <div className="flex items-center justify-between mb-4">
        <Link
          to={`/blog?category=${encodeURIComponent(post.category || 'QA Processes')}`}
          className="text-sm font-medium text-indigo-900 hover:text-indigo-700 transition-colors"
          onClick={() => window.scrollTo(0, 0)}
        >
          {post.category}
        </Link>
        <span className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          {post.readTime}
        </span>
      </div>

      <Link to={`/blog/${post.slug}`} onClick={() => window.scrollTo(0, 0)}>
        <h3 className="article-card-title">
          {post.title}
        </h3>
      </Link>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {post.excerpt}
      </p>

      {visibleTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {visibleTags.map((tag) => (
            <Link
              key={tag}
              to={`/blog?tag=${encodeURIComponent(tag)}`}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-gray-200 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-auto pt-2 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-indigo-900 hover:text-indigo-700 font-semibold text-sm transition-colors"
          onClick={() => window.scrollTo(0, 0)}
        >
          Read article
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
