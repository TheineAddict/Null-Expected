import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="brand-chip p-2 rounded-lg">
                <LucideIcons.Code className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl brand-gradient">Null:Expected</span>
            </div>
            <p className="text-gray-300">
              A QA thought hub. What did you expect?
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <div className="space-y-2">
              <Link to="/blog" className="text-gray-300 hover:text-white block transition-colors">
                QA Processes
              </Link>
              <Link to="/blog" className="text-gray-300 hover:text-white block transition-colors">
                Quality Mindset
              </Link>
              <Link to="/blog" className="text-gray-300 hover:text-white block transition-colors">
                Career Advice
              </Link>
            </div>
          </div>

          {/* Behind the Blog */}
          <div>
            <h3 className="font-semibold mb-4">Behind the Blog</h3>
            <div className="space-y-2">
              <Link to="/mission" className="text-gray-300 hover:text-white block transition-colors">
                Our Mission
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white block transition-colors">
                About Us
              </Link>
              <Link to="/consulting" className="text-gray-300 hover:text-white block transition-colors">
                Consulting
              </Link>
              <span className="text-gray-300 block">Contact</span>
            </div>
          </div>

          {/* Coming Soon */}
          <div>
            <h3 className="font-semibold mb-4">Coming Soon</h3>
            <div className="space-y-2">
              <Link to="/consulting" className="text-gray-300 hover:text-white block transition-colors">
                Consulting
              </Link>
              <span className="text-gray-300 block">Guest Posts – Opening Soon</span>
              <Link to="/manifesto" className="text-gray-300 hover:text-white block transition-colors">
                Read the Manifesto
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Null:Expected. Always in beta, always improving.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
