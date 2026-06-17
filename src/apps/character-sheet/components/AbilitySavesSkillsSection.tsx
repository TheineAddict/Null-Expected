import React, { useState } from 'react';
import { Save, Activity, Eye } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';
import { deriveSaves, deriveSkills, formatModifier, resolveProficiencyBonus, computePassive } from '../model/derive';
import { bodyTextClass, sectionClass, sectionTitleClass, sectionDividerClass } from '../textClasses';

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
    <section id="saves-skills" className={sectionClass}>
      <h2 className={sectionTitleClass}>
        <Activity className="h-4 w-4 text-indigo-500" />
        Saves, skills & passives
      </h2>
      <div className={sectionDividerClass} aria-hidden />
      <p className={bodyTextClass}>For checks, roll d20 + modifier.</p>

      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-slate-600 flex items-center gap-1 mb-1">
            <Save className="h-3.5 w-3.5" /> Saves
          </h3>
          <p className={`${bodyTextClass} mb-2`}>Saves: resist harmful effects like spells, traps, poison, and other threats.</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {saves.map((save) => (
              <div
                key={save.ability}
                className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-2.5 flex flex-col justify-center min-w-0"
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
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-xs font-semibold text-slate-600">Skills</h3>
            <button
              type="button"
              onClick={() => setShowAllSkills((v) => !v)}
              className="text-xs text-slate-500 hover:text-slate-700 underline"
            >
              {showAllSkills ? 'Show prof only' : 'Show all'}
            </button>
          </div>
          <p className={`${bodyTextClass} mb-2`}>Skills: ability checks for what you do - sneak, notice, persuade, recall, etc.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {skillsToShow.map((skill) => (
              <div
                key={skill.id}
                className={`h-14 w-full rounded-lg border border-slate-200 px-2.5 flex flex-col justify-center min-w-0 ${
                  skill.expertise
                    ? 'bg-indigo-100 border-indigo-300'
                    : skill.proficient
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'bg-white'
                }`}
              >
                <span
                  className="text-sm font-medium text-slate-700 truncate leading-tight"
                  title={`${skill.name} (${skill.ability})`}
                >
                  {skill.name} ({skill.ability})
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
          <h3 className="text-xs font-semibold text-slate-600 flex items-center gap-1 mb-1">
            <Eye className="h-3.5 w-3.5" /> Passives
          </h3>
          <p className={`${bodyTextClass} mb-2`}>Passives: always-on senses - usually 10 + your skill bonus.</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-2.5 flex flex-col justify-center min-w-0">
              <span className="text-xs text-slate-500 truncate flex items-center gap-1 min-w-0" title="Passive Perception">
                <span aria-hidden className="shrink-0">👁️</span>
                <span className="truncate">Passive Perception</span>
              </span>
              <span className="tabular-nums font-semibold text-slate-900 text-sm">
                {perception ? computePassive(perception.modifier) : 10}
              </span>
            </div>
            <div className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-2.5 flex flex-col justify-center min-w-0">
              <span className="text-xs text-slate-500 truncate flex items-center gap-1 min-w-0" title="Passive Investigation">
                <span aria-hidden className="shrink-0">🔎</span>
                <span className="truncate">Passive Investigation</span>
              </span>
              <span className="tabular-nums font-semibold text-slate-900 text-sm">
                {investigation ? computePassive(investigation.modifier) : 10}
              </span>
            </div>
            <div className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-2.5 flex flex-col justify-center min-w-0">
              <span className="text-xs text-slate-500 truncate flex items-center gap-1 min-w-0" title="Passive Insight">
                <span aria-hidden className="shrink-0">🧠</span>
                <span className="truncate">Passive Insight</span>
              </span>
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
