export type AbilityScoreName = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export interface AbilityScores {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
}

export interface SavingThrowProficiencies {
  STR: boolean;
  DEX: boolean;
  CON: boolean;
  INT: boolean;
  WIS: boolean;
  CHA: boolean;
}

export interface SkillDefinition {
  id: string;
  name: string;
  ability: AbilityScoreName;
  proficient: boolean;
  expertise?: boolean;
}

export interface HopeCard {
  id: string;
  title: string;
  body: string;
}

export interface HopeTier {
  tier: number;
  cards: [HopeCard, HopeCard, HopeCard];
  activeCardId: string;
}

export interface DamageLine {
  id: string;
  label?: string;
  dice: string;
  damageType?: string;
  notes?: string;
}

export interface Attack {
  id: string;
  name: string;
  ability: AbilityScoreName;
  usesProficiency: boolean;
  additionalAttackBonus?: number;
  damage: DamageLine[];
  whenToUse?: string;
}

export type LimitedUseReset = 'short-rest' | 'long-rest' | 'per-encounter' | 'custom';

export interface LimitedUseResource {
  id: string;
  name: string;
  max: number;
  reset: LimitedUseReset;
  notes?: string;
}

export interface TurnGuide {
  title: string;
  steps: string[];
}

export interface CharacterSheet {
  id: string;
  name: string;
  level: number;
  classes: string;
  ancestry?: string;
  background?: string;
  alignment?: string;

  maxHp: number;
  armorClass: number;
  initiativeMod: number;
  speed: string;
  proficiencyBonus?: number;

  abilities: AbilityScores;
  savingThrowProficiencies: SavingThrowProficiencies;
  skills: SkillDefinition[];

  attacks: Attack[];
  limitedUses: LimitedUseResource[];

  hopeAbilities?: HopeTier[];

  turnGuide?: TurnGuide;
  notes?: string;
}

