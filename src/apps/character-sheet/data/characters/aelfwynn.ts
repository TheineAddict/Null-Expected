import type { CharacterSheet, HopeTier } from '../../model/character.types';

const hopeTiers: HopeTier[] = [
  {
    tier: 1,
    activeCardId: 't1-quick-thinking',
    cards: [
      {
        id: 't1-quick-thinking',
        title: 'Quick Thinking',
        body: 'When combat starts, quickly scan the field.\nPick one ally who looks the most exposed and keep them in mind when choosing your actions.',
      },
      {
        id: 't1-steady-breath',
        title: 'Steady Breath',
        body: 'Before you roll an important check, pause for a breath.\nRemind yourself that a bad roll is not the end of the story.',
      },
      {
        id: 't1-mark-the-threat',
        title: 'Mark the Threat',
        body: 'Choose the creature that feels most dangerous.\nKeep track of its position, hit points, and conditions so your group can react quickly.',
      },
    ],
  },
  {
    tier: 2,
    activeCardId: 't2-shared-glance',
    cards: [
      {
        id: 't2-shared-glance',
        title: 'Shared Glance',
        body: 'When an ally hesitates, offer a quick reminder of what your characters have survived together.\nUse this to nudge the table toward bold, hopeful choices.',
      },
      {
        id: 't2-anchor-memory',
        title: 'Anchor Memory',
        body: 'Pick one hopeful memory your character holds onto.\nBring it into play with a short sentence when things look grim.',
      },
      {
        id: 't2-light-in-the-dark',
        title: 'Light in the Dark',
        body: 'Notice one small, concrete sign that things might still turn in your favour—an enemy slipping, a loose stone, a crack of light.\nCall it out at the table.',
      },
    ],
  },
];

export const aelfwynn: CharacterSheet = {
  id: 'aelfwynn',
  name: 'Aelfwynn',
  level: 5,
  classes: 'Barbarian 5',
  ancestry: 'Half-Orc',
  background: 'Soldier',
  alignment: 'Chaotic Good',

  maxHp: 58,
  armorClass: 16,
  initiativeMod: 2,
  speed: '40 ft',

  abilities: {
    STR: 18,
    DEX: 14,
    CON: 16,
    INT: 10,
    WIS: 12,
    CHA: 10,
  },

  savingThrowProficiencies: {
    STR: true,
    DEX: false,
    CON: true,
    INT: false,
    WIS: false,
    CHA: false,
  },

  skills: [
    { id: 'athletics', name: 'Athletics', ability: 'STR', proficient: true },
    { id: 'perception', name: 'Perception', ability: 'WIS', proficient: true },
    { id: 'intimidation', name: 'Intimidation', ability: 'CHA', proficient: true },
    { id: 'survival', name: 'Survival', ability: 'WIS', proficient: false },
  ],

  attacks: [
    {
      id: 'greataxe',
      name: 'Greataxe',
      ability: 'STR',
      usesProficiency: true,
      damage: [
        {
          id: 'greataxe-normal',
          label: 'Normal',
          dice: '1d12 + STR',
          damageType: 'slashing',
          notes: 'Standard attack.',
        },
        {
          id: 'greataxe-rage',
          label: 'With Rage',
          dice: '1d12 + STR + 2',
          damageType: 'slashing',
          notes: 'Use when raging.',
        },
      ],
      whenToUse: 'Primary melee attack. Works best when you can stay in the front line.',
    },
    {
      id: 'handaxe',
      name: 'Handaxe (thrown)',
      ability: 'STR',
      usesProficiency: true,
      damage: [
        {
          id: 'handaxe-normal',
          label: 'Normal',
          dice: '1d6 + STR',
          damageType: 'slashing',
        },
      ],
      whenToUse: 'Use when an enemy is just out of melee range or you cannot safely close the distance.',
    },
  ],

  limitedUses: [
    {
      id: 'rage',
      name: 'Rage',
      max: 3,
      reset: 'long-rest',
      notes: 'Bonus action to enter a rage. Lasts 1 minute while you keep fighting.',
    },
    {
      id: 'reckless-attack',
      name: 'Reckless Attack (this turn)',
      max: 1,
      reset: 'per-encounter',
      notes: 'Track whether you have already chosen to attack recklessly this turn.',
    },
  ],

  hopeAbilities: hopeTiers,

  turnGuide: {
    title: 'On Your Turn',
    steps: [
      'Check your HP, Rage, and any conditions.',
      'Decide where you should stand to protect allies or pressure enemies.',
      'Choose an attack (Greataxe in melee, Handaxe at range).',
      'Remember Reckless Attack and Rage when they will matter most.',
    ],
  },

  notes: 'Adjust these numbers and descriptions in this file to match the latest version of Aelfwynn.',
};

