import React, { useState } from 'react';
import { Save, Activity, Eye } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';
import { deriveSaves, deriveSkills, formatModifier, resolveProficiencyBonus, computePassive } from '../model/derive';
import { bodyTextClass, sectionClass, sectionTitleClass, sectionDividerClass, subSectionHeaderClass } from '../textClasses';
import { StatTile } from './ui/StatTile';

interface AbilitySavesSkillsSectionProps {
  character: CharacterSheet;
}

export const AbilitySavesSkillsSection: React.FC<AbilitySavesSkillsSectionProps> = ({ character }) => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const proficiencyBonus = resolveProficiencyBonus(character);
  const saves = deriveSaves(character.abilities, character.savingThrowProficiencies, proficiencyBonus);
  const skills = deriveSkills(character.skills, character.abilities, proficiencyBonus);
  const proficientSkills = skills.filter((s) => s.proficient || s.expertise);
  const skillsToShow = showAllSkills
    ? skills.slice().sort((a, b) => a.name.localeCompare(b.name))
    : proficientSkills.slice().sort((a, b) => a.name.localeCompare(b.name));

  const perception = skills.find((s) => s.id === 'perception');
  const investigation = skills.find((s) => s.id === 'investigation');
  const insight = skills.find((s) => s.id === 'insight');

  const passives = [
    { icon: '👁️', label: 'Passive Perception', value: perception ? computePassive(perception.modifier) : 10 },
    { icon: '🔎', label: 'Passive Investigation', value: investigation ? computePassive(investigation.modifier) : 10 },
    { icon: '🧠', label: 'Passive Insight', value: insight ? computePassive(insight.modifier) : 10 },
  ];

  return (
    <section id="saves-skills" className={`${sectionClass} scroll-mt-4`}>
      <h2 className={sectionTitleClass}>
        <Activity className="h-4 w-4 text-indigo-500" />
        Saves, skills &amp; passives
      </h2>
      <div className={sectionDividerClass} aria-hidden />
      <p className={bodyTextClass}>For checks, roll d20 + modifier.</p>

      <div className="flex flex-col space-y-4">
        <div>
          <h3 className={`${subSectionHeaderClass} flex items-center gap-1 mb-1`}>
            <Save className="h-3.5 w-3.5" /> Saves
          </h3>
          <p className={`${bodyTextClass} mb-2`}>Saves: resist harmful effects like spells, traps, poison, and other threats.</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {saves.map((save) => (
              <StatTile
                key={save.ability}
                label={
                  <>
                    {save.ability}
                    {save.proficient && <span className="text-indigo-600">*</span>}
                  </>
                }
                value={formatModifier(save.modifier)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className={subSectionHeaderClass}>Skills</h3>
            <button
              type="button"
              onClick={() => setShowAllSkills((v) => !v)}
              className="text-xs text-slate-500 hover:text-slate-700 underline focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 rounded"
            >
              {showAllSkills ? 'Show prof only' : 'Show all'}
            </button>
          </div>
          <p className={`${bodyTextClass} mb-2`}>Skills: ability checks for what you do - sneak, notice, persuade, recall, etc.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {skillsToShow.map((skill) => (
              <StatTile
                key={skill.id}
                height="md"
                title={`${skill.name} (${skill.ability})`}
                className={`w-full ${
                  skill.expertise
                    ? 'bg-indigo-100 border-indigo-300'
                    : skill.proficient
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'bg-white'
                }`}
                label={`${skill.name} (${skill.ability})`}
                value={
                  <span className="flex justify-end">
                    {formatModifier(skill.modifier)}
                  </span>
                }
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className={`${subSectionHeaderClass} flex items-center gap-1 mb-1`}>
            <Eye className="h-3.5 w-3.5" /> Passives
          </h3>
          <p className={`${bodyTextClass} mb-2`}>Passives: always-on senses - usually 10 + your skill bonus.</p>
          <div className="grid grid-cols-3 gap-2">
            {passives.map(({ icon, label, value }) => (
              <StatTile
                key={label}
                title={label}
                label={
                  <span className="flex items-center gap-1 min-w-0">
                    <span aria-hidden className="shrink-0">{icon}</span>
                    <span className="truncate">{label}</span>
                  </span>
                }
                value={value}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
