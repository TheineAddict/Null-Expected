import type {
  AbilityScoreName,
  AbilityScores,
  CharacterSheet,
  SavingThrowProficiencies,
  SkillDefinition,
  Attack,
} from './character.types';

export function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function getProficiencyBonus(level: number): number {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
}

export interface DerivedSave {
  ability: AbilityScoreName;
  modifier: number;
  proficient: boolean;
}

export interface DerivedSkill {
  id: string;
  name: string;
  ability: AbilityScoreName;
  modifier: number;
  proficient: boolean;
  expertise: boolean;
}

export function deriveAbilityModifiers(abilities: AbilityScores): Record<AbilityScoreName, number> {
  return {
    STR: getAbilityModifier(abilities.STR),
    DEX: getAbilityModifier(abilities.DEX),
    CON: getAbilityModifier(abilities.CON),
    INT: getAbilityModifier(abilities.INT),
    WIS: getAbilityModifier(abilities.WIS),
    CHA: getAbilityModifier(abilities.CHA),
  };
}

export function deriveSaves(
  abilities: AbilityScores,
  profs: SavingThrowProficiencies,
  proficiencyBonus: number,
): DerivedSave[] {
  const mods = deriveAbilityModifiers(abilities);

  const entries: [AbilityScoreName, boolean][] = [
    ['STR', profs.STR],
    ['DEX', profs.DEX],
    ['CON', profs.CON],
    ['INT', profs.INT],
    ['WIS', profs.WIS],
    ['CHA', profs.CHA],
  ];

  return entries.map(([ability, proficient]) => ({
    ability,
    proficient,
    modifier: mods[ability] + (proficient ? proficiencyBonus : 0),
  }));
}

export function deriveSkills(
  skills: SkillDefinition[],
  abilities: AbilityScores,
  proficiencyBonus: number,
): DerivedSkill[] {
  const mods = deriveAbilityModifiers(abilities);

  return skills.map((skill) => {
    const base = mods[skill.ability];
    const profMult = skill.expertise ? 2 : skill.proficient ? 1 : 0;
    const modifier = base + proficiencyBonus * profMult;

    return {
      id: skill.id,
      name: skill.name,
      ability: skill.ability,
      modifier,
      proficient: skill.proficient,
      expertise: Boolean(skill.expertise),
    };
  });
}

export function computeAttackBonus(
  attack: Attack,
  abilities: AbilityScores,
  proficiencyBonus: number,
): number {
  const abilityMod = getAbilityModifier(abilities[attack.ability]);
  const prof = attack.usesProficiency ? proficiencyBonus : 0;
  const extra = attack.additionalAttackBonus ?? 0;
  return abilityMod + prof + extra;
}

export function computePassive(modifier: number): number {
  return 10 + modifier;
}

export function resolveProficiencyBonus(character: CharacterSheet): number {
  return character.proficiencyBonus ?? getProficiencyBonus(character.level);
}

