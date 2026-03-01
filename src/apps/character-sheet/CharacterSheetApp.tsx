import React from 'react';
import { CHARACTERS, DEFAULT_CHARACTER_ID } from './data';
import { useCharacterTracker } from './storage/characterStorage';
import { TopBar } from './components/TopBar';
import { HpPanel } from './components/HpPanel';
import { CombatSection } from './components/CombatSection';
import { ResourcesSection } from './components/ResourcesSection';
import { HopeAbilitiesSection } from './components/HopeAbilitiesSection';
import { ActionsSection } from './components/ActionsSection';
import { AbilitySavesSkillsSection } from './components/AbilitySavesSkillsSection';
import { NotesSection } from './components/NotesSection';

const CharacterSheetApp: React.FC = () => {
  const character = CHARACTERS[DEFAULT_CHARACTER_ID];
  const { state, actions } = useCharacterTracker(character);

  if (!character) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-sm">No character is configured. Add one under src/apps/character-sheet/data.</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-5xl mx-auto px-4 py-4 space-y-4">
        <TopBar character={character} />
        <HpPanel character={character} state={state} actions={actions} />
        <CombatSection character={character} state={state} actions={actions} />
        <ResourcesSection character={character} state={state} actions={actions} />
        <HopeAbilitiesSection character={character} />
        <ActionsSection character={character} />
        <AbilitySavesSkillsSection character={character} />
        <NotesSection character={character} />
      </main>
    </div>
  );
};

export default CharacterSheetApp;

