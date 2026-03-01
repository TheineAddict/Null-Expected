import React from 'react';
import { Swords, Dices } from 'lucide-react';
import type { CharacterSheet, Attack } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';
import { computeAttackBonus, formatModifier, resolveProficiencyBonus } from '../model/derive';

interface CombatSectionProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

const AttackCard: React.FC<{ attack: Attack; toHitBonus: number }> = ({ attack, toHitBonus }) => (
  <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-2.5 sm:p-3 flex flex-col gap-1">
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <h3 className="text-sm font-semibold text-slate-900">{attack.name}</h3>
      <span className="text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full px-2 py-0.5 flex items-center gap-1">
        <Dices className="h-3 w-3" />
        d20 {formatModifier(toHitBonus)}
      </span>
    </div>
    <div className="flex flex-col gap-0.5 text-xs text-slate-700">
      {attack.damage.map((line) => (
        <div key={line.id} className="flex justify-between gap-2">
          <span className="text-slate-600">{line.label ?? 'Damage'}</span>
          <span className="tabular-nums font-medium text-slate-900">
            {line.dice}
            {line.damageType ? ` ${line.damageType}` : ''}
          </span>
        </div>
      ))}
    </div>
    {attack.whenToUse && <p className="text-[0.7rem] text-slate-500 mt-0.5">{attack.whenToUse}</p>}
  </div>
);

export const CombatSection: React.FC<CombatSectionProps> = ({ character }) => {
  const proficiencyBonus = resolveProficiencyBonus(character);
  const primaryAttacks = character.attacks;

  return (
    <section id="combat" className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
      <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
        <Swords className="h-3.5 w-3.5 text-indigo-600" />
        Combat
      </h2>
      <p className="text-[0.7rem] text-slate-500 flex items-center gap-1">
        <Dices className="h-3 w-3" />
        d20 + to-hit. Advantage = 2d20, take higher.
      </p>
      {character.turnGuide && character.turnGuide.steps.length > 0 && (
        <div className="rounded-lg border border-indigo-100 bg-indigo-50/70 p-2 sm:p-2.5">
          <h3 className="text-[0.7rem] font-semibold text-indigo-900 uppercase tracking-wide">
            {character.turnGuide.title}
          </h3>
          <ol className="mt-0.5 space-y-0.5 text-[0.7rem] text-indigo-950 list-decimal list-inside">
            {character.turnGuide.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}
      <div className="grid gap-2 sm:gap-2.5">
        {primaryAttacks.map((attack) => {
          const attackBonus = computeAttackBonus(attack, character.abilities, proficiencyBonus);
          return <AttackCard key={attack.id} attack={attack} toHitBonus={attackBonus} />;
        })}
      </div>
    </section>
  );
};

