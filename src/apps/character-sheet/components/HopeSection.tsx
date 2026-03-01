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
    <section id="hope" className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-col space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold leading-tight text-slate-900 flex items-center gap-1.5">
          <HeartHandshake className="h-4 w-4 text-indigo-500" />
          Hope
        </h2>
        <button
          type="button"
          onClick={actions.resetTrackers}
          className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-0.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>
      <div className="border-b border-slate-100 mt-2 mb-3" aria-hidden />

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
