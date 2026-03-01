# Character Sheet App

A minimalist DnD 5e character sheet. All character data lives in TypeScript files and is **read-only in the UI**; only trackers (HP, Hope, Inspiration, limited uses, death saves) are stored in `localStorage`.

---

## Routes

- **`/character-sheet-app`** – Redirects to the first character in the list (`/character-sheet-app/:characterId`).
- **`/character-sheet-app/:characterId`** – Loads the character whose filename (without `.ts`) matches `characterId` and renders the sheet.

Routing and the page wrapper live in `src/App.tsx` and `src/pages/CharacterSheetApp.tsx`; the app itself is in `src/apps/character-sheet/`.

---

## How characters are discovered

Characters are discovered at **build time** via `import.meta.glob` in `data/charactersIndex.ts`:

- **Location**: `src/apps/character-sheet/data/characters/*.ts`
- **Rules**: Every `.ts` file under `data/characters/` is treated as a character **except** `index.ts` and `template_character_sheet.ts`.
- **Character id**: Derived from the filename (e.g. `aelfwynn.ts` → id `aelfwynn`).
- **Export**: The file must export a `CharacterSheet` object, either as a named export matching the id (e.g. `export const aelfwynn: CharacterSheet = { ... }`) or as the only/single export so the loader can use it.

There is **no manual registry** for routing: add a new `.ts` file under `data/characters/` and it appears in the app. The file `data/index.ts` (with `CHARACTERS` and `DEFAULT_CHARACTER_ID`) is only used as a fallback when `CharacterSheetApp` is rendered without a `character` prop (e.g. in tests or custom embedding).

---

## LocalStorage persistence

Tracker state is saved per character so each sheet keeps its own HP, Hope, etc.

- **Key format**: `ne:character-sheet:${characterId}:state:v1` (see `storage/characterStorage.ts`, `buildStorageKey`).
- **Stored**:
  - `currentHp`, `effectiveMaxHp`, `tempHp`
  - `hopeThirds`, `inspirationThirds`
  - `limitedUses` (object: resource id → number of uses spent)
  - `deathSaves` (`successes`, `failures`)
- **Not stored**: Character data (name, abilities, attacks, etc.) — that stays in the TS files only.

---

## Where character files live and naming

- **Directory**: `src/apps/character-sheet/data/characters/`
- **Naming**: Use a single identifier, e.g. `my_character.ts` or `bob.ts`. The **filename (without `.ts`)** is the character id used in the URL and in localStorage.
- **Template**: `template_character_sheet.ts` is a full template; it is **excluded** from the character list so it does not show as a playable character. Copy it and rename to add new characters.

---

## Portrait

Set **`portraitUrl`** on the character object to show a portrait in the header (e.g. `portraitUrl: '/apps/character-sheet/your-name-portrait.jpg'`). Omit or set to `undefined` for no portrait. The image is shown in a round frame next to the name.

---

## Hope tiers (summary)

- **Unlocking**: A tier is shown if it exists in the character’s `hopeAbilities` array. No level or unlock flag in state.
- **Structure**: Each tier has **exactly 3 cards** (`[HopeCard, HopeCard, HopeCard]`) and **one** `activeCardId` (must match one of those cards’ `id`).
- **UI**: The active card is shown prominently; the other two are shown as inactive. Which card is active is **not** changeable in the app; edit `activeCardId` in the character file.
- **Content**: All text (`title`, `body`) and which card is active live in the character TS file. Use `\n` in `body` for line breaks.

---

## UI structure (sections and navigation)

- **Top anchor**: The page has an element `id="top"` at the start (above the header card) for “return to top” behaviour.
- **Sections** (in order): Header card (name, level, ancestry, stat chips, abilities) → Hit Points (standalone) → Jump chips → Main grid (Combat | Limited Uses) → Saves, Skills & Passives → Traits → Reactions → Hope → Healing Potions.
- **Jump chips**: Row of links (↑ Top, HP, Combat, Limited Uses, Saves/Skills, Traits, Reactions, Hope) that smooth-scroll to the corresponding section by id.
- **Floating “↑ Top” button**: Shown after scrolling down (e.g. > 400px); fixed bottom-right with safe-area padding; click scrolls to `#top`.

---

## Folder layout

```text
src/apps/character-sheet/
├── CharacterSheetApp.tsx
├── textClasses.ts                 # Shared body text class
├── model/
│   ├── character.types.ts
│   └── derive.ts
├── storage/
│   └── characterStorage.ts
├── data/
│   ├── index.ts                  # Optional: CHARACTERS + DEFAULT_CHARACTER_ID (fallback)
│   ├── charactersIndex.ts        # Glob-based discovery + getCharacter(characterId)
│   └── characters/
│       ├── template_character_sheet.ts   # Template (excluded from list)
│       └── *.ts                  # One file per character
└── components/
    ├── TopBar.tsx
    ├── HpPanel.tsx
    ├── CombatSection.tsx
    ├── LimitedUsesSection.tsx
    ├── AbilitySavesSkillsSection.tsx
    ├── TraitsSection.tsx
    ├── ReactionsSection.tsx
    ├── HopeSection.tsx
    ├── HopeAbilitiesSection.tsx
    ├── HealingPotionsSection.tsx
    ├── QuickActionsSection.tsx   # Jump chips + BackToTopButton
    └── ...
```

---

## How to add a new character

1. **Copy the template**  
   `src/apps/character-sheet/data/characters/template_character_sheet.ts`  
   → paste as `src/apps/character-sheet/data/characters/<characterId>.ts` (e.g. `my_hero.ts`).

2. **Rename the export and set `id`**  
   - Export name must match the filename (e.g. `export const my_hero: CharacterSheet = { ... }`).
   - Set `id: '<characterId>'` inside the object (same as the filename without `.ts`).

3. **Fill in placeholders**  
   Name, level, classes, abilities, skills, attacks, limitedUses, hopeAbilities (if used), turnGuide, traits, reactions, defenses, languages, etc. See `model/character.types.ts` and the template for every supported section.

4. **Discovery**  
   The app discovers characters via the glob in `data/charactersIndex.ts`. No need to edit `data/index.ts` unless you rely on the fallback (CHARACTERS / DEFAULT_CHARACTER_ID) for non-routed usage.

5. **Run**  
   `npm run dev` → open `http://localhost:5173/character-sheet-app` (redirects to first character) or `http://localhost:5173/character-sheet-app/<characterId>`.

---

## Data model cheatsheet

The full model is in `model/character.types.ts`. Key pieces:

```ts
export interface CharacterSheet {
  id: string;
  name: string;
  level: number;
  classes: string;
  portraitUrl?: string;
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

  traits?: Trait[];
  reactions?: Reaction[];
  defenses?: Defenses;
  languages?: string[];
  hopeAbilities?: HopeTier[];
  turnGuide?: TurnGuide;
  notes?: string;
}
```

Derived values (modifiers, saves, skills, passives, attack bonuses) are computed in `model/derive.ts`.

---

## Hope & Inspiration (thirds-based)

- Counters **hopeThirds** and **inspirationThirds** are stored in `localStorage` per character (see key format above).
- “Spend 1” is enabled only when the counter is ≥ 3; clicking it subtracts 3. No “unlock” or card state is persisted.

---

## Hope Abilities (tiers & cards)

- **Model**: Each `HopeTier` has `tier` (number), `cards: [HopeCard, HopeCard, HopeCard]`, and `activeCardId` (one of those cards’ `id`).
- **Unlocking**: Add a tier to `hopeAbilities` in the character file to show it; remove it to hide it.
- **Active card**: Set `activeCardId` in the character file; the UI has no control to switch it.

---

## Limited-use resources

- Defined in the character file under `limitedUses` (id, name, max, reset, optional notes).
- **Used count** is stored in `localStorage` per character; max and reset are only in the TS file.
- Reset can be `'short-rest' | 'long-rest' | 'per-encounter' | 'custom'`.

---

## What is (and isn’t) editable in the app

**Only in code (character TS files):**  
Name, level, classes, ancestry, background, alignment, abilities, saves, skills, attacks, limited-use definitions, Hope tiers/cards/activeCardId, turn guide, traits, reactions, defenses, languages, notes.

**In the UI / localStorage:**  
Current HP, temp HP, Hope thirds, Inspiration thirds, limited-use *counts* (used), death save successes/failures.

Use the “Reset” control in the Hope section (or clear localStorage for this origin) to reset tracker state.

---

## Quick checklist when adding a character

1. Copy `template_character_sheet.ts` → `data/characters/<characterId>.ts`.
2. Rename the export to match `<characterId>` and set `id: '<characterId>'`.
3. Fill in all sections you need (see template and types).
4. Run the app; the new character is discoverable automatically. Visit `/character-sheet-app` or `/character-sheet-app/<characterId>`.
