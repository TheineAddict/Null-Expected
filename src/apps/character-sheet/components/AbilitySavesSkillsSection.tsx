import React from 'react';
import { Save, Activity, Eye } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';
import { deriveSaves, deriveSkills, formatModifier, resolveProficiencyBonus, computePassive } from '../model/derive';

interface AbilitySavesSkillsSectionProps {
  character: CharacterSheet;
}

export const AbilitySavesSkillsSection: React.FC<AbilitySavesSkillsSectionProps> = ({ character }) => {
  const proficiencyBonus = resolveProficiencyBonus(character);
  const saves = deriveSaves(character.abilities, character.savingThrowProficiencies, proficiencyBonus);
  const skills = deriveSkills(character.skills, character.abilities, proficiencyBonus);

  const perception = skills.find((s) => s.id === 'perception');
  const investigation = skills.find((s) => s.id === 'investigation');
  const insight = skills.find((s) => s.id === 'insight');

  return (
    <section className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
      <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
        <Activity className="h-3.5 w-3.5 text-indigo-500" />
        Saves, skills & passives
      </h2>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-[0.7rem] font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1">
            <Save className="h-3 w-3" /> Saves
          </h3>
          <ul className="space-y-0.5 text-[0.7rem] text-slate-800">
            {saves.map((save) => (
              <li
                key={save.ability}
                className="flex items-center justify-between rounded-md px-2 py-0.5 bg-slate-50 border border-slate-100"
              >
                <span className="font-medium text-slate-700">
                  {save.ability}
                  {save.proficient && <span className="ml-0.5 text-indigo-600">*</span>}
                </span>
                <span className="tabular-nums font-semibold text-slate-900">{formatModifier(save.modifier)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-[0.7rem] font-semibold text-slate-600 uppercase tracking-wide">Skills</h3>
          <ul className="space-y-0.5 text-[0.7rem] text-slate-800">
            {skills
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((skill) => (
                <li
                  key={skill.id}
                  className={`flex items-center justify-between rounded-md px-2 py-0.5 border ${
                    skill.expertise
                      ? 'bg-indigo-50 border-indigo-200'
                      : skill.proficient
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-white border-slate-100'
                  }`}
                >
                  <span className="font-medium text-slate-700">
                    {skill.name}
                    <span className="ml-0.5 text-slate-500">({skill.ability})</span>
                  </span>
                  <span className="tabular-nums font-semibold text-slate-900">
                    {formatModifier(skill.modifier)}
                  </span>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-[0.7rem] font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1">
            <Eye className="h-3 w-3" /> Passives
          </h3>
          <div className="flex flex-wrap gap-2">
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 flex items-center justify-between gap-2 min-w-[5rem]">
              <span className="text-[0.65rem] text-slate-600">PP</span>
              <span className="text-sm font-semibold tabular-nums text-slate-900">
                {perception ? computePassive(perception.modifier) : 10}
              </span>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 flex items-center justify-between gap-2 min-w-[5rem]">
              <span className="text-[0.65rem] text-slate-600">PI</span>
              <span className="text-sm font-semibold tabular-nums text-slate-900">
                {investigation ? computePassive(investigation.modifier) : 10}
              </span>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 flex items-center justify-between gap-2 min-w-[5rem]">
              <span className="text-[0.65rem] text-slate-600">Ins</span>
              <span className="text-sm font-semibold tabular-nums text-slate-900">
                {insight ? computePassive(insight.modifier) : 10}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

