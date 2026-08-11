import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import PageHeading from '../components/site/PageHeading';
import SectionHeading from '../components/site/SectionHeading';
import IconBadge from '../components/site/IconBadge';
import { siteIcons } from '../config/siteIcons';

const Mission = () => {
  const whatWeWrite = [
    {
      title: 'QA Processes & Test Strategy',
      description: 'Test planning, risk-based testing, exploratory work, Agile delivery and the mechanics of a test process that has to survive real delivery pressure.',
      icon: siteIcons.qaProcesses,
    },
    {
      title: 'Quality Thinking',
      description: 'Risk, evidence, ownership, confidence and the gap between a process saying everything is fine and knowing whether it actually is.',
      icon: siteIcons.qualityMindset,
    },
    {
      title: 'Careers & QA Leadership',
      description: 'QA careers, management, communication, mentoring and the judgement required when the role extends beyond test execution.',
      icon: siteIcons.careerAdvice,
    },
    {
      title: 'Release & Technical Delivery',
      description: 'Release readiness, governance, dependencies, go/no-go decisions and the coordination work that sits between teams.',
      icon: siteIcons.releaseGovernance,
    },
    {
      title: 'Industry Change',
      description: 'AI in testing, observability, QAOps and other shifts worth examining once the hype is separated from practical use.',
      icon: siteIcons.industryTrends,
    },
    {
      title: 'Tools & Practice',
      description: 'Occasional reviews of QA and delivery tools, judged by what they improve in the process rather than by their feature lists.',
      icon: siteIcons.toolsAndTechnology,
    },
  ];

  return (
    <div>
      <SEO
        title="Our Mission | Null Expected"
        description="Why Null Expected publishes practitioner-led writing on software quality, testing, release governance and technical delivery."
        path="/mission"
      />

      <PageHeading
        title="Why Null Expected exists"
        description="Null Expected is a practitioner-led reference hub for software quality, release governance and technical delivery. The writing examines the decisions, trade-offs and failure modes behind how software is tested, governed and released."
        align="center"
      />

      {/* The gap it is meant to fill */}
      <section className="site-section bg-gradient-to-r from-indigo-900 to-purple-800">
        <div className="site-shell">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-14 text-white">
            <div>
              <h2 className="site-section-title-compact site-tone-dark mb-5">
                The gap it is meant to fill
              </h2>
              <p className="text-lg leading-relaxed text-indigo-100">
                There is already more than enough QA content explaining how a tool works, repeating a methodology, or reducing a difficult delivery problem to a checklist. Null Expected exists for the parts that are harder to package: judgement, risk, evidence, organisational behaviour and the decisions teams make when delivery pressure becomes real.
              </p>
            </div>
            <div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-300 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                  <span className="leading-relaxed">Examine the reasoning behind test, quality and release decisions</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-300 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                  <span className="leading-relaxed">Connect process and governance to the risks they are supposed to manage</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-300 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                  <span className="leading-relaxed">Write about software delivery as it actually behaves across teams, dependencies and constraints</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-lg leading-relaxed text-indigo-100 mt-8 max-w-3xl">
            The practical test is whether the work improves the information available to the people making decisions.
          </p>
        </div>
      </section>

      {/* What the writing covers */}
      <section className="site-section site-shell">
        <div className="mb-10 md:mb-12">
          <SectionHeading
            title="What the writing covers"
            description="The subject is broader than test execution. The writing follows quality through planning, engineering, release governance, production signals, careers and the organisational decisions around them."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatWeWrite.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <IconBadge icon={item.icon} variant="soft" />
              <h3 className="text-base font-semibold text-gray-900 mb-2 mt-4">{item.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed" style={{ lineHeight: '1.6' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Null Expected? */}
      <section className="site-section bg-gray-50">
        <div className="site-shell">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="flex justify-center md:justify-start">
              <img
                src="/Null-Expected-Cat-Icon-Pack/cat-mascot.svg"
                alt="Null Expected cat thinking about quality evidence"
                className="w-[360px] max-w-full h-auto"
              />
            </div>
            <div>
              <h2 className="site-section-title mb-6">
                Why Null Expected?
              </h2>
              <div className="space-y-5 text-lg text-gray-600 leading-relaxed text-left">
                <p>
                  The name comes from a familiar testing idea: sometimes returning nothing is exactly the correct result. But even a null result only means something when the expectation behind it is understood.
                </p>
                <p>
                  That is a useful reminder for the rest of software quality too. A passing test, a green dashboard or an approved release tells us very little unless we understand what was checked, what was not, which assumptions were made and which risks someone has accepted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who writes here */}
      <section className="site-section site-shell">
        <div className="site-intro-width">
          <h2 className="site-section-title mb-6">
            Who writes here
          </h2>
          <p className="site-section-description mb-8">
            Null Expected is written and edited by Andreea Vitan. Guest contributors may appear when they bring a useful practitioner perspective, but this is not a general content platform. Articles are published when there is an argument, experience or question worth examining.
          </p>
          <Link
            to="/manifesto"
            className="inline-flex items-center text-indigo-900 hover:text-gray-900 font-semibold transition-colors"
            onClick={() => window.scrollTo(0, 0)}
          >
            Read the Manifesto
            <siteIcons.directionalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Mission;
