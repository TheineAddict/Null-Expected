import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="brand-chip p-2 rounded-lg">
                <LucideIcons.Code className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl brand-gradient">Null:Expected</span>
            </div>
            <p className="text-gray-300 mb-2">
              A QA thought hub. What did you expect?
            </p>
            <p className="text-sm text-gray-400">
              Writing on software quality, release governance, and technical delivery.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <div className="space-y-2">
              <Link to="/blog?category=QA%20Processes" className="text-gray-300 hover:text-white block transition-colors">
                QA Processes
              </Link>
              <Link to="/blog?category=Quality%20Mindset" className="text-gray-300 hover:text-white block transition-colors">
                Quality Mindset
              </Link>
              <Link to="/blog?category=Career%20Advice" className="text-gray-300 hover:text-white block transition-colors">
                Career Advice
              </Link>
            </div>
          </div>

          {/* Null Expected */}
          <div>
            <h3 className="font-semibold mb-4">Null Expected</h3>
            <div className="space-y-2">
              <Link to="/about" className="text-gray-300 hover:text-white block transition-colors">
                About
              </Link>
              <Link to="/consulting" className="text-gray-300 hover:text-white block transition-colors">
                Consulting
              </Link>
              <Link to="/mission" className="text-gray-300 hover:text-white block transition-colors">
                Mission
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Null:Expected. Always in beta, always improving.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
