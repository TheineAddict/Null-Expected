import React from 'react';
import { Shield, Zap, Gauge, BadgeCheck } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';
import { deriveAbilityModifiers, formatModifier, resolveProficiencyBonus } from '../model/derive';

interface TopBarProps {
  character: CharacterSheet;
}

export const TopBar: React.FC<TopBarProps> = ({ character }) => {
  const abilityMods = deriveAbilityModifiers(character.abilities);
  const proficiencyBonus = resolveProficiencyBonus(character);

  return (
    <section className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-full border border-slate-200 bg-slate-100 shadow-sm overflow-hidden">
            {character.portraitUrl ? (
              <img
                src={character.portraitUrl}
                alt={`${character.name} portrait`}
                className="h-full w-full rounded-full object-cover shrink-0"
              />
            ) : null}
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900">{character.name}</h1>
            <p className="text-sm text-slate-600">
              Level {character.level} · {character.classes}
              {character.ancestry && ` · ${character.ancestry}`}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <div className="px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-900 flex items-center gap-1.5 min-w-[3.5rem]">
            <Shield className="h-3.5 w-3.5 text-indigo-600" />
            <span className="text-xs font-medium text-indigo-700">AC</span>
            <span className="text-base font-semibold tabular-nums">{character.armorClass}</span>
          </div>
          <div className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 flex items-center gap-1.5 min-w-[3.5rem]">
            <Zap className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-xs font-medium text-slate-600">Init</span>
            <span className="text-base font-semibold tabular-nums">{formatModifier(character.initiativeMod)}</span>
          </div>
          <div className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 flex items-center gap-1.5 min-w-[3.5rem]">
            <Gauge className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-xs font-medium text-slate-600">Speed</span>
            <span className="text-base font-semibold tabular-nums">{character.speed}</span>
          </div>
          <div className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 flex items-center gap-1.5 min-w-[3.5rem]">
            <BadgeCheck className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-xs font-medium text-slate-600">Prof</span>
            <span className="text-base font-semibold tabular-nums">{formatModifier(proficiencyBonus)}</span>
          </div>
        </div>
      </div>
      {((character.defenses &&
          ((character.defenses.resistances?.length ?? 0) + (character.defenses.immunities?.length ?? 0) > 0)) ||
          (character.languages?.length ?? 0) > 0) && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] text-slate-600 border-t border-slate-100 pt-2">
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
      <div className="flex flex-wrap gap-1.5 text-xs">
        {(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const).map((ability) => (
          <div
            key={ability}
            className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100 flex items-center gap-1 min-w-[2.75rem] justify-between"
          >
            <span className="font-semibold text-slate-700">{ability}</span>
            <span className="tabular-nums text-slate-900">
              {character.abilities[ability]} ({formatModifier(abilityMods[ability])})
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

