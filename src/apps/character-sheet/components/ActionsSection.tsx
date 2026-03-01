import React from 'react';
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
    <section className="rounded-xl bg-white shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-800 tracking-wide uppercase">
          Actions, Bonus Actions, Reactions & Passives
        </h2>
        <p className="text-[0.7rem] text-gray-500 max-w-xs">
          Compact reminders of what you can do on your turn. Edit text in the character file; this view is read‑only.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {sections.map(({ key, title }) => {
          const list = c[key] as SimpleFeature[] | undefined;
          if (!list || list.length === 0) return null;

          return (
            <div key={key} className="flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{title}</h3>
              <ul className="space-y-1">
                {list.map((feat) => (
                  <li
                    key={feat.id}
                    className="rounded-md border border-gray-100 bg-slate-50 px-2 py-1 text-[0.8rem] text-gray-800"
                  >
                    <span className="font-semibold">{feat.name}:</span>{' '}
                    <span className="text-gray-700">{feat.body}</span>
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

