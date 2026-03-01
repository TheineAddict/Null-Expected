import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { CharacterSheet, Trait } from '../model/character.types';

interface TraitsSectionProps {
  character: CharacterSheet;
}

const TraitCard: React.FC<{ trait: Trait }> = ({ trait }) => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = trait.details || (trait.reminders && trait.reminders.length > 0);

  return (
    <div
      className={`rounded-lg border border-slate-100 bg-slate-50/80 overflow-hidden ${
        hasMore ? 'cursor-pointer touch-manipulation' : ''
      }`}
      onClick={hasMore ? () => setExpanded((e) => !e) : undefined}
      onKeyDown={
        hasMore
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setExpanded((prev) => !prev);
              }
            }
          : undefined
      }
      role={hasMore ? 'button' : undefined}
      tabIndex={hasMore ? 0 : undefined}
    >
      <div className="px-2.5 py-2 sm:px-3 sm:py-2 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="text-xs font-semibold text-slate-900">{trait.name}</h4>
            <span
              className={`text-[0.65rem] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded ${
                trait.type === 'Toggle' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {trait.type}
            </span>
          </div>
          <p className="text-[0.7rem] text-slate-700 mt-0.5">{trait.summary}</p>
        </div>
        {hasMore && (
          <span
            className={`shrink-0 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            aria-hidden
          >
            ▼
          </span>
        )}
      </div>
      {expanded && hasMore && (
        <div className="border-t border-slate-100 px-2.5 py-2 sm:px-3 sm:py-2 bg-white/80 space-y-2">
          {trait.details && (
            <p className="text-[0.7rem] text-slate-700">{trait.details}</p>
          )}
          {trait.reminders && trait.reminders.length > 0 && (
            <ul className="list-disc list-inside text-[0.7rem] text-slate-600 space-y-0.5">
              {trait.reminders.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export const TraitsSection: React.FC<TraitsSectionProps> = ({ character }) => {
  const traits = character.traits ?? [];
  if (traits.length === 0) return null;

  return (
    <section className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
      <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-violet-500" />
        Traits
      </h2>
      <div className="grid gap-1.5 sm:grid-cols-2">
        {traits.map((trait) => (
          <TraitCard key={trait.id} trait={trait} />
        ))}
      </div>
    </section>
  );
};
