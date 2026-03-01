import React, { useState } from 'react';
import { Save, Activity, Eye } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';
import { deriveSaves, deriveSkills, formatModifier, resolveProficiencyBonus, computePassive } from '../model/derive';

interface AbilitySavesSkillsSectionProps {
  character: CharacterSheet;
}

export const AbilitySavesSkillsSection: React.FC<AbilitySavesSkillsSectionProps> = ({ character }) => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const proficiencyBonus = resolveProficiencyBonus(character);
  const saves = deriveSaves(character.abilities, character.savingThrowProficiencies, proficiencyBonus);
  const skills = deriveSkills(character.skills, character.abilities, proficiencyBonus);
  const proficientSkills = skills.filter((s) => s.proficient || s.expertise);
  const skillsToShow = showAllSkills ? skills.slice().sort((a, b) => a.name.localeCompare(b.name)) : proficientSkills.slice().sort((a, b) => a.name.localeCompare(b.name));

  const perception = skills.find((s) => s.id === 'perception');
  const investigation = skills.find((s) => s.id === 'investigation');
  const insight = skills.find((s) => s.id === 'insight');

  return (
    <section id="saves-skills" className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-col space-y-3">
      <p className="text-xs text-slate-500 leading-snug">For checks, roll d20 + modifier.</p>
      <h2 className="text-base font-semibold leading-tight text-slate-900 flex items-center gap-1.5">
        <Activity className="h-4 w-4 text-indigo-500" />
        Saves, skills & passives
      </h2>
      <div className="border-b border-slate-100 mt-2 mb-3" aria-hidden />

      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-slate-600 flex items-center gap-1 mb-2">
            <Save className="h-3.5 w-3.5" /> Saves
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {saves.map((save) => (
              <div
                key={save.ability}
                className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-2 flex flex-col justify-center min-w-0"
              >
                <span className="text-xs font-medium text-slate-700 truncate">
                  {save.ability}
                  {save.proficient && <span className="text-indigo-600">*</span>}
                </span>
                <span className="tabular-nums font-semibold text-slate-900 text-sm">
                  {formatModifier(save.modifier)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-xs font-semibold text-slate-600">Skills</h3>
            <button
              type="button"
              onClick={() => setShowAllSkills((v) => !v)}
              className="text-xs text-slate-500 hover:text-slate-700 underline"
            >
              {showAllSkills ? 'Show prof only' : 'Show all'}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {skillsToShow.map((skill) => (
              <div
                key={skill.id}
                className={`h-14 w-full rounded-lg border border-slate-200 px-2 flex flex-col justify-center min-w-0 ${
                  skill.expertise
                    ? 'bg-indigo-100 border-indigo-300'
                    : skill.proficient
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'bg-white'
                }`}
              >
                <span className="text-sm font-medium text-slate-700 truncate leading-tight" title={skill.name}>
                  {skill.name}
                </span>
                <span className="mt-0.5 flex justify-end">
                  <span className="tabular-nums font-semibold text-slate-900 text-sm">
                    {formatModifier(skill.modifier)}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-600 flex items-center gap-1 mb-2">
            <Eye className="h-3.5 w-3.5" /> Passives
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-2 flex flex-col justify-center">
              <span className="text-xs text-slate-500">PP</span>
              <span className="tabular-nums font-semibold text-slate-900 text-sm">
                {perception ? computePassive(perception.modifier) : 10}
              </span>
            </div>
            <div className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-2 flex flex-col justify-center">
              <span className="text-xs text-slate-500">PI</span>
              <span className="tabular-nums font-semibold text-slate-900 text-sm">
                {investigation ? computePassive(investigation.modifier) : 10}
              </span>
            </div>
            <div className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-2 flex flex-col justify-center">
              <span className="text-xs text-slate-500">Ins</span>
              <span className="tabular-nums font-semibold text-slate-900 text-sm">
                {insight ? computePassive(insight.modifier) : 10}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
