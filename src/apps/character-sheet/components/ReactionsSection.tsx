import React, { useState } from 'react';
import { Reply } from 'lucide-react';
import type { CharacterSheet, Reaction } from '../model/character.types';

interface ReactionsSectionProps {
  character: CharacterSheet;
}

const ReactionCard: React.FC<{ reaction: Reaction }> = ({ reaction }) => {
  const [expanded, setExpanded] = useState(false);
  const hasNotes = Boolean(reaction.notes);

  return (
    <div
      className={`rounded-lg border border-slate-100 bg-slate-50/80 overflow-hidden ${
        hasNotes ? 'cursor-pointer touch-manipulation' : ''
      }`}
      onClick={hasNotes ? () => setExpanded((e) => !e) : undefined}
      onKeyDown={
        hasNotes
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setExpanded((prev) => !prev);
              }
            }
          : undefined
      }
      role={hasNotes ? 'button' : undefined}
      tabIndex={hasNotes ? 0 : undefined}
    >
      <div className="px-2.5 py-2 sm:px-3 sm:py-2">
        <h4 className="text-xs font-semibold text-slate-900">{reaction.name}</h4>
        <p className="text-[0.65rem] text-slate-600 mt-0.5">
          <span className="font-medium text-slate-700">Trigger:</span> {reaction.trigger}
        </p>
        {reaction.roll && (
          <p className="text-[0.65rem] text-slate-600 mt-0.5">
            <span className="font-medium text-slate-700">Roll:</span> {reaction.roll}
          </p>
        )}
        <p className="text-[0.7rem] text-slate-700 mt-0.5">{reaction.effect}</p>
        {hasNotes && (
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[0.65rem] text-slate-500">Tap for notes</span>
            <span
              className={`shrink-0 text-slate-400 text-[0.65rem] transition-transform ${expanded ? 'rotate-180' : ''}`}
              aria-hidden
            >
              ▼
            </span>
          </div>
        )}
      </div>
      {expanded && hasNotes && reaction.notes && (
        <div className="border-t border-slate-100 px-2.5 py-2 sm:px-3 sm:py-2 bg-white/80">
          <p className="text-[0.7rem] text-slate-700">{reaction.notes}</p>
        </div>
      )}
    </div>
  );
};

export const ReactionsSection: React.FC<ReactionsSectionProps> = ({ character }) => {
  const reactions = character.reactions ?? [];
  if (reactions.length === 0) return null;

  return (
    <section className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
      <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
        <Reply className="h-3.5 w-3.5 text-amber-500" />
        Reactions
      </h2>
      <div className="grid gap-1.5 sm:grid-cols-2">
        {reactions.map((reaction) => (
          <ReactionCard key={reaction.id} reaction={reaction} />
        ))}
      </div>
    </section>
  );
};
