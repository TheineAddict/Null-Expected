import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="site-shell py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Brand */}
          <div className="col-span-1 text-left">
            <div className="flex items-center space-x-2 mb-4">
              <div className="brand-chip p-2 rounded-lg">
                <LucideIcons.Code className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Null:Expected</span>
            </div>
            <p className="text-gray-300 text-base mb-2">
              A QA thought hub. What did you expect?
            </p>
            <p className="text-sm text-gray-400">
              Writing on software quality, release governance, and technical delivery.
            </p>
          </div>

          {/* Explore */}
          <div className="text-left">
            <h3 className="font-semibold mb-4">Explore</h3>
            <div className="space-y-2">
              <Link to="/blog?category=QA%20Processes" className="text-gray-300 hover:text-white block transition-colors text-base">
                QA Processes
              </Link>
              <Link to="/blog?category=Quality%20Mindset" className="text-gray-300 hover:text-white block transition-colors text-base">
                Quality Mindset
              </Link>
              <Link to="/blog?category=Career%20Advice" className="text-gray-300 hover:text-white block transition-colors text-base">
                Career Advice
              </Link>
              <Link to="/mission" className="text-gray-300 hover:text-white block transition-colors text-base">
                Mission
              </Link>
            </div>
          </div>

          {/* Null Expected */}
          <div className="text-left">
            <h3 className="font-semibold mb-4">Null Expected</h3>
            <div className="space-y-2">
              <Link to="/about" className="text-gray-300 hover:text-white block transition-colors text-base">
                About
              </Link>
              <Link to="/consulting" className="text-gray-300 hover:text-white block transition-colors text-base">
                Consulting
              </Link>
              <a href="mailto:andreea.vitan@proton.me" className="text-gray-300 hover:text-white block transition-colors text-base">
                Contact
              </a>
              <a href="https://www.linkedin.com/in/adevitan/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white block transition-colors text-base">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 Null:Expected. Always in beta, always improving.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
