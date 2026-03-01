import React from 'react';
import { Zap } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';

interface ActionsSectionProps {
  character: CharacterSheet;
}

interface SimpleFeature {
  id: string;
  name: string;
  body: string;
}

interface CharacterWithActions extends CharacterSheet {
  actions?: SimpleFeature[];
  bonusActions?: SimpleFeature[];
  reactions?: SimpleFeature[];
  passives?: SimpleFeature[];
}

export const ActionsSection: React.FC<ActionsSectionProps> = ({ character }) => {
  const c = character as CharacterWithActions;

  const sections: { key: keyof CharacterWithActions; title: string }[] = [
    { key: 'actions', title: 'Actions' },
    { key: 'bonusActions', title: 'Bonus Actions' },
    { key: 'reactions', title: 'Reactions' },
    { key: 'passives', title: 'Passives' },
  ];

  const hasAny =
    (c.actions?.length ?? 0) +
      (c.bonusActions?.length ?? 0) +
      (c.reactions?.length ?? 0) +
      (c.passives?.length ?? 0) >
    0;

  if (!hasAny) return null;

  return (
    <section className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
      <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
        <Zap className="h-3.5 w-3.5 text-amber-500" />
        Actions & passives
      </h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map(({ key, title }) => {
          const list = c[key] as SimpleFeature[] | undefined;
          if (!list || list.length === 0) return null;

          return (
            <div key={key} className="flex flex-col gap-1">
              <h3 className="text-[0.7rem] font-semibold text-slate-600 uppercase tracking-wide">{title}</h3>
              <ul className="space-y-0.5">
                {list.map((feat) => (
                  <li
                    key={feat.id}
                    className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1 text-[0.7rem] text-slate-800"
                  >
                    <span className="font-semibold text-slate-800">{feat.name}:</span>{' '}
                    <span className="text-slate-700">{feat.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

