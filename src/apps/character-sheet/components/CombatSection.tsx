import React from 'react';
import type { CharacterSheet, Attack } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';
import { computeAttackBonus, formatModifier, resolveProficiencyBonus, deriveAbilityModifiers } from '../model/derive';

interface CombatSectionProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

const AdvantageHint: React.FC = () => (
  <p className="text-[0.7rem] text-gray-500">
    To attack, roll <span className="font-semibold">d20 + to‑hit bonus</span>. If you have advantage, roll{' '}
    <span className="font-semibold">2d20</span> and take the higher.
  </p>
);

const AttackCard: React.FC<{ attack: Attack; toHitBonus: number }> = ({ attack, toHitBonus }) => (
  <div className="rounded-lg border border-gray-100 bg-white p-3 flex flex-col gap-1">
    <div className="flex items-baseline justify-between gap-2">
      <h3 className="text-sm font-semibold text-gray-900">{attack.name}</h3>
      <span className="text-xs font-medium text-indigo-900 bg-indigo-50 rounded-full px-2 py-0.5">
        To hit: d20 {formatModifier(toHitBonus)}
      </span>
    </div>
    <div className="flex flex-col gap-1 text-xs text-gray-700">
      {attack.damage.map((line) => (
        <div key={line.id} className="flex justify-between gap-2">
          <span className="font-medium text-gray-700">
            {line.label ?? 'Damage'}:
          </span>
          <span className="tabular-nums text-gray-900">
            {line.dice}
            {line.damageType ? ` ${line.damageType}` : ''}
          </span>
        </div>
      ))}
    </div>
    {attack.whenToUse && <p className="text-[0.7rem] text-gray-500 mt-1">{attack.whenToUse}</p>}
  </div>
);

export const CombatSection: React.FC<CombatSectionProps> = ({ character }) => {
  const proficiencyBonus = resolveProficiencyBonus(character);
  const abilityMods = deriveAbilityModifiers(character.abilities);

  const primaryAttacks = character.attacks;

  return (
    <section className="rounded-xl bg-white shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-800 tracking-wide uppercase">Combat at a Glance</h2>
        <span className="text-xs text-gray-500">
          Front page: primary attacks, with and without Rage if listed.
        </span>
      </div>
      <AdvantageHint />
      {character.turnGuide && (
        <div className="mt-2 rounded-lg border border-indigo-100 bg-indigo-50/60 p-3">
          <h3 className="text-xs font-semibold text-indigo-900 uppercase tracking-wide">
            {character.turnGuide.title}
          </h3>
          <ol className="mt-1 space-y-0.5 text-xs text-indigo-950 list-decimal list-inside">
            {character.turnGuide.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}
      <div className="mt-2 grid gap-3">
        {primaryAttacks.map((attack) => {
          const attackBonus = computeAttackBonus(attack, character.abilities, proficiencyBonus);
          return <AttackCard key={attack.id} attack={attack} toHitBonus={attackBonus} />;
        })}
      </div>
      <p className="text-[0.7rem] text-gray-500">
        To make a saving throw or skill check, roll <span className="font-semibold">d20 + modifier</span> from the
        sections below.
      </p>
      <div className="text-[0.7rem] text-gray-500">
        <p className="font-semibold text-gray-700">Quick ability reminders:</p>
        <p>STR (Athletics) · DEX (Acrobatics, Stealth) · CON (Con saves) · INT (Investigation, knowledge) · WIS (Perception, Insight, Survival) · CHA (social checks).</p>
      </div>
    </section>
  );
};

