import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { CharacterSheet, Trait } from '../model/character.types';
import { bodyTextClass } from '../textClasses';

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
          <p className={`${bodyTextClass} mt-0.5`}>{trait.summary}</p>
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
            <p className={bodyTextClass}>{trait.details}</p>
          )}
          {trait.reminders && trait.reminders.length > 0 && (
            <ul className={`list-disc list-inside ${bodyTextClass} space-y-0.5`}>
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
    <section id="traits" className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-col space-y-3">
      <h2 className="text-base font-semibold leading-tight text-slate-900 flex items-center gap-1.5">
        <Sparkles className="h-4 w-4 text-violet-500" />
        Traits
      </h2>
      <div className="border-b border-slate-100 mt-2 mb-3" aria-hidden />
      <div className="grid gap-2 sm:grid-cols-2">
        {traits.map((trait) => (
          <TraitCard key={trait.id} trait={trait} />
        ))}
      </div>
    </section>
  );
};
