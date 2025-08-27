import React from 'react';
import { Search, Users, Lightbulb, TrendingUp, Target, Zap } from 'lucide-react';

const Mission = () => {
  const values = [
    {
      title: 'Curiosity',
      description: 'We ask the questions others might miss, diving deep into the "why" behind quality practices.',
      icon: Search,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Collaboration',
      description: 'Quality is a team sport. We believe in sharing knowledge, learning together, and growing as a community.',
      icon: Users,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Clarity',
      description: 'Complex ideas made simple. We break down intricate QA concepts into actionable insights.',
      icon: Lightbulb,
      color: 'from-indigo-600 to-blue-600'
    },
    {
      title: 'Continuous Improvement',
      description: 'Just like the software we test, we\'re always iterating, learning, and evolving our approach.',
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-900 to-purple-800 rounded-full mb-6">
            <Target className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Mission
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We exist to elevate the conversation around quality assurance, 
            one thoughtful post at a time.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-800 py-20 mb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why Null:Expected Exists
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                In a world where software quality often feels like an afterthought, 
                we believe it deserves to be front and center. Quality isn't just about 
                finding bugs—it's about understanding systems, advocating for users, 
                and driving continuous improvement.
              </p>
              <p>
                We're here to challenge assumptions, share hard-won insights, and 
                foster a community where QA professionals can grow, learn, and push 
                the boundaries of what quality means in software development.
              </p>
              <div className="inline-flex items-center space-x-4 mt-8 text-indigo-200 font-mono text-sm">
                <span className="px-3 py-1 bg-white/20 rounded-full">[ curiosity ]</span>
                <span className="px-3 py-1 bg-white/20 rounded-full">[ quality ]</span>
                <span className="px-3 py-1 bg-white/20 rounded-full">[ growth ]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These principles guide everything we write, discuss, and explore
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-6">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${value.color} flex items-center justify-center flex-shrink-0`}>
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-gray-50 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <Zap className="h-12 w-12 text-indigo-900 mx-auto mb-8 opacity-20" />
            <blockquote className="text-2xl md:text-3xl font-light text-gray-900 leading-relaxed mb-8">
              "Quality is not an act, it's a habit. We're here to help you build 
              better habits, one insight at a time."
            </blockquote>
            <div className="text-sm text-gray-500 font-mono">
              [ always_in_beta = true ]
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;