import React from 'react';
import { Reply } from 'lucide-react';
import type { CharacterSheet, Reaction } from '../model/character.types';
import { bodyTextClass, sectionClass, sectionTitleClass, sectionDividerClass, innerCardClass } from '../textClasses';

interface ReactionsSectionProps {
  character: CharacterSheet;
}

const ReactionCard: React.FC<{ reaction: Reaction }> = ({ reaction }) => (
  <div className={innerCardClass}>
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
);

export const ReactionsSection: React.FC<ReactionsSectionProps> = ({ character }) => {
  const reactions = character.reactions ?? [];
  if (reactions.length === 0) return null;

  return (
    <section id="reactions" className={sectionClass}>
      <h2 className={sectionTitleClass}>
        <Reply className="h-4 w-4 text-amber-500" />
        Reactions
      </h2>
      <div className={sectionDividerClass} aria-hidden />
      <div className="grid gap-3 sm:grid-cols-2">
        {reactions.map((reaction) => (
          <ReactionCard key={reaction.id} reaction={reaction} />
        ))}
      </div>
    </section>
  );
};
