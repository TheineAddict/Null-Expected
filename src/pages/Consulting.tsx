import React from 'react';
import { Link } from 'react-router-dom';
import { CircleCheck as CheckCircle, Users, Target, TrendingUp, Clock, Mail, Linkedin, ArrowRight, ClipboardList, TriangleAlert as AlertTriangle, Eye, ChartBar as FileBarChart, CalendarClock, Network, Gavel } from 'lucide-react';
import { SEO } from '../components/SEO';

const Consulting = () => {
  const services = [
    {
      title: 'Software Quality & Test Strategy',
      description:
        'Working on how quality is defined, planned and evidenced across your teams so that testing reflects real product risk instead of volume.',
      features: [
        'Current-state QA and test-process review',
        'Risk-based test strategy and planning model',
        'Readiness criteria and quality-signal definition',
        'Prioritised recommendations with ownership and next steps',
      ],
      icon: Target,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      title: 'Release Governance & Readiness',
      description:
        'Making release decisions based on clear, honest information so that go/no-go calls are timely and defensible.',
      features: [
        'Release-readiness model and go/no-go evidence set',
        'Dependency, defect and risk visibility',
        'Change and rollback-readiness review',
        'Decision and escalation paths',
      ],
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Technical Delivery',
      description:
        'Coordinating delivery across teams so that milestones, dependencies and risks stay visible and decisions arrive on time.',
      features: [
        'Cross-team milestone and dependency view',
        'RAID and decision tracking',
        'Delivery and readiness reporting',
        'Coordination support through critical releases',
      ],
      icon: Users,
      color: 'from-indigo-600 to-blue-600',
    },
  ];

  const situations = [
    {
      title: 'No one owns the integrated readiness picture',
      description:
        'Several teams contribute to a release, but nobody holds the combined view of quality, dependencies and risk for the whole thing.',
      icon: Eye,
    },
    {
      title: 'QA reporting does not explain product risk',
      description:
        'Reporting is extensive and detailed, yet it still does not tell you where the real product risk is or what to do about it.',
      icon: FileBarChart,
    },
    {
      title: 'Dependencies and risks surface too late',
      description:
        'Delivery dependencies and risks become visible only when they are already blocking a release or a milestone.',
      icon: CalendarClock,
    },
    {
      title: 'The current process no longer scales',
      description:
        'An existing QA or release process worked at a smaller scale, but no longer fits the number of teams, services or releases.',
      icon: Network,
    },
    {
      title: 'Governance exists, but decisions still arrive late',
      description:
        'Governance forums and checkpoints are in place, yet decisions still arrive late or are made with incomplete information.',
      icon: Gavel,
    },
  ];

  const approach = [
    {
      step: '01',
      title: 'Understand the Current State',
      description:
        'Look at how quality, releases and delivery actually work today, including the gaps that do not show up in the official process.',
    },
    {
      step: '02',
      title: 'Find Where Decisions Break Down',
      description:
        'Identify where readiness, risk and dependency information is lost or arrives too late for the people who need it.',
    },
    {
      step: '03',
      title: 'Make Targeted, Practical Changes',
      description:
        'Propose changes that fit your context, tools and teams, and work alongside the people who will carry them forward.',
    },
    {
      step: '04',
      title: 'Leave Capability Behind',
      description:
        'Transfer the reasoning, not just the process, so the team can keep improving without ongoing external help.',
    },
  ];

  const engagementOptions = [
    {
      icon: ClipboardList,
      title: 'Focused Review',
      description:
        'A short, targeted look at a specific quality, release or delivery problem, with practical recommendations you can act on.',
      meta: '[ duration: 1-4_weeks ]',
    },
    {
      icon: Clock,
      title: 'Embedded Engagement',
      description:
        'Working alongside your teams for a defined period to put changes in place and build the capability to maintain them.',
      meta: '[ duration: flexible ]',
    },
    {
      icon: Users,
      title: 'Advisory Support',
      description:
        'Periodic input on quality, release and delivery decisions as your teams and processes evolve.',
      meta: '[ duration: ongoing ]',
    },
  ];

  return (
    <div className="py-20">
      <SEO
        title="Consulting - Null:Expected"
        description="Independent, founder-led consultancy in software quality, release governance and technical delivery, founded by Andreea Vitan."
        path="/consulting"
      />

      {/* Hero Section */}
      <section className="py-20 md:py-24 border-b border-gray-100">
        <div className="site-shell">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
            {/* Left: text */}
            <div className="lg:col-span-3 order-1">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-900 mb-4">
                QA, release and delivery consulting
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                Make the risk visible before it becomes a release problem
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
                Practical support for teams dealing with unclear test coverage, disputed release readiness, cross-team dependencies or governance that creates activity without helping anyone decide. The work starts with the information available now: what is known, where the risk sits and what needs to happen next.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:ade@nullexpected.com"
                  className="site-button-primary"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email Andreea
                </a>
                <a
                  href="#areas-of-work"
                  className="site-button-secondary"
                >
                  See areas of work
                </a>
              </div>
            </div>

            {/* Right: illustration */}
            <div className="lg:col-span-2 order-2 flex justify-center lg:justify-end">
              <img
                src="/Null-Expected-Cat-Icon-Pack/cat-strategy.svg"
                alt="Null Expected cat working on delivery strategy"
                className="w-[280px] md:w-[420px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="areas-of-work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Areas of work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three related areas of practice. Most engagements draw on more than one, because quality,
            release and delivery decisions rarely sit in isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}
              >
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Typical outputs</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Situations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              When It Might Be Time to Get Help
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These are the situations clients tend to arrive with. If one of them sounds familiar, it
              is usually a good place to start a conversation.
            </p>
          </div>

          <div className="space-y-6">
            {situations.map((situation) => (
              <div
                key={situation.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-900 to-purple-800 flex items-center justify-center flex-shrink-0">
                  <situation.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{situation.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{situation.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How the Work Usually Goes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practical and context-first. The goal is better decisions, not a binder of process
              documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approach.map((phase) => (
              <div key={phase.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-900 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{phase.step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{phase.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why work with Andreea */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img
                src="/Null-Expected-Cat-Icon-Pack/cat-approved.svg"
                alt="Null Expected cat mascot approving quality"
                className="w-24 h-24"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Why work with Andreea</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Practitioner, Not Theorist</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The work is grounded in hands-on testing, QA leadership, release management and
                delivery. Advice comes from having done the job, not from a methodology deck.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Fits Your Context</h3>
              <p className="text-gray-600 leading-relaxed">
                Every organisation has its own constraints, tools and culture. Recommendations are
                shaped to what will actually work where you are, not to a template.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Independent and Direct</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Null Expected is founder-led and intentionally small. That means direct access to
                Andreea, and advice that is not filtered through a sales pipeline.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Better Decisions, Not More Process</h3>
              <p className="text-gray-600 leading-relaxed">
                The aim is clearer risk, better-timed decisions and capability that stays in your
                team. Process is a means to that end, not the deliverable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Options */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img
                src="/Null-Expected-Cat-Icon-Pack/cat-working.svg"
                alt="Null Expected cat mascot working on quality"
                className="w-20 h-20"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Engagement Options</h2>
            <p className="text-xl text-gray-600">
              Flexible arrangements, scoped to the actual problem rather than a fixed programme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementOptions.map((option) => (
              <div key={option.title} className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-indigo-900 to-purple-800 flex items-center justify-center mx-auto mb-4">
                  <option.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{option.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{option.description}</p>
                <div className="text-sm text-gray-500 font-mono">{option.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let's Talk About Your Situation
          </h2>
          <p className="text-xl text-indigo-200 mb-8">
            If any of the above sounds familiar, get in touch. An initial conversation is the quickest
            way to see whether this is the right fit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:ade.vitan@gmail.com"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 btn-themed font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </a>

            <a
              href="https://www.linkedin.com/in/adevitan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
            >
              <Linkedin className="mr-2 h-5 w-5" />
              Connect on LinkedIn
            </a>
          </div>

          <div className="mt-8 text-indigo-300 text-sm">
            <p>The first conversation is always free, with no obligation.</p>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More on how the work thinks</h2>
          <p className="text-gray-600 mb-8">
            The blog covers quality, release management and delivery in practice, not in theory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              Read the writing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/manifesto"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              The Manifesto
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;
