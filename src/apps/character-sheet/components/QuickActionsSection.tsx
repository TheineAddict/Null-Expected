import React from 'react';

const LINKS: { label: string; id: string }[] = [
  { label: 'HP', id: 'hp' },
  { label: 'Combat', id: 'combat' },
  { label: 'Limited Uses', id: 'limited-uses' },
  { label: 'Saves/Skills', id: 'saves-skills' },
  { label: 'Traits', id: 'traits' },
  { label: 'Reactions', id: 'reactions' },
  { label: 'Notes', id: 'notes' },
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
          className="text-[0.7rem] font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full px-2.5 py-1 touch-manipulation"
        >
          {label}
        </button>
      ))}
    </div>
  );
};
