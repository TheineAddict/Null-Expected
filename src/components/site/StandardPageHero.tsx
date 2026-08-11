import type { ReactNode } from 'react';

type StandardPageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Action buttons or other content rendered below the description. */
  children?: ReactNode;
};

const StandardPageHero = ({
  eyebrow,
  title,
  description,
  children,
}: StandardPageHeroProps) => {
  return (
    <section className="site-hero-standard">
      <div className="site-shell">
        <div className="site-reading-width">
          {eyebrow && <p className="site-eyebrow mb-3">{eyebrow}</p>}
          <h1 className="site-page-title mb-5">{title}</h1>
          {description && <div className="site-page-lead">{description}</div>}
          {children && <div className="site-hero-actions mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
};

export default StandardPageHero;
