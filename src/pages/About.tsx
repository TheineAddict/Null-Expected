import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import { getAllAuthors } from '../config/authors';

const About = () => {
  const authors = getAllAuthors();

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About Us
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          We're QA professionals with different voices, shared curiosity, and far too many 
          opinions about software quality. This is our thought hub — part roadmap, part portfolio, 
          always in beta.
        </p>
      </section>

      {/* Team Members */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 ${authors.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-12 lg:gap-16`}>
          {authors.map((author, index) => (
          <div key={author.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              {/* Author Image */}
              <div className="w-32 h-32 mb-6">
                <img 
                  src={author.imageUrl} 
                  alt={`${author.name} - ${author.title}`}
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{author.name}</h2>
              <p className="text-indigo-900 font-semibold mb-6">{author.title}</p>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {author.bio}
              </p>
              
              <div className="text-sm text-gray-500 mb-6 font-mono">
                {author.tag}
              </div>
              
              <div className="flex space-x-4">
                {author.linkedinUrl && (
                  <a 
                    href={author.linkedinUrl} 
                    className="flex items-center space-x-2 text-indigo-900 hover:text-purple-800 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                )}
                <Link
                  to={`/blog/author/${author.slug}`}
                  className="flex items-center space-x-2 text-indigo-900 hover:text-purple-800 transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <span>View Posts</span>
                </Link>
              </div>
            </div>
          </div>
          ))}
        </div>
        
        {/* Name Explanation Section */}
        <div className="mt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our individual bios live here, but the <Link to="/manifesto" className="text-indigo-900 hover:text-purple-800 font-semibold transition-colors" onClick={() => window.scrollTo(0, 0)}>Manifesto</Link> speaks for what drives us.
              </p>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">Null:Expected</strong> is a play on a software testing term — where "null" means nothing is returned, and that's the expected result.
                </p>
                <p>
                  But in QA, even that "nothing" is deliberate. It reflects a decision, a rule, or a user expectation.
                </p>
                <p>
                  The name reminds us that behind every outcome — even silence — there's intent, and quality depends on understanding that.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gray-50 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Approach
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                We believe that the best QA insights come from real-world experience, 
                honest reflection, and the willingness to challenge conventional wisdom. 
                Our posts aren't just theoretical—they're battle-tested strategies and 
                hard-earned lessons from the trenches.
              </p>
              <p>
                Whether we're exploring the psychology of bug hunting, dissecting the 
                latest testing frameworks, or debating the future of quality assurance, 
                we bring both expertise and curiosity to every conversation.
              </p>
              <div className="inline-flex items-center space-x-4 mt-8 text-gray-500 font-mono text-sm">
                <span className="px-3 py-1 bg-white rounded-full shadow-sm">[ plan ]</span>
                <span className="px-3 py-1 bg-white rounded-full shadow-sm">[ test ]</span>
                <span className="px-3 py-1 bg-white rounded-full shadow-sm">[ release ]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions, ideas, or want to collaborate? We'd love to hear from you.
          </p>
          <div className="space-y-4">
            <p className="text-gray-600">
              Find us on LinkedIn or drop us a line about potential guest posts, 
              speaking opportunities, or just to chat about all things QA.
            </p>
            <div className="text-sm text-gray-500 font-mono">
              [ status: open_to_collaboration ]
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;