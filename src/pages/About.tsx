import { Link } from 'react-router-dom';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';
import { getAuthorById } from '../config/authors';
import { SEO } from '../components/SEO';
import PageHeading from '../components/site/PageHeading';
import SectionHeading from '../components/site/SectionHeading';

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
    <div>
      <SEO
        title="About Null Expected - Independent QA Consultancy & Publication"
        description="Null Expected is an independent consultancy and practitioner-led publication founded by Andreea Vitan, focused on software quality, release governance, and technical delivery."
        path="/about"
      />

      <PageHeading
        title="About Null:Expected"
        description="Null Expected combines independent consulting with practitioner-led writing. The consulting work covers software quality, release governance and technical delivery. The writing examines the decisions, trade-offs and failure modes behind that work."
      />

      {/* Andreea Vitan */}
      {founder && (
        <section className="site-section site-shell">
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 md:gap-12 items-center">
            <div className="flex justify-center md:justify-start">
              <img
                src={founder.imageUrl}
                alt={`${founder.name} - ${founder.title}`}
                className="w-72 md:w-80 h-auto object-cover rounded-2xl shadow-lg grayscale"
              />
            </div>

            <div>
              <h2 className="site-section-title mb-4">{founder.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                I'm Andreea Vitan. I work across QA, release management and technical delivery, usually where the official status is clearer than the actual risk. Null Expected is where I write about that work and offer focused consulting to teams that need a better view of what is ready, what is blocked and what still needs a decision.
              </p>

              <div className="flex flex-wrap gap-6">
                {founder.linkedinUrl && (
                  <a
                    href={founder.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-indigo-900 hover:text-gray-900 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>View LinkedIn</span>
                  </a>
                )}
                <Link
                  to={`/blog/author/${founder.slug}`}
                  className="flex items-center space-x-2 text-indigo-900 hover:text-gray-900 transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <span>Read my articles</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Experience in practice */}
      <section className="site-section site-shell">
        <div className="site-content-width">
          <h2 className="site-section-title mb-10">
            Experience in practice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {experiencePoints.map((point, i) => (
              <div
                key={point}
                className={[
                  'py-5',
                  i < 2 ? 'md:border-b' : '',
                  i % 2 === 0 ? 'md:border-r md:pr-12' : 'md:pl-12',
                  'border-gray-200',
                ].join(' ')}
              >
                <p className="text-gray-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books by Andreea */}
      <section className="site-section site-shell">
        <div className="mb-10 md:mb-12">
          <SectionHeading title="Books by Andreea" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {books.map((book) => (
            <div key={book.title} className="flex flex-col">
              <div className="mb-5">
                <img
                  src={book.cover}
                  alt={`${book.title}: ${book.subtitle}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
              <p className="text-sm font-semibold text-indigo-900 mb-3">{book.subtitle}</p>
              <p className="text-gray-600 mb-5 text-sm leading-relaxed flex-1">{book.description}</p>
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-indigo-900 hover:text-indigo-800 font-semibold transition-colors"
              >
                <span>View on Amazon</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Name explanation */}
      <section className="site-section site-shell">
        <div className="site-intro-width">
          <h2 className="site-section-title mb-4">
            Why the name?
          </h2>
          <p className="site-section-description mb-6">
            Null:Expected comes from a testing result: nothing is returned, and that is the expected outcome. It is a small reminder that even an empty result should be intentional.
          </p>
          <Link
            to="/manifesto"
            className="inline-flex items-center text-indigo-900 hover:text-gray-900 font-semibold transition-colors"
            onClick={() => window.scrollTo(0, 0)}
          >
            Read the Manifesto
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="site-section site-shell">
        <div className="site-intro-width text-center">
          <SectionHeading title="Get in touch" align="center" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:ade.vitan@gmail.com"
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
