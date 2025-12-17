import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Lightbulb, TrendingUp, Target, Zap, BookOpen, Eye, ArrowRight, penLine } from 'lucide-react';

const Mission = () => {
  const whatWeWrite = [
    {
      title: 'QA methodologies',
      description: 'that evolve with teams',
      icon: Target,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Philosophy and mindset pieces',
      description: 'on the role of QA',
      icon: Users,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Career reflections',
      description: 'from the trenches and leadership',
      icon: TrendingUp,
      color: 'from-indigo-600 to-blue-600'
    },
    {
      title: 'Trends and industry insights',
      description: 'filtered through a quality lens',
      icon: Eye,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Occasional tool reviews',
      description: 'always process-first',
      icon: BookOpen,
      color: 'from-purple-600 to-indigo-600'
    },
    {
      title: 'Unpopular opinions',
      description: 'with context, not cynicism',
      icon: Zap,
      color: 'from-purple-600 to-indigo-600'
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
            Null Expected is a QA thought hub. It's where practitioners question the status quo, 
            unpack the trade-offs of "done," and advocate for software that doesn't just pass, but deserves to.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-800 py-20 mb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why We Exist
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                We built this space because too much QA content either simplifies the role 
                ("just write test cases") or drowns it in tools and jargon. We wanted somewhere that:
              </p>
              <ul className="text-left max-w-2xl mx-auto space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-300 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span>Highlights the thinking behind quality</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-300 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span>Balances process with perspective</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-300 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span>Reflects the real-world messiness of testing in modern teams</span>
                </li>
              </ul>
              <div className="pt-8">
                <blockquote className="text-2xl font-light italic">
                  "Quality is a mindset, not a metric."
                </blockquote>
                <div className="text-indigo-300 font-mono text-sm mt-4">
                  — Null Expected
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Write About */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What We Write About
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-600">
            <p>This isn't a tutorials site — though you will find actionable advice.</p>
            <p>This isn't just opinion — though you will find strong ones.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whatWeWrite.map((item, index) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mb-6`}>
                <item.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 italic">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Null Expected */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Why Null Expected?
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Because QA is the only discipline that celebrates a null result — when things 
                don't crash, don't regress, don't surprise us.
              </p>
              <p>
                But we also know that behind every "null" there's an expectation, a person, and a decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Voices */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="relative mb-8">
              <Zap className="h-12 w-12 text-indigo-900 mx-auto mb-8 opacity-20" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                A Note on the Voices Behind the Site
              </h2>
            </div>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                While the blog is shaped by QA professionals with different experiences, 
                this is not a personal blog. Our bios live elsewhere. What matters here 
                is the thinking, not the résumé.
              </p>
              <p>
                That said — we're practitioners. This site is our way of giving back, 
                challenging forward, and documenting what it means to build for quality, 
                not just test it.
              </p>
              <p className="font-semibold text-gray-900">
                We write from experience — and we edit each other ruthlessly.
              </p>
              <p className="mt-8">
                <Link 
                  to="/manifesto" 
                  className="inline-flex items-center text-indigo-900 hover:text-purple-800 font-semibold transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Read our full manifesto
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </p>
              <div className="text-sm text-gray-500 font-mono mt-8">
                [ practitioners_first = true ]
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;