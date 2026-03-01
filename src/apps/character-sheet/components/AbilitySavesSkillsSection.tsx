import React from 'react';
import type { CharacterSheet } from '../model/character.types';
import { deriveAbilityModifiers, deriveSaves, deriveSkills, formatModifier, resolveProficiencyBonus, computePassive } from '../model/derive';

interface AbilitySavesSkillsSectionProps {
  character: CharacterSheet;
}

export const AbilitySavesSkillsSection: React.FC<AbilitySavesSkillsSectionProps> = ({ character }) => {
  const abilityMods = deriveAbilityModifiers(character.abilities);
  const proficiencyBonus = resolveProficiencyBonus(character);
  const saves = deriveSaves(character.abilities, character.savingThrowProficiencies, proficiencyBonus);
  const skills = deriveSkills(character.skills, character.abilities, proficiencyBonus);

  const perception = skills.find((s) => s.id === 'perception');
  const investigation = skills.find((s) => s.id === 'investigation');
  const insight = skills.find((s) => s.id === 'insight');

  return (
    <section className="rounded-xl bg-white shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-800 tracking-wide uppercase">
          Saves, Skills & Passive Scores
        </h2>
        <p className="text-[0.7rem] text-gray-500 max-w-xs">
          For checks, roll <span className="font-semibold">d20 + modifier</span>. Proficient and expertise skills are
          highlighted.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Saving Throws</h3>
          <ul className="space-y-0.5 text-xs text-gray-800">
            {saves.map((save) => (
              <li
                key={save.ability}
                className="flex items-center justify-between rounded-md px-2 py-1 bg-gray-50 border border-gray-100"
              >
                <span className="font-medium text-gray-700">
                  {save.ability} Save
                  {save.proficient && <span className="ml-1 text-[0.7rem] text-indigo-700">(prof)</span>}
                </span>
                <span className="tabular-nums font-semibold text-gray-900">{formatModifier(save.modifier)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Skills</h3>
          <ul className="space-y-0.5 text-xs text-gray-800">
            {skills
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((skill) => (
                <li
                  key={skill.id}
                  className={`flex items-center justify-between rounded-md px-2 py-1 border ${
                    skill.expertise
                      ? 'bg-indigo-50 border-indigo-200'
                      : skill.proficient
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-white border-gray-100'
                  }`}
                >
                  <span className="font-medium text-gray-700">
                    {skill.name}
                    <span className="ml-1 text-[0.7rem] text-gray-500">({skill.ability})</span>
                    {skill.expertise && <span className="ml-1 text-[0.7rem] text-indigo-700">x2 prof</span>}
                    {!skill.expertise && skill.proficient && (
                      <span className="ml-1 text-[0.7rem] text-slate-700">prof</span>
                    )}
                  </span>
                  <span className="tabular-nums font-semibold text-gray-900">
                    {formatModifier(skill.modifier)}
                  </span>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Passive Scores</h3>
          <div className="grid gap-2 text-xs text-gray-800">
            <div className="rounded-md border border-gray-100 bg-slate-50 px-3 py-2 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Passive Perception</p>
                <p className="text-[0.7rem] text-gray-500">Notice hidden threats and details without rolling.</p>
              </div>
              <span className="text-lg font-semibold tabular-nums text-gray-900">
                {perception ? computePassive(perception.modifier) : 10}
              </span>
            </div>
            <div className="rounded-md border border-gray-100 bg-slate-50 px-3 py-2 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Passive Investigation</p>
                <p className="text-[0.7rem] text-gray-500">Automatically notice clues when searching.</p>
              </div>
              <span className="text-lg font-semibold tabular-nums text-gray-900">
                {investigation ? computePassive(investigation.modifier) : 10}
              </span>
            </div>
            <div className="rounded-md border border-gray-100 bg-slate-50 px-3 py-2 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Passive Insight</p>
                <p className="text-[0.7rem] text-gray-500">Sense motives and emotional tone.</p>
              </div>
              <span className="text-lg font-semibold tabular-nums text-gray-900">
                {insight ? computePassive(insight.modifier) : 10}
              </span>
            </div>
          </div>
          <div className="text-[0.7rem] text-gray-500">
            When unsure what to roll, pick the ability that matches what you describe, then add the listed modifier.
          </div>
        </div>
      </div>
    </section>
  );
};

