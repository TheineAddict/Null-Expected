import React from 'react';
import { Zap } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';
import { sectionClass, sectionTitleClass, sectionDividerClass, subSectionHeaderClass } from '../textClasses';

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
    <section id="actions" className={`${sectionClass} scroll-mt-4`}>
      <h2 className={sectionTitleClass}>
        <Zap className="h-4 w-4 text-amber-500" />
        Actions &amp; Passives
      </h2>
      <div className={sectionDividerClass} aria-hidden />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map(({ key, title }) => {
          const list = c[key] as SimpleFeature[] | undefined;
          if (!list || list.length === 0) return null;

          return (
            <div key={key} className="flex flex-col gap-1.5">
              <h3 className={subSectionHeaderClass}>{title}</h3>
              <ul className="space-y-1">
                {list.map((feat) => (
                  <li
                    key={feat.id}
                    className="rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-[0.7rem] text-slate-800"
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
