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
    <section id="saves-skills" className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-3">
      <p className="text-[0.65rem] text-slate-500">For checks, roll d20 + modifier.</p>
      <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
        <Activity className="h-3.5 w-3.5 text-indigo-500" />
        Saves, skills & passives
      </h2>

      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-[0.65rem] font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1 mb-1">
            <Save className="h-3 w-3" /> Saves
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {saves.map((save) => (
              <div
                key={save.ability}
                className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1 flex items-center gap-1.5 min-w-0"
              >
                <span className="text-[0.7rem] font-medium text-slate-700">
                  {save.ability}
                  {save.proficient && <span className="text-indigo-600">*</span>}
                </span>
                <span className="text-[0.7rem] font-semibold tabular-nums text-slate-900">
                  {formatModifier(save.modifier)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-[0.65rem] font-semibold text-slate-600 uppercase tracking-wide">Skills</h3>
            <button
              type="button"
              onClick={() => setShowAllSkills((v) => !v)}
              className="text-[0.65rem] text-slate-500 hover:text-slate-700 underline"
            >
              {showAllSkills ? 'Show prof only' : 'Show all'}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillsToShow.map((skill) => (
              <div
                key={skill.id}
                className={`rounded-md border px-2 py-1 flex items-center gap-1.5 min-w-0 ${
                  skill.expertise
                    ? 'bg-indigo-50 border-indigo-200'
                    : skill.proficient
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-white border-slate-100'
                }`}
              >
                <span className="text-[0.7rem] font-medium text-slate-700 truncate max-w-[4.5rem]">{skill.name}</span>
                <span className="text-[0.7rem] font-semibold tabular-nums text-slate-900 shrink-0">
                  {formatModifier(skill.modifier)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[0.65rem] font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1 mb-1">
            <Eye className="h-3 w-3" /> Passives
          </h3>
          <div className="flex flex-wrap gap-1.5">
            <div className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1 flex items-center gap-1.5">
              <span className="text-[0.65rem] text-slate-600">PP</span>
              <span className="text-[0.7rem] font-semibold tabular-nums text-slate-900">
                {perception ? computePassive(perception.modifier) : 10}
              </span>
            </div>
            <div className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1 flex items-center gap-1.5">
              <span className="text-[0.65rem] text-slate-600">PI</span>
              <span className="text-[0.7rem] font-semibold tabular-nums text-slate-900">
                {investigation ? computePassive(investigation.modifier) : 10}
              </span>
            </div>
            <div className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1 flex items-center gap-1.5">
              <span className="text-[0.65rem] text-slate-600">Ins</span>
              <span className="text-[0.7rem] font-semibold tabular-nums text-slate-900">
                {insight ? computePassive(insight.modifier) : 10}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
