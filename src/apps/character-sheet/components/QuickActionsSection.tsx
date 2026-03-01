import React, { useState, useEffect } from 'react';

const SCROLL_THRESHOLD = 400;

const scrollToTop = () => {
  document.getElementById('top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const LINKS: { label: string; id: string }[] = [
  { label: '↑ Top', id: 'top' },
  { label: 'HP', id: 'hp' },
  { label: 'Combat', id: 'combat' },
  { label: 'Limited Uses', id: 'limited-uses' },
  { label: 'Saves/Skills', id: 'saves-skills' },
  { label: 'Traits', id: 'traits' },
  { label: 'Reactions', id: 'reactions' },
  { label: 'Hope', id: 'hope' },
];

export const QuickActionsSection: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {LINKS.map(({ label, id }) => (
        <button
          key={id}
          type="button"
          onClick={() => scrollTo(id)}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full px-2.5 py-1 touch-manipulation"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Return to top"
      className="fixed w-10 h-10 rounded-full bg-slate-200/90 hover:bg-slate-300/90 text-slate-600 hover:text-slate-800 shadow-sm border border-slate-200/80 flex items-center justify-center text-lg touch-manipulation transition-colors"
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
        right: 'max(1rem, env(safe-area-inset-right, 0px))',
      }}
    >
      ↑
    </button>
  );
};
