import React from 'react';
import { Reply } from 'lucide-react';
import type { CharacterSheet, Reaction } from '../model/character.types';
import { bodyTextClass } from '../textClasses';

interface ReactionsSectionProps {
  character: CharacterSheet;
}

const ReactionCard: React.FC<{ reaction: Reaction }> = ({ reaction }) => (
  <div className="rounded-lg border border-slate-200 bg-slate-50/80 overflow-hidden">
    <div className="px-2.5 py-2 sm:px-3 sm:py-2">
      <h4 className="text-sm font-semibold text-slate-900">{reaction.name}</h4>
      <p className={`mt-0.5 ${bodyTextClass}`}>
        <span className="font-medium text-slate-700">Trigger:</span> {reaction.trigger}
      </p>
      {reaction.roll && (
        <p className={`mt-0.5 ${bodyTextClass}`}>
          <span className="font-medium text-slate-700">Roll:</span> {reaction.roll}
        </p>
      )}
      <p className={`mt-0.5 ${bodyTextClass}`}>{reaction.effect}</p>
      {reaction.notes && (
        <p className={`mt-0.5 ${bodyTextClass}`}>{reaction.notes}</p>
      )}
    </div>
  </div>
);

export const ReactionsSection: React.FC<ReactionsSectionProps> = ({ character }) => {
  const reactions = character.reactions ?? [];
  if (reactions.length === 0) return null;

  return (
    <section id="reactions" className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-col space-y-3">
      <h2 className="text-base font-semibold leading-tight text-slate-900 flex items-center gap-1.5">
        <Reply className="h-4 w-4 text-amber-500" />
        Reactions
      </h2>
      <div className="border-b border-slate-100 mt-2 mb-3" aria-hidden />
      <div className="grid gap-2 sm:grid-cols-2">
        {reactions.map((reaction) => (
          <ReactionCard key={reaction.id} reaction={reaction} />
        ))}
      </div>
    </section>
  );
};
