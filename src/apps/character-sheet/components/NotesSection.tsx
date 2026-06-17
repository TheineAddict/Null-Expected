import React from 'react';
import { StickyNote } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';
import { bodyTextClass, sectionClass, sectionTitleClass, sectionDividerClass } from '../textClasses';

interface NotesSectionProps {
  character: CharacterSheet;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ character }) => {
  if (!character.notes) return null;

  const lines = character.notes.split('\n').filter(Boolean);

  return (
    <section id="notes" className={`${sectionClass} scroll-mt-4`}>
      <h2 className={sectionTitleClass}>
        <StickyNote className="h-4 w-4 text-amber-500" />
        Notes
      </h2>
      <div className={sectionDividerClass} aria-hidden />
      <div className="space-y-1">
        {lines.map((line, i) => (
          <p key={i} className={bodyTextClass}>{line}</p>
        ))}
      </div>
    </section>
  );
};
