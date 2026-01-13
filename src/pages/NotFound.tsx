import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
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
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-indigo-900 to-purple-800 rounded-full mb-6">
            <Search className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">
            404
          </h1>
          <div className="text-sm text-gray-500 font-mono mb-6">
            [ route_exists = false ]
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            This route doesn't exist. Maybe it never did, or maybe we refactored it away.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 btn-themed font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-indigo-800 hover:border-indigo-900 hover:bg-gray-50 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>

        <div className="mt-12" id="quick-links">
          <p className="text-sm text-gray-500 mb-4">
            Or explore these sections:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              to="/blog"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              About
            </Link>
            <Link
              to="/mission"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Mission
            </Link>
            <Link
              to="/consulting"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
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
