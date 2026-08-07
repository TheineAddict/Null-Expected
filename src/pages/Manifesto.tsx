import React from 'react';
import { Zap, Target, Users, Search, Settings, Eye } from 'lucide-react';
import { SEO } from '../components/SEO';

const Manifesto = () => {
  const principles = [
    {
      title: 'Intention over output',
      description: 'Activity is not evidence. Tests, metrics and reports are useful only when they answer a real question about risk.',
      icon: Target,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Understanding over coverage',
      description: 'Coverage tells us what was exercised. It does not tell us whether we understood the important failure modes.',
      icon: Eye,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Collaboration over gatekeeping',
      description: 'QA should improve the decisions a team can make, not become the department that grants permission to release.',
      icon: Users,
      color: 'from-indigo-600 to-blue-600'
    },
    {
      title: 'Curiosity over certainty',
      description: 'Specifications, dashboards and green pipelines are evidence to examine, not reasons to stop asking questions.',
      icon: Search,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Patterns over tools',
      description: 'Tools change quickly. Risk, feedback, dependencies and failure patterns are the things worth learning to recognise.',
      icon: Settings,
      color: 'from-purple-600 to-indigo-600'
    },
    {
      title: 'Silence, when expected',
      description: 'A null result has meaning only when we know what we expected, what we checked and why the absence of a signal matters.',
      icon: Zap,
      color: 'from-indigo-900 to-purple-800'
    }
  ];

  return (
    <div className="py-20">
      <SEO
        title="The Null Expected Manifesto | Quality, Testing & Delivery"
        description="The principles behind Null Expected: purposeful testing, evidence over appearances, useful governance, professional curiosity and better delivery decisions."
        path="/manifesto"
      />
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <img
              src="/Null-Expected-Cat-Icon-Pack/cat-mascot.svg"
              alt="Null Expected Cat Mascot"
              className="w-24 h-24"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Null:Expected Manifesto
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed italic">
            Quality work should make risk clearer, decisions better, and delivery more honest.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center space-y-6 text-lg text-gray-700 leading-relaxed">
          <p className="font-semibold text-xl text-gray-900">
            We are practitioners, thinkers and professional skeptics.
          </p>
          <p>
            We test software, question assumptions and ask what the evidence actually supports.
          </p>
          <p>
            Testing matters. So do risk, dependencies, release decisions and what happens after deployment.
          </p>
          <p className="text-xl font-semibold text-indigo-900 italic">
            Quality is part of the decision, not the ceremony around it.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <img
            src="/Null-Expected-Cat-Icon-Pack/cat-looking-for-bugs.svg"
            alt="Cat investigating quality principles"
            className="w-20 h-20 mx-auto"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${principle.color} flex items-center justify-center mb-6`}>
                <principle.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h3>
              <p className="text-gray-600 leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white space-y-6">
            <p className="text-xl leading-relaxed">
              These principles shape how Null:Expected approaches testing, quality, release governance and technical delivery.
            </p>
            <div className="text-3xl font-bold">
              What did you expect?
            </div>
            <div className="text-indigo-300 font-mono text-sm mt-8">
              [ manifesto_version = 1.0 ]
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manifesto;