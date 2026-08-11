import { Link } from 'react-router-dom';
import {
  CalendarClock,
  ChartBar,
  Gavel,
  Search,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import StandardPageHero from '../components/site/StandardPageHero';
import SectionHeading from '../components/site/SectionHeading';
import IconBadge from '../components/site/IconBadge';
import { siteIcons } from '../config/siteIcons';

const Consulting = () => {
  const services = [
    {
      title: 'Software Quality & Test Strategy',
      description:
        'How quality is defined, planned and evidenced so testing reflects real product risk instead of volume.',
      features: [
        'Current-state QA and test-process review',
        'Risk-based test strategy and planning model',
        'Readiness criteria and quality-signal definition',
        'Prioritised recommendations with ownership and next steps',
      ],
      icon: siteIcons.qaProcesses,
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
      icon: siteIcons.releaseGovernance,
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
      icon: siteIcons.technicalDelivery,
    },
  ];

  const situations = [
    {
      title: 'No one owns the integrated readiness picture',
      description:
        'Several teams contribute to a release, but nobody holds the combined view of quality, dependencies and risk for the whole thing.',
      icon: siteIcons.qualityMindset,
    },
    {
      title: 'QA reporting does not explain product risk',
      description:
        'Reporting is extensive and detailed, yet it still does not tell you where the real product risk is or what to do about it.',
      icon: ChartBar,
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
      icon: siteIcons.technicalDelivery,
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
      title: 'Understand the current state',
      description:
        'Look at how quality, releases and delivery work in practice, including gaps outside the official process.',
    },
    {
      step: '02',
      title: 'Find where decisions break down',
      description:
        'Trace where readiness, risk or dependency information is lost or arrives too late.',
    },
    {
      step: '03',
      title: 'Make targeted changes',
      description:
        'Change the parts getting in the way, using the tools and teams already there.',
    },
    {
      step: '04',
      title: 'Leave capability behind',
      description:
        'Document the reasoning and hand over a process the team can maintain without external help.',
    },
  ];

  const engagementOptions = [
    {
      icon: siteIcons.focusedReview,
      title: 'Focused review',
      label: 'Typical length: 1-4 weeks',
      description:
        'A short, targeted look at a specific quality, release or delivery problem, with practical recommendations you can act on.',
    },
    {
      icon: siteIcons.timeOrEngagement,
      title: 'Embedded engagement',
      label: 'Length: agreed to scope',
      description:
        'Working alongside your teams for a defined period to put changes in place and build the capability to maintain them.',
    },
    {
      icon: siteIcons.careerAdvice,
      title: 'Advisory support',
      label: 'Cadence: ongoing',
      description:
        'Periodic input on quality, release and delivery decisions as your teams and processes evolve.',
    },
  ];

  return (
    <div>
      <SEO
        title="Consulting - Null:Expected"
        description="Independent, founder-led consultancy in software quality, release governance and technical delivery, founded by Andreea Vitan."
        path="/consulting"
      />

      <StandardPageHero
        eyebrow="QA, release and delivery consulting"
        title="Make the risk visible before it becomes a release problem"
        description="Practical support for teams dealing with unclear test coverage, disputed release readiness, cross-team dependencies or governance that creates activity without helping anyone decide. The work starts with the information available now: what is known, where the risk sits and what needs to happen next."
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:ade.vitan@gmail.com"
            className="site-button-primary"
          >
            <siteIcons.email className="mr-2 h-5 w-5" />
            Email Andreea
          </a>
          <a
            href="#areas-of-work"
            className="site-button-secondary"
          >
            See areas of work
          </a>
        </div>
      </StandardPageHero>

      {/* Services Section */}
      <section id="areas-of-work" className="site-section">
        <div className="site-shell">
          <div className="mb-16">
            <SectionHeading
              title="Areas of work"
              description="Three related areas of practice. Most engagements draw on more than one, because quality, release and delivery decisions rarely sit in isolation."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className={`site-card bg-white rounded-xl p-8 border border-gray-200 shadow-sm ${
                  idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <IconBadge icon={service.icon} variant="strong" size="large" />
                <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">{service.title}</h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Typical outputs</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <siteIcons.listConfirmation className="h-4 w-4 mr-3 flex-shrink-0" style={{ color: '#7c3aed' }} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Situations Section */}
      <section className="site-section bg-gray-50">
        <div className="site-shell">
          <div className="site-content-width mx-auto">
          <div className="mb-16">
            <SectionHeading
              title="When outside help is useful"
              description="The work usually starts with a specific delivery problem. These are common examples."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0 border-t border-gray-200">
            {situations.map((situation) => {
              const isLast = situation.title === situations[situations.length - 1].title;
              return (
                <div
                  key={situation.title}
                  className={`flex items-start gap-4 py-5 border-b border-gray-200 ${
                    isLast ? 'md:col-span-2' : ''
                  }`}
                >
                  <IconBadge icon={situation.icon} variant="soft" />
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">{situation.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{situation.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="site-section">
        <div className="site-shell">
          <div className="mb-16">
            <SectionHeading
              title="How the work usually goes"
              description="Practical and context-first. The goal is better decisions, not a binder of process documentation."
            />
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gray-200" aria-hidden="true" />
            {approach.map((phase) => (
              <div key={phase.step} className="relative text-left">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4 relative z-10">
                  <span className="text-gray-900 font-bold text-lg">{phase.step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{phase.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you can expect */}
      <section className="site-section bg-gray-50">
        <div className="site-shell">
          <div className="site-content-width mx-auto">
            <SectionHeading
              title="What you can expect"
              description="You work directly with Andreea. Recommendations are shaped to the systems, constraints and delivery pressure already present, and the resulting process stays with the team."
            />
          </div>
        </div>
      </section>

      {/* Engagement Options */}
      <section className="site-section">
        <div className="site-shell">
          <div className="mb-16">
            <SectionHeading
              title="Ways to work together"
              description="Flexible arrangements, scoped to the actual problem rather than a fixed programme."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {engagementOptions.map((option, idx) => (
              <div
                key={option.title}
                className={`site-card bg-white rounded-xl p-8 border border-gray-200 shadow-sm ${
                  idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <IconBadge icon={option.icon} variant="strong" size="large" />
                <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">{option.title}</h3>
                <p className="text-base text-gray-600 mb-4 leading-relaxed">{option.description}</p>
                <div className="text-sm text-gray-500">{option.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="site-section bg-indigo-900">
        <div className="site-shell">
          <div className="site-content-width mx-auto text-center">
          <SectionHeading
            title="Discuss the problem you need to solve"
            description="A short email is enough to start. Include the context, what is getting in the way and the kind of support you are considering."
            align="center"
            tone="dark"
          />
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:ade.vitan@gmail.com"
              className="site-button-inverse"
            >
              <siteIcons.email className="mr-2 h-5 w-5" />
              Email Andreea
            </a>

            <a
              href="https://www.linkedin.com/in/adevitan/"
              target="_blank"
              rel="noopener noreferrer"
              className="site-button-secondary"
            >
              <siteIcons.linkedin className="mr-2 h-5 w-5" />
              View LinkedIn
            </a>
          </div>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="site-section">
        <div className="site-shell">
          <div className="site-content-width mx-auto text-center">
          <SectionHeading
            title="More on how the work thinks"
            description="The blog covers quality, release management and delivery in practice, not in theory."
            align="center"
            size="compact"
          />
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center font-semibold transition-colors"
              style={{ color: '#6b21a8' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#581c87')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6b21a8')}
              onClick={() => window.scrollTo(0, 0)}
            >
              Read the writing
              <siteIcons.directionalLink className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/manifesto"
              className="inline-flex items-center font-semibold transition-colors"
              style={{ color: '#6b21a8' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#581c87')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6b21a8')}
              onClick={() => window.scrollTo(0, 0)}
            >
              The Manifesto
              <siteIcons.directionalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;
