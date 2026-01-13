import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, FileQuestion } from 'lucide-react';
import { SEO } from '../components/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <SEO
        title="404 - Page Not Found | Null:Expected"
        description="The page you're looking for doesn't exist."
        path="/404"
      />
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <FileQuestion className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">
            404
          </h1>
          <div className="text-sm text-gray-400 font-mono mb-6">
            [ page_not_found = true ]
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500 mb-4">
            Looking for something specific? Try these:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              to="/blog"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              About
            </Link>
            <Link
              to="/mission"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Mission
            </Link>
            <Link
              to="/consulting"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Consulting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
