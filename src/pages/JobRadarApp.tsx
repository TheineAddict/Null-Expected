import React from 'react';
import { Helmet } from 'react-helmet-async';

const JobRadarApp: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Job Radar App</title>
      </Helmet>
      <div className="min-h-screen bg-white">
        <div id="job-radar-root" className="w-full h-full">
          {/* Placeholder for Job Radar App */}
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Radar App</h1>
              <p className="text-gray-600">This is a placeholder. Add your app here.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobRadarApp;
