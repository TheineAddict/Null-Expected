# Character Sheet App

A minimalist DnD 5e character sheet, mounted at `/character-sheet-app`.  
All character data lives in TypeScript files and is **read-only in the UI**; only trackers (HP, Hope, Inspiration, uses, death saves) are stored in `localStorage`.

---

## Folder layout

```text
src/apps/character-sheet/
├── CharacterSheetApp.tsx           # Main app composition
├── model/
│   ├── character.types.ts          # Strict data model for characters
│   └── derive.ts                   # Helpers: mods, saves, skills, passives, attacks
├── storage/
│   └── characterStorage.ts         # LocalStorage-backed tracker state (per character id)
├── data/
│   ├── index.ts                    # Character registry + DEFAULT_CHARACTER_ID
│   └── characters/
│       └── aelfwynn.ts             # Example character
└── components/
    ├── TopBar.tsx
    ├── HpPanel.tsx
    ├── CombatSection.tsx
    ├── ResourcesSection.tsx
    ├── HopeAbilitiesSection.tsx
    ├── ActionsSection.tsx
    ├── AbilitySavesSkillsSection.tsx
    └── NotesSection.tsx
```

The route and wrapper live outside this folder:

- `src/App.tsx` – adds `/character-sheet-app` route and hides Header/Footer on this path.
- `src/pages/CharacterSheetApp.tsx` – Helmet + `<CharacterSheetApp />`.

---

## How to add a new character

1. **Create a new character file**

Copy the Aelfwynn example:

```text
src/apps/character-sheet/data/characters/aelfwynn.ts
```

Paste it as a new file, for example:

```text
src/apps/character-sheet/data/characters/my-new-character.ts
```

2. **Update the basics in your new file**

At minimum, edit:

- `id` – short, unique string (no spaces), e.g. `"my-new-character"`.
- `name` – character name as you want to see it in the UI.
- `level` and `classes` – e.g. `level: 5`, `classes: "Barbarian 5"`.
- `maxHp`, `armorClass`, `initiativeMod`, `speed`.
- `abilities` – STR/DEX/CON/INT/WIS/CHA scores.
- `savingThrowProficiencies` – which saves you are proficient in.
- `skills` – which skills and which ability they use, and whether you are proficient / have expertise.
- `attacks` – weapon/spell attacks, with damage lines and short “when to use” notes.
- `limitedUses` – per-rest features you want to track (Rage uses, etc.).
- `hopeAbilities` – if you use the Hope system (see below).
- `turnGuide` (optional) – “On your turn” checklist.
- `notes` (optional) – free-form notes block.

3. **Register the character**

Edit the registry:

```text
src/apps/character-sheet/data/index.ts
```

Example:

```ts
import { aelfwynn } from './characters/aelfwynn';
import { myNewCharacter } from './characters/my-new-character';

export const CHARACTERS: Record<string, CharacterSheet> = {
  [aelfwynn.id]: aelfwynn,
  [myNewCharacter.id]: myNewCharacter,
};

export const DEFAULT_CHARACTER_ID = myNewCharacter.id;
```

- `CHARACTERS` is a simple map of `id -> CharacterSheet`.
- `DEFAULT_CHARACTER_ID` controls which character is shown when you open `/character-sheet-app`.

4. **Run locally**

```bash
npm run dev
# Visit: http://localhost:5173/character-sheet-app
```

You should see your new character’s data, with session state (HP, Hope, Inspiration, uses, death saves) persisting across reloads.

---

## Data model cheatsheet

The full model is in `model/character.types.ts`. Key pieces:

```ts
export interface CharacterSheet {
  id: string;
  name: string;
  level: number;
  classes: string;          // "Barbarian 5", "Rogue 3 / Wizard 2", etc.

  maxHp: number;
  armorClass: number;
  initiativeMod: number;    // Already the final modifier (e.g. DEX mod + misc)
  speed: string;            // "30 ft", "40 ft", etc.
  proficiencyBonus?: number; // Optional; if omitted, derived from level

  abilities: AbilityScores; // STR/DEX/CON/INT/WIS/CHA scores
  savingThrowProficiencies: SavingThrowProficiencies;
  skills: SkillDefinition[]; // Which skills you care about, ability + prof/expertise

  attacks: Attack[];        // Primary attacks to show in Combat section
  limitedUses: LimitedUseResource[]; // Features with limited uses (Rage, etc.)

  hopeAbilities?: HopeTier[]; // Optional Hope system tiers (see below)

  turnGuide?: TurnGuide;   // Small "On your turn" checklist
  notes?: string;          // Free-form notes (supports newlines)
}
```

Derived values (modifiers, saves, skills, passives, attack bonuses) are computed in `model/derive.ts`, so you only enter **raw scores** and proficiency flags.

---

## Hope & Inspiration (thirds-based)

### Storage rules

The UI tracks these counters, per character id, in `localStorage`:

- `hopeThirds` – uncapped integer of thirds.
- `inspirationThirds` – uncapped integer of thirds.

These are **not** in the character TS file; you only change them in the UI.

### Spend rules

In the UI (`ResourcesSection.tsx` + `characterStorage.ts`):

- You can **increment/decrement** thirds freely.
- The **“Spend 1”** button is **disabled** unless you have at least **3 thirds**.
- Clicking “Spend 1” subtracts **exactly 3 thirds**, representing one full point.

This logic is centralised in `useCharacterTracker`:

```ts
spendHope: () => {
  setState((prev) => {
    if (prev.hopeThirds < 3) return prev;
    return { ...prev, hopeThirds: prev.hopeThirds - 3 };
  });
},
```

> You never persist “spent Hope cards” or unlocks; only the numeric Hope third count is stored.

---

## Hope Abilities (tiers & cards)

Model:

```ts
export interface HopeCard {
  id: string;
  title: string;
  body: string; // plain text, allow newlines
}

export interface HopeTier {
  tier: number;                   // 1, 2, 3...
  cards: [HopeCard, HopeCard, HopeCard];
  activeCardId: string;           // must match one of the 3 cards’ ids
}

export interface CharacterSheet {
  ...
  hopeAbilities?: HopeTier[];
}
```

### Unlocking tiers

- A tier is **unlocked** if it exists in the `hopeAbilities` array.
- There is **no level logic** and no “unlock” flag in state.
- To unlock a new tier, you **add a new `HopeTier` entry** to the `hopeAbilities` array in the **character TS file**.

### Active vs inactive cards

- Each tier has **exactly 3** cards in the fixed-size `cards` tuple.
- Exactly **one** is active, chosen by `activeCardId`.
- The UI:
  - Finds the active card (`card.id === activeCardId`) and shows it prominently.
  - Shows the other two as “inactive” cards, visually secondary / collapsed.
  - Does **not** provide any control to switch active cards.
- To change which card is active, you **edit `activeCardId` in the character file**, not via the app.

### Editing Hope card content

All Hope content lives in the **character TS file** (e.g. `data/characters/<character>.ts`), in the `hopeAbilities` array (often defined as a `hopeTiers` constant and then assigned to `hopeAbilities`).

- **Card text**: Each card has `id`, `title`, and `body`. Edit `title` and `body` in place. Use `\n` in `body` for line breaks (e.g. `'Line one.\nLine two.'`). Keep each card’s `id` unchanged so `activeCardId` still matches.
- **Which card is active**: In that tier’s object, set `activeCardId` to the `id` of the card you want active (one of the three in `cards`).

This applies to every character: edit the same structure in that character’s file.

### Disabling a Hope tier

There is no separate “enabled” or “disabled” flag. The app shows only tiers that exist in the character’s `hopeAbilities` array.

- **To hide a tier**: Remove that tier object from the `hopeAbilities` (or `hopeTiers`) array in the character file. The tier will no longer appear on the sheet.
- **To show it again**: Add the tier back to the array.

The rendering logic lives in `HopeAbilitiesSection.tsx`.

---

## Limited-use resources

Use `limitedUses` for anything you want to tick up/down:

```ts
export interface LimitedUseResource {
  id: string;
  name: string;
  max: number;
  reset: 'short-rest' | 'long-rest' | 'per-encounter' | 'custom';
  notes?: string;
}
```

- **Where to define**: in your character file under `limitedUses`.
- **Where it’s tracked**: UI state in `localStorage` via `characterStorage.ts` (`limitedUses[id]`), not in the TS file.
- **How to change max/reset**: edit the character file.

---

## Beginner roll guidance

The UI aims to be beginner-friendly:

- **Attacks**:
  - Each attack card shows:
    - **To hit**: `d20 + X` (computed from ability + proficiency + any extra bonus).
    - **Damage**: one or more dice lines (normal vs Rage, etc.).
  - Each attack can have a short **“when to use”** sentence you write in the character file.
- **Saves & skills**:
  - Text reminders: “roll d20 + modifier”.
  - Saves, skills, and passives are all derived from the ability scores and prof flags you enter.

There is **no dice roller**; this app is for quick reference and tracking, not automation.

---

## What is (and isn’t) editable in the app

**Stored in TypeScript & only edited in code:**

- All character identity and rules:
  - Name, level, classes, ancestry, background, alignment.
  - Ability scores, saves, skills, attacks, damage dice, “when to use”, resources.
  - Hope tiers, cards, and `activeCardId`.
  - Turn guide and notes.

**Stored in `localStorage` & editable in the UI:**

- Current HP and Temp HP.
- Hope thirds and Inspiration thirds.
- Limited-use resource counts (used).
- Death save successes/failures.

> If a tracker looks “wrong” or stale, use the **“Reset session values”** button in the Resources section, or clear `localStorage` for this origin.

---

## Quick checklist when adding/customising a character

1. Duplicate `aelfwynn.ts` into `data/characters/` with a new filename.
2. Change:
   - `id`, `name`, `level`, `classes`, `maxHp`, `armorClass`, `initiativeMod`, `speed`.
   - `abilities` and `savingThrowProficiencies`.
   - `skills` and `attacks` (including dice strings and “when to use”).
   - `limitedUses` (if relevant).
   - `hopeAbilities` (optional) with 3 cards per tier and an `activeCardId`.
   - `turnGuide` and `notes` if you want them.
3. Register the character in `data/index.ts` and update `DEFAULT_CHARACTER_ID`.
4. Run `npm run dev` and open `/character-sheet-app`.

