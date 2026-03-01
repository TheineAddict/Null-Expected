import type { CharacterSheet, HopeTier } from '../../model/character.types';

// Hope tiers: exactly 3 cards per tier; activeCardId must match one card's id.
const hopeTiers: HopeTier[] = [
  {
    tier: 1,
    activeCardId: 't1-card-a',
    cards: [
      { id: 't1-card-a', title: 'Tier 1 Option A', body: 'Short description.\nUse \\n in the string for line breaks.' },
      { id: 't1-card-b', title: 'Tier 1 Option B', body: 'Body text.' },
      { id: 't1-card-c', title: 'Tier 1 Option C', body: 'Body text.' },
    ],
  },
  {
    tier: 2,
    activeCardId: 't2-card-a',
    cards: [
      { id: 't2-card-a', title: 'Tier 2 Option A', body: 'Body text.' },
      { id: 't2-card-b', title: 'Tier 2 Option B', body: 'Body text.' },
      { id: 't2-card-c', title: 'Tier 2 Option C', body: 'Body text.' },
    ],
  },
];

/** Template: copy to <characterId>.ts, set id to match filename, then fill placeholders. */
export const template_character_sheet: CharacterSheet = {
  id: 'template_character_sheet',
  name: 'Character Name',
  level: 1,
  classes: 'Class 1',
  portraitUrl: undefined, // e.g. '/apps/character-sheet/your-portrait.jpg'
  ancestry: undefined,
  background: undefined,
  alignment: undefined,

  maxHp: 10,
  armorClass: 10,
  initiativeMod: 0,
  speed: '30 ft',

  abilities: {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
  },

  savingThrowProficiencies: {
    STR: false,
    DEX: false,
    CON: false,
    INT: false,
    WIS: false,
    CHA: false,
  },

  skills: [
    { id: 'acrobatics', name: 'Acrobatics', ability: 'DEX', proficient: false },
    { id: 'animal-handling', name: 'Animal Handling', ability: 'WIS', proficient: false },
    { id: 'arcana', name: 'Arcana', ability: 'INT', proficient: false },
    { id: 'athletics', name: 'Athletics', ability: 'STR', proficient: false },
    { id: 'deception', name: 'Deception', ability: 'CHA', proficient: false },
    { id: 'history', name: 'History', ability: 'INT', proficient: false },
    { id: 'insight', name: 'Insight', ability: 'WIS', proficient: false },
    { id: 'intimidation', name: 'Intimidation', ability: 'CHA', proficient: false },
    { id: 'investigation', name: 'Investigation', ability: 'INT', proficient: false },
    { id: 'medicine', name: 'Medicine', ability: 'WIS', proficient: false },
    { id: 'nature', name: 'Nature', ability: 'INT', proficient: false },
    { id: 'perception', name: 'Perception', ability: 'WIS', proficient: false },
    { id: 'performance', name: 'Performance', ability: 'CHA', proficient: false },
    { id: 'persuasion', name: 'Persuasion', ability: 'CHA', proficient: false },
    { id: 'religion', name: 'Religion', ability: 'INT', proficient: false },
    { id: 'sleight-of-hand', name: 'Sleight of Hand', ability: 'DEX', proficient: false },
    { id: 'stealth', name: 'Stealth', ability: 'DEX', proficient: false },
    { id: 'survival', name: 'Survival', ability: 'WIS', proficient: false },
  ],

  attacks: [
    {
      id: 'main-weapon',
      name: 'Main Weapon',
      ability: 'STR',
      usesProficiency: true,
      damage: [
        { id: 'dmg-1', label: 'Normal', dice: '1d8+3', damageType: 'slashing' },
        { id: 'dmg-2', label: 'Other', dice: '1d6', damageType: 'fire', notes: 'Optional line.' },
      ],
      whenToUse: 'When to use this attack.',
    },
  ],

  limitedUses: [
    { id: 'feature-1', name: 'Feature Name', max: 2, reset: 'short-rest', notes: 'What it does.' },
    { id: 'feature-2', name: 'Other Feature', max: 1, reset: 'long-rest' },
  ],

  hopeAbilities: hopeTiers,

  traits: [
    {
      id: 'trait-1',
      name: 'Trait Name',
      type: 'Passive',
      summary: 'One-line summary.',
      details: 'Optional longer description.',
      reminders: ['Optional reminder.'],
    },
  ],

  reactions: [
    {
      id: 'reaction-1',
      name: 'Reaction Name',
      trigger: 'When X happens.',
      roll: 'd20 + mod',
      effect: 'What happens.',
      notes: 'Optional.',
    },
  ],

  defenses: {
    resistances: [{ damageType: 'fire' }, { damageType: 'cold', condition: 'when Y' }],
    immunities: [{ damageType: 'poison' }],
  },

  languages: ['Common'],

  turnGuide: {
    title: 'On Your Turn',
    steps: ['Step 1.', 'Step 2.', 'Step 3.'],
  },

  notes: 'Optional free-form notes.',
};
