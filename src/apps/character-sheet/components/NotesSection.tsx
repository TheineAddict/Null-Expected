import React from 'react';
import type { CharacterSheet } from '../model/character.types';

interface NotesSectionProps {
  character: CharacterSheet;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ character }) => {
  if (!character.notes) return null;

  const lines = character.notes.split('\n');

  return (
    <section className="rounded-xl bg-white shadow-sm border border-gray-100 p-4">
      <h2 className="text-sm font-semibold text-gray-800 tracking-wide uppercase mb-2">Notes</h2>
      <div className="text-xs text-gray-800 space-y-1">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
};

