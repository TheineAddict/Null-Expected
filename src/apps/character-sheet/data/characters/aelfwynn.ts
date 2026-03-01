import type { CharacterSheet, HopeTier } from '../../model/character.types';

const hopeTiers: HopeTier[] = [
  {
    tier: 1,
    activeCardId: 't1-quick-thinking',
    cards: [
      {
        id: 't1-quick-thinking',
        title: 'Quick Thinking',
        body: 'At combat start: scan the field.\nPick the most exposed ally and keep them in mind.',
      },
      {
        id: 't1-steady-breath',
        title: 'Steady Breath',
        body: 'Before an important roll: take one breath.\nReset your focus, then roll.',
      },
      {
        id: 't1-mark-the-threat',
        title: 'Mark the Threat',
        body: 'Pick the most dangerous enemy.\nTrack its position and conditions.',
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
        body: 'When an ally hesitates: give a quick reminder of what you survived.\nNudge toward bold choices.',
      },
      {
        id: 't2-anchor-memory',
        title: 'Anchor Memory',
        body: 'Name one hopeful memory.\nUse one sentence when things look grim.',
      },
      {
        id: 't2-light-in-the-dark',
        title: 'Light in the Dark',
        body: 'Call out one small sign things might turn - a slip, a crack of light.\nMake it concrete.',
      },
    ],
  },
];

export const aelfwynn: CharacterSheet = {
  id: 'aelfwynn',
  name: 'Aelfwynn WinterShade',

  level: 8,
  classes: 'Barbarian 6 (Path of the World Tree) / Fighter 2',
  ancestry: "Goliath (Giant Ancestry: Frost's Chill)",
  background: 'Soldier',
  alignment: 'Chaotic Neutral',

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
    { id: 'animal-handling', name: 'Animal Handling', ability: 'WIS', proficient: true },
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
      id: 'stygian-boreal-shard',
      name: 'Stygian Boreal Shard (Greatsword)',
      ability: 'STR',
      usesProficiency: true,
      damage: [
        {
          id: 'sword-normal',
          label: 'Normal',
          dice: '2d6+5',
          damageType: 'slashing',
          notes: 'This includes the +1 magic bonus to damage.',
        },
        {
          id: 'sword-rage',
          label: 'While Raging',
          dice: '2d6+7',
          damageType: 'slashing',
          notes: 'Add Rage damage (+2) to the slashing part.',
        },
        {
          id: 'sword-frost',
          label: "Frost's Chill (spend 1 use)",
          dice: '1d6',
          damageType: 'cold',
          notes: 'On a hit: add +1d6 cold and reduce target speed by 3 m (10 ft) until your next turn.',
        },
      ],
      whenToUse:
        'Default melee. You attack twice with Extra Attack. If you need advantage, use Reckless Attack (enemies get advantage vs you until your next turn).',
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
          notes: 'Range 9 m / 36 m. Weapon Mastery: Slow (on hit, target speed -3 m until your next turn).',
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
        { id: 'unarmed-normal', label: 'Normal', dice: '5', damageType: 'bludgeoning' },
        { id: 'unarmed-rage', label: 'While Raging', dice: '7', damageType: 'bludgeoning' },
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
      notes:
        'When you hit with an attack and deal damage: you can add 1d6 cold and reduce target speed by 3 m (10 ft) until your next turn.',
    },
    {
      id: 'large-form',
      name: 'Large Form',
      max: 1,
      reset: 'long-rest',
      notes:
        'Bonus action. Become Large for 10 minutes. Advantage on STR checks. Speed +3 m (10 ft).',
    },
    {
      id: 'rage',
      name: 'Rage (Enter)',
      max: 4,
      reset: 'long-rest',
      notes:
        'Bonus action, 1 minute (no heavy armor). Regain 1 use on a short rest. When you activate Rage: gain 6 temp HP. While raging: at start of each of your turns, you can give a creature within 3 m (10 ft) +2d6 temp HP (vanish when Rage ends).',
    },
    {
      id: 'second-wind',
      name: 'Second Wind',
      max: 2,
      reset: 'long-rest',
      notes:
        'Bonus action: heal 1d10+2 HP. Regain 1 use on a short rest. Tactical Mind: on a failed ability check, spend Second Wind to roll 1d10 and add it (not spent if you still fail).',
    },
    {
      id: 'action-surge',
      name: 'Action Surge',
      max: 1,
      reset: 'short-rest',
      notes: 'On your turn: take 1 additional action (not the Magic action).',
    },
  ],

  hopeAbilities: hopeTiers,

  turnGuide: {
    title: 'On Your Turn',
    steps: [
      'If raging: start of turn, give an ally within 3 m +2d6 temp HP (World Tree).',
      'Move (13.5 m).',
      'Bonus action: Rage / Large Form / Second Wind (if needed).',
      'Action: Attack twice (Extra Attack). Usually Greatsword; Javelin if you cannot reach.',
      'Reaction check: Opportunity Attack, or Branches of the Tree (while raging).',
    ],
  },

  notes:
    'To-hit reminders from the sheet: Greatsword attack bonus is +8 (includes +1 magic weapon). Unarmed strike is +7. Passive: Danger Sense gives advantage on DEX saves unless incapacitated. Reaction: Branches of the Tree (DC 15 STR save, 9 m range, teleport within 1.5 m, then you can set speed to 0 until end of its turn). Great Weapon Fighting: treat 1 or 2 on weapon damage dice as 3. Greatsword Weapon Mastery: Graze (on miss, deal 4 slashing).',
};
