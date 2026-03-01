import type { CharacterSheet, HopeTier } from '../../model/character.types';

const hopeTiers: HopeTier[] = [
  {
    tier: 1,
    activeCardId: 't1-quick-thinking',
    cards: [
      {
        id: 't1-quick-thinking',
        title: 'Quick Thinking',
        body: 'At combat start: scan the field.\nPick the most exposed ally and keep them in mind when choosing your actions.',
      },
      {
        id: 't1-steady-breath',
        title: 'Steady Breath',
        body: 'Before an important roll: pause for one breath.\nA bad roll is not the end of the story.',
      },
      {
        id: 't1-mark-the-threat',
        title: 'Mark the Threat',
        body: 'Pick the most dangerous enemy.\nTrack its position, HP estimate, and conditions so the group can react.',
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
        body: 'When an ally hesitates: give a quick reminder of what your characters have survived.\nNudge the table toward bold choices.',
      },
      {
        id: 't2-anchor-memory',
        title: 'Anchor Memory',
        body: 'Pick one hopeful memory.\nBring it into play with one short sentence when things look grim.',
      },
      {
        id: 't2-light-in-the-dark',
        title: 'Light in the Dark',
        body: 'Call out one small sign things might still turn - a slip, a loose stone, a crack of light.\nMake it concrete.',
      },
    ],
  },
];

export const aelfwynn: CharacterSheet = {
  id: 'aelfwynn',
  name: 'Aelfwynn',

  level: 7,
  classes: 'Barbarian 5 (Path of the World Tree) / Warrior 2',
  ancestry: "Goliath (Frost's Chill)",
  background: 'Soldier',
  alignment: 'Unspecified',

  maxHp: 83,
  armorClass: 14,
  initiativeMod: 1,
  speed: '13.5 m (16.5 m in Large Form)',

  abilities: {
    STR: 18,
    DEX: 13,
    CON: 16,
    INT: 10,
    WIS: 12,
    CHA: 8,
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
    { id: 'acrobatics', name: 'Acrobatics', ability: 'DEX', proficient: false },
    { id: 'animal-handling', name: 'Animal Handling', ability: 'WIS', proficient: false },
    { id: 'arcana', name: 'Arcana', ability: 'INT', proficient: false },
    { id: 'athletics', name: 'Athletics', ability: 'STR', proficient: true },
    { id: 'deception', name: 'Deception', ability: 'CHA', proficient: false },
    { id: 'history', name: 'History', ability: 'INT', proficient: false },
    { id: 'insight', name: 'Insight', ability: 'WIS', proficient: false },
    { id: 'intimidation', name: 'Intimidation', ability: 'CHA', proficient: true },
    { id: 'investigation', name: 'Investigation', ability: 'INT', proficient: false },
    { id: 'medicine', name: 'Medicine', ability: 'WIS', proficient: false },
    { id: 'nature', name: 'Nature', ability: 'INT', proficient: false },
    { id: 'perception', name: 'Perception', ability: 'WIS', proficient: true },
    { id: 'performance', name: 'Performance', ability: 'CHA', proficient: false },
    { id: 'persuasion', name: 'Persuasion', ability: 'CHA', proficient: false },
    { id: 'religion', name: 'Religion', ability: 'INT', proficient: false },
    { id: 'sleight-of-hand', name: 'Sleight of Hand', ability: 'DEX', proficient: false },
    { id: 'stealth', name: 'Stealth', ability: 'DEX', proficient: false },
    { id: 'survival', name: 'Survival', ability: 'WIS', proficient: true },
  ],

  attacks: [
    {
      id: 'greatsword-stygian-boreal-shard',
      name: 'Greatsword (Stygian Boreal Shard)',
      ability: 'STR',
      usesProficiency: true,
      damage: [
        {
          id: 'greatsword-normal',
          label: 'Normal',
          dice: '2d6+5',
          damageType: 'slashing',
          notes: '+1d6 cold. Weapon Mastery: Graze (on miss: +4 slashing).',
        },
        {
          id: 'greatsword-rage',
          label: 'While Raging',
          dice: '2d6+7',
          damageType: 'slashing',
          notes: '+1d6 cold.',
        },
      ],
      whenToUse:
        'Default melee. If you need advantage, use Reckless Attack (but enemies get advantage vs you until your next turn).',
    },
    {
      id: 'javelin-thrown',
      name: 'Javelin (Thrown)',
      ability: 'STR',
      usesProficiency: true,
      damage: [
        {
          id: 'javelin-normal',
          label: 'Normal',
          dice: '1d6+4',
          damageType: 'piercing',
          notes: 'Range: 9 m / 36 m.',
        },
      ],
      whenToUse: 'Use when you cannot reach safely this turn.',
    },
    {
      id: 'unarmed-strike',
      name: 'Unarmed Strike',
      ability: 'STR',
      usesProficiency: true,
      damage: [
        {
          id: 'unarmed-normal',
          label: 'Normal',
          dice: '1+4',
          damageType: 'bludgeoning',
        },
        {
          id: 'unarmed-rage',
          label: 'While Raging',
          dice: '1+6',
          damageType: 'bludgeoning',
        },
      ],
      whenToUse: 'Backup if disarmed.',
    },
  ],

  limitedUses: [
    {
      id: 'frosts-chill',
      name: "Frost's Chill",
      max: 3,
      reset: 'long-rest',
      notes: 'On a hit: +1d6 cold and target speed -3 m (10 ft) until your next turn.',
    },
    {
      id: 'second-wind',
      name: 'Second Wind',
      max: 2,
      reset: 'long-rest',
      notes: 'Heal 1d10+2 HP. Tactical Mind: when you fail an ability check, add 1d10 (not spent if you still fail).',
    },
    {
      id: 'action-surge',
      name: 'Action Surge',
      max: 1,
      reset: 'short-rest',
      notes: 'On your turn: take 1 extra Action.',
    },
    {
      id: 'rage',
      name: 'Rage',
      max: 3,
      reset: 'long-rest',
      notes: 'Bonus action, 1 min. Advantage on STR, +2 melee STR damage, resistance to B/P/S, gain 5 temp HP at the start.',
    },
  ],

  hopeAbilities: hopeTiers,

  turnGuide: {
    title: 'On Your Turn',
    steps: [
      'If raging: remember Life-Giving Force at start of turn (temp HP to an ally within 3 m).',
      'Move (13.5 m).',
      'Bonus action: Rage / Second Wind / Large Form (if needed).',
      'Action: Attack (usually Greatsword). You attack twice with Extra Attack.',
      'Reaction check: Opportunity Attack or Branches of the Tree (while raging).',
    ],
  },

  notes:
    'Data reminders (from the original sheet): Greatsword is a +1 magical weapon (to hit and damage) and has Weapon Mastery: Graze. Passives/reactions to add as reference cards: Reckless Attack, Extra Attack, Opportunity Attack, Branches of the Tree, Danger Sense, Life-Giving Force, Unarmored Defense, Great Weapon Fighting, Powerful Build, Savage Attacker, Fire immunity.',
};