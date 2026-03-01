import React from 'react';
import { HeartHandshake, RotateCcw } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';
import { ThirdsTracker } from './ResourcesSection';
import { HopeAbilityTiers } from './HopeAbilitiesSection';

interface HopeSectionProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

export const HopeSection: React.FC<HopeSectionProps> = ({ character, state, actions }) => {
  return (
    <section id="hope" className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
          <HeartHandshake className="h-3.5 w-3.5 text-indigo-500" />
          Hope
        </h2>
        <button
          type="button"
          onClick={actions.resetTrackers}
          className="text-[0.65rem] text-slate-500 hover:text-slate-700 flex items-center gap-0.5"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <ThirdsTracker
          label="Hope"
          emoji="✨"
          thirds={state.hopeThirds}
          onChangeThirds={actions.addHopeThirds}
          onSpend={actions.spendHope}
        />
        <ThirdsTracker
          label="Inspiration"
          emoji="💡"
          thirds={state.inspirationThirds}
          onChangeThirds={actions.addInspirationThirds}
          onSpend={actions.spendInspiration}
        />
      </div>

      <HopeAbilityTiers character={character} />
    </section>
  );
};
