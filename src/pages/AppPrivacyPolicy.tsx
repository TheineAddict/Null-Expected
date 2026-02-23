import React from 'react';
import { SEO } from '../components/SEO';

const AppPrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Null Expected: Loops - Privacy Policy"
        description="Privacy policy for Null Expected: Loops mobile application"
        noIndex={true}
      />
      <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Null Expected: Loops - Privacy Policy
          </h1>

          <p className="text-sm text-gray-500 mb-12">
            Effective date: 23 February 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <p>
              Null Expected: Loops (the "app") is built to work offline-first and private by default.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What the app stores</h2>
              <p>
                The app stores your practice data on your device. This can include progress, loop history, and app settings. This data is used only to provide the app's features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What the app collects and sends</h2>
              <p>
                The app does not require an account and does not send your practice data to our servers by default. We do not sell your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Support and contact</h2>
              <p>
                If you choose to contact us (for example via our support website), you may provide information like your email address and message content. We use it only to respond and provide support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-party services</h2>
              <p>
                The app is intended to run without third-party trackers. If optional services are added later (for example crash reporting), this policy will be updated to describe what data is collected, why, and how you can opt out where applicable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data retention and deletion</h2>
              <p>
                Your practice data remains on your device until you delete the app, clear the app's storage, or use a wipe/reset option if available. Support messages may be retained as long as needed for support history.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Security</h2>
              <p>
                We take reasonable steps to protect information we handle, but no system is perfectly secure. You are responsible for protecting access to your device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's privacy</h2>
              <p>
                The app is not intended for children under 13. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The latest version will be available at:
              </p>
              <p className="text-gray-600">
                https://www.nullexpected.com/app-privacy-policy
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

export default AppPrivacyPolicy;
