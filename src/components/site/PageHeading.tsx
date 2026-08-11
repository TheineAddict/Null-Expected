import type { ReactNode } from 'react';
import { SEO } from '../SEO';

type PageHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Image/illustration shown above the title in centered layouts. */
  topMedia?: ReactNode;
  /** Image/illustration shown in a split grid (right column). */
  media?: ReactNode;
  /** When provided, renders an SEO tag alongside the heading. */
  seo?: { title: string; description: string; path: string };
  /** Extra classes for the header element (borders, backgrounds, etc.). */
  className?: string;
  /** Action buttons, tag filters, or other content below the description. */
  children?: ReactNode;
};

const PageHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  topMedia,
  media,
  seo,
  className,
  children,
}: PageHeadingProps) => {
  const isCenter = align === 'center';

  const textContent = (
    <>
      {eyebrow && <p className="site-eyebrow mb-3">{eyebrow}</p>}
      <h1 className="site-page-title mb-5">{title}</h1>
      {description && <p className="site-page-lead">{description}</p>}
      {children && <div className="mt-8">{children}</div>}
    </>
  );

  return (
    <>
      {seo && (
        <SEO title={seo.title} description={seo.description} path={seo.path} />
      )}
      <header
        className={`site-hero site-shell ${isCenter ? 'text-center' : ''} ${className || ''}`.trim()}
      >
        {media ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-12 items-center">
            <div>{textContent}</div>
            <div className="flex justify-center lg:justify-end">{media}</div>
          </div>
        ) : (
          <div className={isCenter ? 'site-intro-width mx-auto' : 'site-intro-width'}>
            {topMedia && (
              <div className={`mb-5 ${isCenter ? 'flex justify-center' : ''}`}>
                {topMedia}
              </div>
            )}
            {textContent}
          </div>
        )}
      </header>
    </>
  );
};

export default PageHeading;
