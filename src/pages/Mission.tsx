import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Lightbulb, TrendingUp, Target, Zap, BookOpen, Eye, ArrowRight, PenLine as penLine } from 'lucide-react';
import { SEO } from '../components/SEO';

const Mission = () => {
  const whatWeWrite = [
    {
      title: 'QA Processes & Test Strategy',
      description: 'Test planning, risk-based testing, exploratory work, Agile delivery and the mechanics of a test process that has to survive real delivery pressure.',
      icon: Target,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Quality Thinking',
      description: 'Risk, evidence, ownership, confidence and the gap between a process saying everything is fine and knowing whether it actually is.',
      icon: Users,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Careers & QA Leadership',
      description: 'QA careers, management, communication, mentoring and the judgement required when the role extends beyond test execution.',
      icon: TrendingUp,
      color: 'from-indigo-600 to-blue-600'
    },
    {
      title: 'Release & Technical Delivery',
      description: 'Release readiness, governance, dependencies, go/no-go decisions and the coordination work that sits between teams.',
      icon: Eye,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Industry Change',
      description: 'AI in testing, observability, QAOps and other shifts worth examining once the hype is separated from practical use.',
      icon: BookOpen,
      color: 'from-purple-600 to-indigo-600'
    },
    {
      title: 'Tools & Practice',
      description: 'Occasional reviews of QA and delivery tools, judged by what they improve in the process rather than by their feature lists.',
      icon: Zap,
      color: 'from-purple-600 to-indigo-600'
    }
  ];

  return (
    <div className="py-20">
      <SEO
        title="Our Mission | Null Expected"
        description="Why Null Expected publishes practitioner-led writing on software quality, testing, release governance and technical delivery."
        path="/mission"
      />
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <div className="mb-8">
          <div className="flex justify-center mb-6 h-24">
            <img
              src="/Null-Expected-Cat-Icon-Pack/cat-working.svg"
              alt="Cat working on quality mission"
              className="w-24 h-24"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Null Expected exists
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Null Expected is a practitioner-led reference hub for software quality, release governance and technical delivery. The writing examines the decisions, trade-offs and failure modes behind how software is tested, governed and released.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-800 py-20 mb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              The gap it is meant to fill
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                There is already more than enough QA content explaining how a tool works, repeating a methodology, or reducing a difficult delivery problem to a checklist. Null Expected exists for the parts that are harder to package: judgement, risk, evidence, organisational behaviour and the decisions teams make when delivery pressure becomes real.
              </p>
              <ul className="text-left max-w-2xl mx-auto space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-300 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span>Examine the reasoning behind test, quality and release decisions</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-300 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span>Connect process and governance to the risks they are supposed to manage</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-300 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span>Write about software delivery as it actually behaves across teams, dependencies and constraints</span>
                </li>
              </ul>
              <p className="pt-8 text-lg">
                The practical test is whether the work improves the information available to the people making decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Write About */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What the writing covers
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-600">
            <p>The subject is broader than test execution. The writing follows quality through planning, engineering, release governance, production signals, careers and the organisational decisions around them.</p>
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
            <div className="flex justify-center mb-6">
              <img
                src="/Null-Expected-Cat-Icon-Pack/cat-mascot.svg"
                alt="Null Expected cat thinking about quality evidence"
                className="w-20 sm:w-24 md:w-28 h-auto object-contain"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Why Null Expected?
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                The name comes from a familiar testing idea: sometimes returning nothing is exactly the correct result. But even a null result only means something when the expectation behind it is understood.
              </p>
              <p>
                That is a useful reminder for the rest of software quality too. A passing test, a green dashboard or an approved release tells us very little unless we understand what was checked, what was not, which assumptions were made and which risks someone has accepted.
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
                Who Writes Here
              </h2>
            </div>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Null Expected was founded by Andreea Vitan and is primarily shaped by her experience across hands-on software testing, QA management, release management and technical delivery.
              </p>
              <p>
                Guest contributors may occasionally bring other practitioner perspectives, but the site is not intended to become a general QA content platform. Articles are published because there is a useful argument, experience or question worth examining.
              </p>
              <p className="font-semibold text-gray-900">
                Null Expected is practitioner-led, source-aware where evidence matters, and independent of the consultancy work.
              </p>
              <p className="mt-8">
                <Link
                  to="/manifesto"
                  className="inline-flex items-center text-indigo-900 hover:text-gray-900 font-semibold transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Read the full manifesto
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