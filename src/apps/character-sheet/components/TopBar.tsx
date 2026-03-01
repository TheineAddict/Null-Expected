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
    <section className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-col space-y-3">
      <div className="flex flex-row items-start gap-4">
        <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-full border border-slate-200 bg-slate-100 shadow-sm overflow-hidden">
          {character.portraitUrl ? (
            <img
              src={character.portraitUrl}
              alt={`${character.name} portrait`}
              className="h-full w-full rounded-full object-cover shrink-0"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <h1 className="text-xl sm:text-2xl font-semibold leading-tight text-slate-900">{character.name}</h1>
          <p className="text-sm text-slate-600 leading-snug">
            Level {character.level} · {character.classes}
            {character.ancestry && ` · ${character.ancestry}`}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <div className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs flex items-center gap-1.5">
              <span aria-hidden>🛡️</span>
              <span className="text-slate-500">AC</span>
              <span className="tabular-nums font-semibold text-slate-900">{character.armorClass}</span>
            </div>
            <div className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs flex items-center gap-1.5">
              <span aria-hidden>⚡</span>
              <span className="text-slate-500">Init</span>
              <span className="tabular-nums font-semibold text-slate-900">{formatModifier(character.initiativeMod)}</span>
            </div>
            <div className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs flex items-center gap-1.5">
              <span aria-hidden>👟</span>
              <span className="text-slate-500">Speed</span>
              <span className="tabular-nums font-semibold text-slate-900">{character.speed}</span>
            </div>
            <div className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs flex items-center gap-1.5">
              <span aria-hidden>⭐</span>
              <span className="text-slate-500">Prof</span>
              <span className="tabular-nums font-semibold text-slate-900">{formatModifier(proficiencyBonus)}</span>
            </div>
          </div>
        </div>
      </div>
      {((character.defenses &&
          ((character.defenses.resistances?.length ?? 0) + (character.defenses.immunities?.length ?? 0) > 0)) ||
          (character.languages?.length ?? 0) > 0) && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 leading-snug pt-1 border-t border-slate-100">
            {character.defenses?.resistances?.length
              ? (() => {
                  const byCond = new Map<string, string[]>();
                  for (const r of character.defenses!.resistances!) {
                    const key = r.condition ?? '';
                    if (!byCond.has(key)) byCond.set(key, []);
                    byCond.get(key)!.push(r.damageType);
                  }
                  return Array.from(byCond.entries()).map(([cond, types]) => (
                    <span key={`res-${cond || 'always'}`}>
                      <span className="font-medium text-slate-700">
                        🛡️ Resistances{cond ? ` (${cond})` : ''}:
                      </span>{' '}
                      {types.join(', ')}
                    </span>
                  ));
                })()
              : null}
            {character.defenses?.immunities?.length
              ? (() => {
                  const byCond = new Map<string, string[]>();
                  for (const i of character.defenses!.immunities!) {
                    const key = i.condition ?? '';
                    if (!byCond.has(key)) byCond.set(key, []);
                    byCond.get(key)!.push(i.damageType);
                  }
                  return Array.from(byCond.entries()).map(([cond, types]) => (
                    <span key={`imm-${cond || 'always'}`}>
                      <span className="font-medium text-slate-700">
                        🔥 Immunities{cond ? ` (${cond})` : ''}:
                      </span>{' '}
                      {types.join(', ')}
                    </span>
                  ));
                })()
              : null}
            {character.languages?.length ? (
              <span>
                <span className="font-medium text-slate-700">🗣️ Languages:</span>{' '}
                {character.languages.join(', ')}
              </span>
            ) : null}
          </div>
        )}
      <div className="border-t border-slate-100 pt-3">
        <div className="flex flex-wrap gap-2">
          {(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const).map((ability) => (
            <div
              key={ability}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2 justify-between min-w-[4rem]"
            >
              <span className="text-xs font-semibold text-slate-700">{ability}</span>
              <span className="tabular-nums font-semibold text-slate-900">
                {character.abilities[ability]} ({formatModifier(abilityMods[ability])})
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

