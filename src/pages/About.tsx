import React from 'react';
import { Linkedin } from 'lucide-react';

const About = () => {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Author 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              {/* Avatar placeholder */}
              <div className="w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl font-bold text-white">JS</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Jane Smith</h2>
              <p className="text-indigo-900 font-semibold mb-6">Senior QA Engineer</p>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                With over 8 years in QA, Jane specializes in test automation frameworks and 
                performance testing. She's passionate about building scalable testing strategies 
                and mentoring junior QA professionals. When she's not debugging test flakes, 
                you'll find her exploring new testing tools or speaking at QA conferences.
              </p>
              
              <div className="text-sm text-gray-500 mb-6 font-mono">
                [ automation_enthusiast = true ]
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-indigo-900 hover:text-purple-800 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Author 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              {/* Avatar placeholder */}
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl font-bold text-white">AD</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Alex Davis</h2>
              <p className="text-indigo-900 font-semibold mb-6">QA Lead & Strategy Consultant</p>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Alex brings 10+ years of experience in quality strategy and team leadership. 
                He's worked across startups and enterprise organizations, focusing on quality 
                culture transformation and process optimization. Alex is known for his 
                pragmatic approach to QA and his ability to translate technical concepts 
                into business value.
              </p>
              
              <div className="text-sm text-gray-500 mb-6 font-mono">
                [ process_optimizer = true ]
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-indigo-900 hover:text-purple-800 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Name Explanation Section */}
        <div className="mt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our individual bios live here, but the Manifesto speaks for what drives us.
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
                <span className="px-3 py-1 bg-white rounded-full shadow-sm">[ experience ]</span>
                <span className="px-3 py-1 bg-white rounded-full shadow-sm">[ curiosity ]</span>
                <span className="px-3 py-1 bg-white rounded-full shadow-sm">[ growth ]</span>
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