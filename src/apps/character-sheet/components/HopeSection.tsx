import React from 'react';
import { HeartHandshake, RotateCcw } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';
import { ThirdsTracker, InspirationTracker } from './ResourcesSection';
import { HopeAbilityTiers } from './HopeAbilitiesSection';
import { sectionClass, sectionTitleClass, sectionDividerClass } from '../textClasses';

interface HopeSectionProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

export const HopeSection: React.FC<HopeSectionProps> = ({ character, state, actions }) => {
  return (
    <section id="hope" className={sectionClass}>
      <div className="flex items-center justify-between gap-2">
        <h2 className={sectionTitleClass}>
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
      <div className={sectionDividerClass} aria-hidden />

      <div className="grid gap-3 sm:grid-cols-2">
        <ThirdsTracker
          label="Hope"
          emoji="✨"
          thirds={state.hopeThirds}
          onChangeThirds={actions.addHopeThirds}
          onSpend={actions.spendHope}
        />
        <InspirationTracker
          label="Inspiration"
          emoji="💡"
          count={state.inspirationThirds}
          onChange={actions.addInspirationThirds}
          onSpend={actions.spendInspiration}
        />
      </div>

      <HopeAbilityTiers character={character} />
    </section>
  );
};
