import React from 'react';
import { Helmet } from 'react-helmet-async';
import JobRadar from '../apps/job-radar/JobRadarApp';

const JobRadarApp: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Null Expected Job Radar</title>
      </Helmet>
      <JobRadar />
    </>
  );
};

export default JobRadarApp;
