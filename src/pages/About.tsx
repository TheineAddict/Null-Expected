import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import { getAllAuthors } from '../config/authors';
import { SEO } from '../components/SEO';

const About = () => {
  const authors = getAllAuthors();
  const founder = authors.find((a) => a.id === 'author1');
  const contributors = authors.filter((a) => a.id !== 'author1');

  return (
    <div className="py-20">
      <SEO
        title="About Null Expected - Independent QA Consultancy & Publication"
        description="Null Expected is an independent consultancy and practitioner-led publication founded by Andreea Vitan, focused on software quality, release governance, and technical delivery."
        path="/about"
      />
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <div className="flex justify-center mb-6 h-24">
          <img
            src="/Null-Expected-Cat-Icon-Pack/cat-mascot.svg"
            alt="Null Expected Cat Mascot"
            className="w-24 h-24"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About Null Expected
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          An independent consultancy and practitioner-led publication founded by Andreea Vitan.
          Consulting focuses on software quality, release governance, and technical delivery; the
          writing stays independent practitioner work and reference material - a public body of
          professional practice and thinking.
        </p>
      </section>

      {/* Founder Profile */}
      {founder && (
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              {/* Author Image */}
              <div className="w-32 h-32 mb-6">
                <img
                  src={founder.imageUrl}
                  alt={`${founder.name} - ${founder.title}`}
                  className="w-full h-full object-cover rounded-full shadow-lg grayscale"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h2>
              <p className="text-indigo-900 font-semibold mb-1">{founder.roleTitle}</p>
              <p className="text-gray-600 text-sm mb-6">{founder.title}</p>

              <p className="text-gray-600 leading-relaxed mb-6">
                {founder.bio}
              </p>

              <div className="text-sm text-gray-500 mb-6 font-mono">
                {founder.tag}
              </div>

              <div className="flex space-x-4">
                {founder.linkedinUrl && (
                  <a
                    href={founder.linkedinUrl}
                    className="flex items-center space-x-2 text-indigo-900 hover:text-gray-900 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                )}
                <Link
                  to={`/blog/author/${founder.slug}`}
                  className="flex items-center space-x-2 text-indigo-900 hover:text-gray-900 transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <span>View Posts</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Editorial Contributors */}
      {contributors.length > 0 && (
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Editorial Contributors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Guest contributors write for the publication independently. They are not members of the
            consultancy.
          </p>
        </div>
        <div className={`grid grid-cols-1 ${contributors.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-12 lg:gap-16`}>
          {contributors.map((author) => (
          <div key={author.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              {/* Author Image */}
              <div className="w-32 h-32 mb-6">
                <img
                  src={author.imageUrl}
                  alt={`${author.name} - ${author.title}`}
                  className="w-full h-full object-cover rounded-full shadow-lg grayscale"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">{author.name}</h2>
              <p className="text-indigo-900 font-semibold mb-1">{author.roleTitle}</p>
              <p className="text-gray-600 text-sm mb-6">{author.title}</p>

              <p className="text-gray-600 leading-relaxed mb-6">
                {author.bio}
              </p>

              <div className="text-sm text-gray-500 mb-6 font-mono">
                {author.tag}
              </div>

              <div className="flex space-x-4">
                {author.linkedinUrl && (
                  <a
                    href={author.linkedinUrl}
                    className="flex items-center space-x-2 text-indigo-900 hover:text-gray-900 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {author.id === 'author2' ? (
                  <span className="flex items-center space-x-2 text-gray-400">
                    <span>Coming Soon</span>
                  </span>
                ) : (
                  <Link
                    to={`/blog/author/${author.slug}`}
                    className="flex items-center space-x-2 text-indigo-900 hover:text-gray-900 transition-colors"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <span>View Posts</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
          ))}
        </div>
      </section>
      )}

      {/* Books Section */}
      <section className="py-20 bg-gray-50 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Published Works
            </h2>
            <p className="text-xl text-gray-600">
              Practical insights from years of QA, testing, and leadership experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Book 1 */}
            <div className="group">
              <div className="mb-6 relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:shadow-xl group-hover:scale-105">
                <img
                  src="/book_2_cover.jpg"
                  alt="Agile Isn't a Vibe: The Hidden Operating System for New Tech Leads"
                  className="w-full h-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Agile Isn't a Vibe
              </h3>
              <p className="text-sm font-semibold text-indigo-900 mb-3">
                The Hidden Operating System
              </p>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Practical agile delivery and operating model guidance for new tech leads and engineering leaders. Cut through the hype and learn what actually works.
              </p>
              <a
                href="https://www.amazon.com/dp/B0GDY3WSG4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-indigo-900 hover:text-indigo-800 font-semibold transition-colors"
              >
                <span>Get on Amazon</span>
                <span className="text-lg">→</span>
              </a>
            </div>

            {/* Book 2 */}
            <div className="group">
              <div className="mb-6 relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:shadow-xl group-hover:scale-105">
                <img
                  src="/book3_cover.jpg"
                  alt="The Go/No-Go Mindset: A Practical QA Playbook"
                  className="w-full h-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                The Go/No-Go Mindset
              </h3>
              <p className="text-sm font-semibold text-indigo-900 mb-3">
                A Practical QA Playbook
              </p>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Release readiness, decision-making, and pragmatic QA playbook for QA and release leads, plus engineering teams. Make confident go/no-go decisions.
              </p>
              <a
                href="https://www.amazon.com/dp/B0GF35SJNB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-indigo-900 hover:text-indigo-800 font-semibold transition-colors"
              >
                <span>Get on Amazon</span>
                <span className="text-lg">→</span>
              </a>
            </div>

            {/* Book 3 */}
            <div className="group">
              <div className="mb-6 relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:shadow-xl group-hover:scale-105">
                <img
                  src="/book1_cover.jpg"
                  alt="Unpopular QA Opinions: This Will Get Downvoted"
                  className="w-full h-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Unpopular QA Opinions
              </h3>
              <p className="text-sm font-semibold text-indigo-900 mb-3">
                This Will Get Downvoted
              </p>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Contrarian, evidence-first QA essays for people who ship software. Essential reading for QA professionals, SDETs, developers, engineering managers, PMs, and release managers.
              </p>
              <a
                href="https://www.amazon.com/dp/B0GHZY3CTQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-indigo-900 hover:text-indigo-800 font-semibold transition-colors"
              >
                <span>Get on Amazon</span>
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Name Explanation + Manifesto link */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The <Link to="/manifesto" className="text-indigo-900 hover:text-gray-900 font-semibold transition-colors" onClick={() => window.scrollTo(0, 0)}>Manifesto</Link> sets out what drives this work.
              </p>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">Null:Expected</strong> comes from a software testing term where "null" means nothing is returned - and that is the expected result. Even that "nothing" is deliberate: it reflects a decision, a rule, or a user expectation. The name is a reminder that behind every outcome there is intent, and quality depends on understanding it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-gray-50 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img
                src="/Null-Expected-Cat-Icon-Pack/cat-working.svg"
                alt="Cat working on quality"
                className="w-20 h-20"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Approach
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Sound quality work comes from direct experience, honest reflection, and a
                willingness to challenge conventional wisdom. The writing here is grounded in
                actual delivery decisions, not theory decks.
              </p>
              <p>
                Whether the topic is risk-based testing, release readiness, or cross-team delivery
                governance, the goal is the same: clear, practical guidance that holds up under real
                release pressure.
              </p>
              <div className="inline-flex items-center space-x-4 mt-8 text-gray-500 font-mono text-sm">
                <span className="px-3 py-1 bg-white rounded-full shadow-sm">[ plan ]</span>
                <span className="px-3 py-1 bg-white rounded-full shadow-sm">[ test ]</span>
                <span className="px-3 py-1 bg-white rounded-full shadow-sm">[ release ]</span>
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
            Questions about consulting, editorial contributions, or speaking? Reach out.
          </p>
          <div className="space-y-4">
            <p className="text-gray-600">
              Connect on LinkedIn, or get in touch about consulting engagements, guest posts, or
              speaking opportunities.
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
