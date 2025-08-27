import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl">Null:Expected</span>
            </div>
            <p className="text-gray-300 mb-4">
              A QA thought hub. What did you expect?
            </p>
            <p className="text-gray-400 text-sm">
              Curious QA professionals sharing insights on quality, processes, and the ever-evolving world of software testing.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigate</h3>
            <div className="space-y-2">
              <Link to="/" className="text-gray-300 hover:text-white block transition-colors">
                Home
              </Link>
              <Link to="/mission" className="text-gray-300 hover:text-white block transition-colors">
                Mission
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white block transition-colors">
                About
              </Link>
              <Link to="/blog" className="text-gray-300 hover:text-white block transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Null:Expected. Always in beta, always improving.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;