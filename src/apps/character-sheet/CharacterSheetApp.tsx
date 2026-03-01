import * as React from 'react';
import type { CharacterSheet } from './model/character.types';
import { CHARACTERS, DEFAULT_CHARACTER_ID } from './data';
import { useCharacterTracker } from './storage/characterStorage';
import { TopBar } from './components/TopBar';
import { HpPanel } from './components/HpPanel';
import { CombatSection } from './components/CombatSection';
import { LimitedUsesSection } from './components/LimitedUsesSection';
import { AbilitySavesSkillsSection } from './components/AbilitySavesSkillsSection';
import { TraitsSection } from './components/TraitsSection';
import { ReactionsSection } from './components/ReactionsSection';
import { HopeSection } from './components/HopeSection';
import { HealingPotionsSection } from './components/HealingPotionsSection';
import { QuickActionsSection } from './components/QuickActionsSection';

interface CharacterSheetAppProps {
  character?: CharacterSheet;
}

const CharacterSheetApp: React.FC<CharacterSheetAppProps> = ({ character: characterProp }: CharacterSheetAppProps) => {
  const fallback = CHARACTERS[DEFAULT_CHARACTER_ID];
  const character = characterProp ?? fallback;
  const { state, actions } = useCharacterTracker(character);

  if (!character) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-sm">No character is configured. Add one under src/apps/character-sheet/data.</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-5 space-y-5">
        <TopBar character={character} />

        <HpPanel character={character} state={state} actions={actions} />

        <QuickActionsSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <CombatSection character={character} state={state} actions={actions} />
          </div>
          <div className="space-y-4">
            <LimitedUsesSection character={character} state={state} actions={actions} />
          </div>
        </div>

        <AbilitySavesSkillsSection character={character} />

        <TraitsSection character={character} />
        <ReactionsSection character={character} />
        <HopeSection character={character} state={state} actions={actions} />
        <HealingPotionsSection />
      </main>
    </div>
  );
};

export default CharacterSheetApp;
