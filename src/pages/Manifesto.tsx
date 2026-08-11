import React from 'react';
import { Zap, Target, Users, Search, Settings, Eye } from 'lucide-react';
import { SEO } from '../components/SEO';
import PageHeading from '../components/site/PageHeading';

const Manifesto = () => {
  const principles = [
    {
      title: 'Intention over output',
      description: 'Activity is not evidence. Tests, metrics and reports are useful only when they answer a real question about risk.',
      icon: Target,
    },
    {
      title: 'Understanding over coverage',
      description: 'Coverage tells us what was exercised. It does not tell us whether we understood the important failure modes.',
      icon: Eye,
    },
    {
      title: 'Collaboration over gatekeeping',
      description: 'QA should improve the decisions a team can make, not become the department that grants permission to release.',
      icon: Users,
    },
    {
      title: 'Curiosity over certainty',
      description: 'Specifications, dashboards and green pipelines are evidence to examine, not reasons to stop asking questions.',
      icon: Search,
    },
    {
      title: 'Patterns over tools',
      description: 'Tools change quickly. Risk, feedback, dependencies and failure patterns are the things worth learning to recognise.',
      icon: Settings,
    },
    {
      title: 'Silence, when expected',
      description: 'A null result has meaning only when we know what we expected, what we checked and why the absence of a signal matters.',
      icon: Zap,
    }
  ];

  return (
    <div>
      <SEO
        title="The Null Expected Manifesto | Quality, Testing & Delivery"
        description="The principles behind Null Expected: purposeful testing, evidence over appearances, useful governance, professional curiosity and better delivery decisions."
        path="/manifesto"
      />
      <PageHeading
        title="The Null:Expected Manifesto"
        description={<span className="italic">Quality work should make risk clearer, decisions better, and delivery more honest.</span>}
        align="center"
        topMedia={
          <img
            src="/Null-Expected-Cat-Icon-Pack/cat-mascot.svg"
            alt="Null Expected Cat Mascot"
            className="w-24 h-24"
          />
        }
      />

      {/* Who We Are */}
      <section className="site-section site-shell">
        <div className="site-reading-width mx-auto text-center space-y-4 text-lg text-gray-700 leading-relaxed">
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
      <section className="site-section site-shell">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col"
            >
              <div className="w-11 h-11 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4">
                <principle.icon className="h-5 w-5 text-indigo-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h3>
              <p className="text-gray-600 leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="site-section bg-gradient-to-r from-indigo-900 to-purple-800">
        <div className="site-shell">
          <div className="site-reading-width mx-auto text-center">
            <div className="text-white space-y-6">
              <p className="text-xl leading-relaxed">
                These principles shape how Null:Expected approaches testing, quality, release governance and technical delivery.
              </p>
              <div className="text-3xl font-bold">
                What did you expect?
              </div>
              <div className="text-indigo-300 font-mono text-sm mt-6">
                [ manifesto_version = 1.0 ]
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manifesto;
