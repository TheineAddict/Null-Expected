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

  // From the sheet: Goliath (Frost’s Chill) + Path of the World Tree + Soldier features.
  // Your sheet text has some class/level inconsistencies (it includes Action Surge + Fighter-style features),
  // so this reflects what’s actually listed in the abilities section.
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
    { id: 'perception', name: 'Perception', ability: 'WIS', proficient: true }, // passive Perception 14 on sheet
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
          dice: '2d6+5 + 1d6',
          damageType: 'slashing + cold',
          notes:
            'Roll: 2d6+5 slashing, plus 1d6 cold. To hit: +8 (includes +1 magical weapon). Weapon Mastery: Graze (miss = +4 slashing).',
        },
        {
          id: 'greatsword-rage',
          label: 'While Raging',
          dice: '2d6+7 + 1d6',
          damageType: 'slashing + cold',
          notes: 'Use while raging (adds +2 to the slashing part on your sheet).',
        },
      ],
      whenToUse:
        'Default melee. If you need more accuracy, use Reckless Attack (advantage on STR melee attacks, but enemies get advantage vs you until your next turn). On a hit, you can use Soldier: Savage Attacker (1/turn) to roll weapon damage dice twice and choose.',
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
          notes: 'To hit: +7. Range: 9 m / 36 m (uses STR).',
        },
      ],
      whenToUse:
        'Use when you cannot reach safely this turn. Works with STR (same stat as your melee).',
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
          notes: 'To hit: +7.',
        },
        {
          id: 'unarmed-rage',
          label: 'While Raging',
          dice: '1+6',
          damageType: 'bludgeoning',
          notes: 'Use while raging.',
        },
      ],
      whenToUse:
        'Backup option if you are disarmed or cannot use your weapon.',
    },
  ],

  limitedUses: [
    {
      id: 'frosts-chill',
      name: "Frost's Chill",
      max: 3,
      reset: 'long-rest',
      notes:
        'Trigger: when you hit a creature and deal damage. Effect: +1d6 cold damage and reduce target speed by 3 m (10 ft) until the start of your next turn.',
    },
    {
      id: 'second-wind',
      name: 'Second Wind',
      max: 2,
      reset: 'long-rest',
      notes:
        'Heal 1d10+2 HP. Tactical Mind: when you fail an ability check, you can use Second Wind to roll 1d10 and add it; not spent if the check still fails.',
    },
    {
      id: 'action-surge',
      name: 'Action Surge',
      max: 1,
      reset: 'short-rest',
      notes: 'Take 1 extra Action on your turn (1/rest on your sheet).',
    },
    {
      id: 'rage',
      name: 'Rage',
      max: 3,
      reset: 'long-rest',
      notes:
        'Bonus action. Duration 1 minute. STR advantage, +2 melee (STR) damage, resistance to bludgeoning/piercing/slashing, gain 5 temp HP at the start.',
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

