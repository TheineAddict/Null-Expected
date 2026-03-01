import React from 'react';
import { Swords, Dices } from 'lucide-react';
import type { CharacterSheet, Attack } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';
import { computeAttackBonus, formatModifier, resolveProficiencyBonus } from '../model/derive';
import { bodyTextClass } from '../textClasses';

interface CombatSectionProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

const AttackCard: React.FC<{ attack: Attack; toHitBonus: number }> = ({ attack, toHitBonus }) => (
  <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 flex flex-col space-y-2">
    <div className="flex items-center justify-between gap-2">
      <h3 className="text-sm font-semibold text-slate-900">{attack.name}</h3>
      <span className="text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full px-2 py-0.5 tabular-nums font-semibold">
        d20 {formatModifier(toHitBonus)}
      </span>
    </div>
    <div className="border-t border-slate-100 pt-2" aria-hidden />
    <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 items-baseline">
      {attack.damage.map((line) => (
        <React.Fragment key={line.id}>
          <span className="text-xs text-slate-500">{line.label ?? 'Damage'}</span>
          <span className="tabular-nums font-semibold text-slate-900 text-sm">
            {line.dice}
            {line.damageType ? ` ${line.damageType}` : ''}
          </span>
        </React.Fragment>
      ))}
    </div>
    {attack.whenToUse && (
      <p className={`${bodyTextClass} pt-0.5`}>{attack.whenToUse}</p>
    )}
  </div>
);

export const CombatSection: React.FC<CombatSectionProps> = ({ character }) => {
  const proficiencyBonus = resolveProficiencyBonus(character);
  const primaryAttacks = character.attacks;

  return (
    <section id="combat" className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-col space-y-3 lg:flex-1 lg:min-h-0">
      <h2 className="text-base font-semibold leading-tight text-slate-900 flex items-center gap-1.5">
        <Swords className="h-4 w-4 text-indigo-600" />
        Combat
      </h2>
      <div className="border-b border-slate-100 mt-2 mb-3" aria-hidden />
      <p className={`${bodyTextClass} flex items-center gap-1`}>
        <Dices className="h-3.5 w-3.5" />
        d20 + to-hit. Advantage = 2d20, take higher.
      </p>
      {character.turnGuide && character.turnGuide.steps.length > 0 && (
        <div className="rounded-lg border border-indigo-100 bg-indigo-50/70 p-3 space-y-1">
          <h3 className="text-sm font-semibold text-indigo-900">
            {character.turnGuide.title}
          </h3>
          <ol className={`space-y-1 list-decimal list-inside ${bodyTextClass}`}>
            {character.turnGuide.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}
      <div className="grid gap-3">
        {primaryAttacks.map((attack) => {
          const attackBonus = computeAttackBonus(attack, character.abilities, proficiencyBonus);
          return <AttackCard key={attack.id} attack={attack} toHitBonus={attackBonus} />;
        })}
      </div>
    </section>
  );
};

