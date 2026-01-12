import React from 'react';
import { Zap, Target, Users, Search, Settings, Eye } from 'lucide-react';

const Manifesto = () => {
  const principles = [
    {
      title: 'Intention over output',
      description: 'Because a passing test without purpose is just noise.',
      icon: Target,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Understanding over coverage',
      description: '100% test coverage doesn\'t mean 100% confidence.',
      icon: Eye,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Collaboration over gatekeeping',
      description: 'QA should enable, not block.',
      icon: Users,
      color: 'from-indigo-600 to-blue-600'
    },
    {
      title: 'Curiosity over certainty',
      description: 'We ask "why" even when the spec says "done."',
      icon: Search,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Patterns over tools',
      description: 'Tools change. Thinking doesn\'t.',
      icon: Settings,
      color: 'from-purple-600 to-indigo-600'
    },
    {
      title: 'Silence, when expected',
      description: 'A "null" result isn\'t nothing - it\'s trust, verified.',
      icon: Zap,
      color: 'from-indigo-900 to-purple-800'
    }
  ];

  return (
    <div className="py-20">
      <SEO
        title="QA Manifesto - Null:Expected Quality Principles"
        description="Our principles for quality assurance: intention over output, understanding over coverage, collaboration over gatekeeping. The Null:Expected manifesto."
        path="/manifesto"
      />
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-900 to-purple-800 rounded-full mb-6">
            <Zap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Null:Expected Manifesto
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed italic">
            Because quality isn't accidental - and silence still speaks.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center space-y-6 text-lg text-gray-700 leading-relaxed">
          <p className="font-semibold text-xl text-gray-900">
            We are QA professionals, thinkers, and skeptics.
          </p>
          <p>
            We don't just check that software works - we question what "working" really means.
          </p>
          <p>
            We believe that testing is not a phase, a script, or a checkbox.
          </p>
          <p className="text-xl font-semibold text-indigo-900 italic">
            It's a way of seeing.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
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
              This is what drives Null:Expected. A QA thought hub, always in beta.
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