import React, { useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import type { CharacterSheet, Trait } from '../model/character.types';
import { bodyTextClass, sectionClass, sectionTitleClass, sectionDividerClass, badgeClass } from '../textClasses';

interface TraitsSectionProps {
  character: CharacterSheet;
}

const TraitCard: React.FC<{ trait: Trait }> = ({ trait }) => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = trait.details || (trait.reminders && trait.reminders.length > 0);

  return (
    <div
      className={`rounded-lg border border-slate-200 bg-slate-50/50 overflow-hidden ${
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
      aria-expanded={hasMore ? expanded : undefined}
    >
      <div className="p-3 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="text-xs font-semibold text-slate-900">{trait.name}</h4>
            <span
              className={`${badgeClass} ${
                trait.type === 'Toggle' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {trait.type}
            </span>
          </div>
          <p className={`${bodyTextClass} mt-0.5`}>{trait.summary}</p>
        </div>
        {hasMore && (
          <ChevronDown
            className={`shrink-0 h-3.5 w-3.5 text-slate-400 transition-transform self-center ${expanded ? 'rotate-180' : ''}`}
            aria-hidden
          />
        )}
      </div>
      {expanded && hasMore && (
        <div className="border-t border-slate-100 p-3 bg-white/80 space-y-2">
          {trait.details && <p className={bodyTextClass}>{trait.details}</p>}
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
    <section id="traits" className={`${sectionClass} scroll-mt-4`}>
      <h2 className={sectionTitleClass}>
        <Sparkles className="h-4 w-4 text-violet-500" />
        Traits
      </h2>
      <div className={sectionDividerClass} aria-hidden />
      <div className="grid gap-3 sm:grid-cols-2">
        {traits.map((trait) => (
          <TraitCard key={trait.id} trait={trait} />
        ))}
      </div>
    </section>
  );
};
