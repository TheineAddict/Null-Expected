import { Link } from 'react-router-dom';
import { Linkedin, Mail, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { getAuthorById } from '../config/authors';
import { SEO } from '../components/SEO';

const About = () => {
  const founder = getAuthorById('author1');

  const experiencePoints = [
    '12+ years across hands-on testing, QA and test leadership, release management and technical delivery',
    'Work across web, desktop, mobile and API products',
    'Enterprise and regulated delivery environments',
    'Test strategy, defect governance, release readiness, dependencies and cross-team coordination',
  ];

  const books = [
    {
      cover: '/book_2_cover.jpg',
      title: "Agile Isn't a Vibe",
      subtitle: 'The Hidden Operating System',
      description:
        'A practical guide to the operating habits behind Agile delivery for new tech leads and engineering leaders.',
      url: 'https://www.amazon.com/dp/B0GDY3WSG4',
    },
    {
      cover: '/book3_cover.jpg',
      title: 'The Go/No-Go Mindset',
      subtitle: 'A Practical QA Playbook',
      description:
        'A practical guide to release readiness, evidence and go/no-go decision-making for QA and release leads.',
      url: 'https://www.amazon.com/dp/B0GF35SJNB',
    },
    {
      cover: '/book1_cover.jpg',
      title: 'Unpopular QA Opinions',
      subtitle: 'This Will Get Downvoted',
      description:
        'A collection of opinionated QA essays on testing, quality, delivery pressure and the habits teams rarely question.',
      url: 'https://www.amazon.com/dp/B0GHZY3CTQ',
    },
  ];

  return (
    <div className="py-20">
      <SEO
        title="About Null Expected - Independent QA Consultancy & Publication"
        description="Null Expected is an independent consultancy and practitioner-led publication founded by Andreea Vitan, focused on software quality, release governance, and technical delivery."
        path="/about"
      />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <div className="flex justify-center mb-6 h-24">
          <img
            src="/Null-Expected-Cat-Icon-Pack/cat-mascot.svg"
            alt="Null Expected Cat Mascot"
            className="w-24 h-24"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About Null:Expected
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Null:Expected is both an independent consultancy and a practitioner-led publication. The
          consulting work focuses on software quality, release governance and technical delivery. The
          writing stays independent and documents the decisions, trade-offs and failure modes behind
          that work.
        </p>
      </section>

      {/* Andreea Vitan */}
      {founder && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-64 h-64 md:w-72 md:h-72">
                <img
                  src={founder.imageUrl}
                  alt={`${founder.name} - ${founder.title}`}
                  className="w-full h-full object-cover rounded-2xl shadow-lg grayscale"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{founder.name}</h2>
              <p className="text-indigo-900 font-semibold mb-1">{founder.roleTitle}</p>
              <p className="text-gray-600 text-sm mb-6">{founder.title}</p>

              <p className="text-gray-600 leading-relaxed mb-6">{founder.bio}</p>

              <div className="text-sm text-gray-500 mb-6 font-mono">{founder.tag}</div>

              <div className="flex flex-wrap gap-6">
                {founder.linkedinUrl && (
                  <a
                    href={founder.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                  <span>Read the articles</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Experience in practice */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience in practice
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiencePoints.map((point) => (
              <div
                key={point}
                className="flex items-start space-x-4 bg-white rounded-xl shadow-sm p-6"
              >
                <CheckCircle2 className="h-6 w-6 text-indigo-900 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books by Andreea */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <BookOpen className="h-10 w-10 text-indigo-900" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Books by Andreea
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {books.map((book) => (
              <div key={book.title} className="group">
                <div className="mb-6 relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:shadow-xl group-hover:scale-105">
                  <img
                    src={book.cover}
                    alt={`${book.title}: ${book.subtitle}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                <p className="text-sm font-semibold text-indigo-900 mb-3">{book.subtitle}</p>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{book.description}</p>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-indigo-900 hover:text-indigo-800 font-semibold transition-colors"
                >
                  <span>Get on Amazon</span>
                  <span className="text-lg">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Name explanation + Manifesto */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">Null:Expected</strong> comes from a software
                testing term where "null" means nothing is returned — and that is the expected result.
                Even that "nothing" is deliberate: it reflects a decision, a rule, or a user
                expectation. The name is a reminder that behind every outcome there is intent, and
                quality depends on understanding it.
              </p>
              <p>
                The{' '}
                <Link
                  to="/manifesto"
                  className="text-indigo-900 hover:text-gray-900 font-semibold transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Manifesto
                </Link>{' '}
                sets out what drives this work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in touch</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:ade@nullexpected.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-indigo-800 transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Andreea
            </a>
            <a
              href="https://www.linkedin.com/in/adevitan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Linkedin className="mr-2 h-5 w-5" />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
