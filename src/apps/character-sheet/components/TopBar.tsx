import React from 'react';
import type { CharacterSheet } from '../model/character.types';
import { deriveAbilityModifiers, formatModifier, resolveProficiencyBonus } from '../model/derive';

interface TopBarProps {
  character: CharacterSheet;
}

export const TopBar: React.FC<TopBarProps> = ({ character }) => {
  const abilityMods = deriveAbilityModifiers(character.abilities);
  const proficiencyBonus = resolveProficiencyBonus(character);

  return (
    <section className="rounded-xl bg-white shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{character.name}</h1>
          <p className="text-sm text-gray-600">
            Level {character.level} · {character.classes}
          </p>
          {character.ancestry && (
            <p className="text-xs text-gray-500">
              {character.ancestry}
              {character.background ? ` · ${character.background}` : ''}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-900 flex flex-col items-center min-w-[4.5rem]">
            <span className="text-[0.7rem] uppercase tracking-wide text-indigo-700">AC</span>
            <span className="text-lg font-semibold">{character.armorClass}</span>
          </div>
          <div className="px-3 py-2 rounded-lg bg-slate-50 text-slate-900 flex flex-col items-center min-w-[4.5rem]">
            <span className="text-[0.7rem] uppercase tracking-wide text-slate-600">Init</span>
            <span className="text-lg font-semibold">{formatModifier(character.initiativeMod)}</span>
          </div>
          <div className="px-3 py-2 rounded-lg bg-slate-50 text-slate-900 flex flex-col items-center min-w-[4.5rem]">
            <span className="text-[0.7rem] uppercase tracking-wide text-slate-600">Speed</span>
            <span className="text-lg font-semibold">{character.speed}</span>
          </div>
          <div className="px-3 py-2 rounded-lg bg-slate-50 text-slate-900 flex flex-col items-center min-w-[4.5rem]">
            <span className="text-[0.7rem] uppercase tracking-wide text-slate-600">Prof</span>
            <span className="text-lg font-semibold">{formatModifier(proficiencyBonus)}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
        {(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const).map((ability) => (
          <div
            key={ability}
            className="px-2 py-1 rounded-md bg-gray-50 border border-gray-100 flex items-center gap-1 min-w-[3.5rem] justify-between"
          >
            <span className="font-semibold text-gray-700">{ability}</span>
            <span className="tabular-nums text-gray-900">
              {character.abilities[ability]} ({formatModifier(abilityMods[ability])})
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

