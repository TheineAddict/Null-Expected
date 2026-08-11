import type { ReactNode } from 'react';
import { SEO } from '../SEO';

type PageHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** When provided, renders an SEO tag alongside the heading. */
  seo?: { title: string; description: string; path: string };
};

const PageHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  seo,
}: PageHeadingProps) => {
  const isCenter = align === 'center';

  return (
    <>
      {seo && (
        <SEO title={seo.title} description={seo.description} path={seo.path} />
      )}
      <header
        className={`site-shell pt-16 md:pt-20 pb-10 md:pb-14 ${isCenter ? 'text-center' : ''}`}
      >
        <div className={isCenter ? 'max-w-3xl mx-auto' : 'max-w-3xl'}>
          {eyebrow && (
            <p className="site-eyebrow mb-3">{eyebrow}</p>
          )}
          <h1 className="site-page-title mb-4">{title}</h1>
          {description && (
            <p className="site-page-lead">{description}</p>
          )}
        </div>
      </header>
    </>
  );
};

export default PageHeading;
