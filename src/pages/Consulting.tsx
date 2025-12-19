import React from 'react';
import { Link } from 'react-router-dom';
import { CircleCheck as CheckCircle, Users, Target, TrendingUp, Clock, Mail, Linkedin, ArrowRight } from 'lucide-react';

const Consulting = () => {
  const services = [
    {
      title: 'QA Strategy & Process Design',
      description: 'Design comprehensive quality assurance strategies tailored to your team size, technology stack, and delivery goals.',
      features: [
        'Test strategy development',
        'Process optimization',
        'Risk assessment frameworks',
        'Quality metrics definition'
      ],
      icon: Target,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Release Management Transformation',
      description: 'Modernize your release processes to balance speed with safety, reducing deployment risk and improving predictability.',
      features: [
        'Release pipeline design',
        'Change management optimization',
        'Deployment automation strategy',
        'Rollback and recovery planning'
      ],
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Team Development & Training',
      description: 'Elevate your QA team\'s capabilities through targeted training, mentoring, and skill development programs.',
      features: [
        'QA team assessment',
        'Skills gap analysis',
        'Training program design',
        'Mentoring and coaching'
      ],
      icon: Users,
      color: 'from-indigo-600 to-blue-600'
    }
  ];

  const approach = [
    {
      step: '01',
      title: 'Discovery & Assessment',
      description: 'Deep dive into your current processes, team dynamics, and quality challenges to understand the full context.'
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'Design tailored solutions that fit your organization\'s culture, constraints, and growth objectives.'
    },
    {
      step: '03',
      title: 'Implementation Support',
      description: 'Guide the rollout of new processes with hands-on support, training, and iterative refinement.'
    },
    {
      step: '04',
      title: 'Continuous Improvement',
      description: 'Establish feedback loops and metrics to ensure sustainable quality improvements over time.'
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
            QA Consulting Services
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Transform your quality assurance and release management practices with strategic guidance 
            from experienced practitioners who understand both the technical and human sides of quality.
          </p>
          <div className="text-sm text-gray-500 font-mono">
            [ quality_transformation = strategic + practical ]
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Can Help
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're scaling your QA team, modernizing release processes, or building quality culture, 
            we provide strategic guidance grounded in real-world experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
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

      {/* Approach Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in practical, sustainable change that respects your team's context and constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approach.map((phase, index) => (
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

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Why Work With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Practitioner Experience</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We're not just consultants—we're active QA and release management practitioners. 
                Our advice comes from current, hands-on experience with modern development teams and delivery challenges.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Context-Aware Solutions</h3>
              <p className="text-gray-600 leading-relaxed">
                Every organization is different. We take time to understand your specific context, 
                constraints, and culture before recommending changes that will actually stick.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainable Change</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We focus on building internal capability, not dependency. Our goal is to leave you 
                with the knowledge, processes, and confidence to continue improving independently.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Balanced Perspective</h3>
              <p className="text-gray-600 leading-relaxed">
                Quality isn't just about testing—it's about the entire delivery system. We help you 
                balance speed, safety, and sustainability in ways that work for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Engagement Options
            </h2>
            <p className="text-xl text-gray-600">
              Flexible arrangements to fit your needs and timeline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <Clock className="h-12 w-12 text-indigo-900 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Strategic Assessment</h3>
              <p className="text-gray-600 mb-4">
                2-4 week engagement to assess current state and provide strategic recommendations.
              </p>
              <div className="text-sm text-gray-500 font-mono">
                [ duration: 2-4_weeks ]
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <Users className="h-12 w-12 text-indigo-900 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Implementation Support</h3>
              <p className="text-gray-600 mb-4">
                3-6 month engagement to guide implementation of new processes and practices.
              </p>
              <div className="text-sm text-gray-500 font-mono">
                [ duration: 3-6_months ]
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <Target className="h-12 w-12 text-indigo-900 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ongoing Advisory</h3>
              <p className="text-gray-600 mb-4">
                Regular check-ins and guidance as your team grows and processes evolve.
              </p>
              <div className="text-sm text-gray-500 font-mono">
                [ duration: ongoing ]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Quality Practice?
          </h2>
          <p className="text-xl text-indigo-200 mb-8">
            Let's discuss how we can help you build more effective, sustainable quality processes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:ade@nullexpected.com"
              className="inline-flex items-center px-8 py-4 btn-themed font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </a>
            
            <a
              href="https://www.linkedin.com/in/adevitan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Linkedin className="mr-2 h-5 w-5" />
              Connect on LinkedIn
            </a>
          </div>

          <div className="mt-8 text-indigo-300 text-sm">
            <p>Initial consultation is always complimentary</p>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Learn More About Our Approach
          </h2>
          <p className="text-gray-600 mb-8">
            Explore our thinking on quality, process, and team development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              Read Our Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/manifesto"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              Our Manifesto
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;