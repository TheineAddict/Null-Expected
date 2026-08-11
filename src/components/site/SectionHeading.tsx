import type { ReactNode } from 'react';

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  size?: 'standard' | 'compact';
  tone?: 'light' | 'dark';
};

const SectionHeading = ({
  title,
  description,
  align = 'left',
  size = 'standard',
  tone = 'light',
}: SectionHeadingProps) => {
  const isCenter = align === 'center';
  const isDark = tone === 'dark';
  const isCompact = size === 'compact';

  return (
    <div className={isCenter ? 'text-center' : ''}>
      <div className={isCenter ? 'site-intro-width mx-auto' : 'site-intro-width'}>
        <h2
          className={`${isCompact ? 'site-section-title-compact' : 'site-section-title'} ${isDark ? 'site-tone-dark' : ''} mb-3`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`site-section-description ${isDark ? 'site-tone-dark-muted' : ''}`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionHeading;
