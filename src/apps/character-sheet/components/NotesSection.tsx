import React from 'react';
import { StickyNote } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';

interface NotesSectionProps {
  character: CharacterSheet;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ character }) => {
  if (!character.notes) return null;

  const lines = character.notes.split('\n').filter(Boolean);

  return (
    <section className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4">
      <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
        <StickyNote className="h-3.5 w-3.5 text-amber-500" />
        Notes
      </h2>
      <div className="text-[0.75rem] text-slate-800 space-y-0.5">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </section>
  );
};

