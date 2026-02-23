import React from 'react';
import { SEO } from '../components/SEO';

const AppTermsOfService = () => {
  return (
    <>
      <SEO
        title="Null Expected: Loops - Terms of Service"
        description="Terms of service for Null Expected: Loops mobile application"
        noIndex={true}
      />
      <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Null Expected: Loops - Terms of Service
          </h1>

          <p className="text-sm text-gray-500 mb-12">
            Effective date: 23 February 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <p>
              These Terms of Service (the "Terms") govern your use of Null Expected: Loops (the "app"). By using the app, you agree to these Terms.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of the app</h2>
              <p>
                You may use the app for personal interview practice and learning. You agree not to misuse the app, interfere with its operation, or attempt unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No guarantees</h2>
              <p>
                The app provides practice prompts and learning content. We do not guarantee interview outcomes, job offers, or specific results.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Offline-first and your data</h2>
              <p>
                The app is designed to keep your progress on your device. You are responsible for maintaining access to your device and any backups you choose to make.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual property</h2>
              <p>
                The app, its content, and its branding are owned by Null Expected (or its licensors) and are protected by applicable laws. You may not copy, resell, redistribute, or create derivative works from the app or its content except as allowed by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback</h2>
              <p>
                If you send feedback or suggestions, you allow us to use them to improve the app without obligation to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers</h2>
              <p>
                The app is provided on an "as is" and "as available" basis. To the maximum extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of liability</h2>
              <p>
                To the maximum extent permitted by law, Null Expected will not be liable for indirect, incidental, special, consequential, or punitive damages, or any loss of data, profits, or business opportunities arising from your use of the app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes and availability</h2>
              <p>
                We may update, modify, or discontinue the app or any part of it at any time. We may also update these Terms. The latest version will be available at:
              </p>
              <p className="text-gray-600">
                https://www.nullexpected.com/app-terms-of-service
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing law</h2>
              <p>
                These Terms are governed by the laws of Romania, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Support</h2>
              <p>
                Support website: https://www.nullexpected.com/contact
              </p>
              <p>
                Support email: (to be added)
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default AppTermsOfService;
