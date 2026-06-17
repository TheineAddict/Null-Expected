import React from 'react';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';

interface HitDiceSectionProps {
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

export const HitDiceSection: React.FC<HitDiceSectionProps> = ({ state, actions }) => {
  const d12Count = 6;
  const d10Count = 2;
  const totalDice = d12Count + d10Count;

  const isSpent = (index: number) => (state.hitDiceSpent & (1 << index)) !== 0;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="min-h-[1.25rem] text-xs text-slate-500 flex items-center">Hit Dice</span>
      <div className="text-xs text-slate-700 font-medium text-center">
        {totalDice} ({d12Count}d12 + {d10Count}d10)
      </div>
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex items-center gap-1">
          <span className="text-[0.6rem] text-slate-500 w-5 shrink-0">d12</span>
          <div className="flex gap-1">
            {Array.from({ length: d12Count }).map((_, i) => (
              <button
                key={`d12-${i}`}
                type="button"
                onClick={() => actions.toggleHitDie(i)}
                aria-label={`d12 #${i + 1}${isSpent(i) ? ' (spent)' : ''}`}
                aria-pressed={isSpent(i)}
                className={`w-6 h-6 rounded border transition-colors touch-manipulation focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 ${
                  isSpent(i)
                    ? 'bg-slate-300 border-slate-400'
                    : 'bg-white border-slate-300 hover:bg-slate-50'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[0.6rem] text-slate-500 w-5 shrink-0">d10</span>
          <div className="flex gap-1">
            {Array.from({ length: d10Count }).map((_, i) => (
              <button
                key={`d10-${i}`}
                type="button"
                onClick={() => actions.toggleHitDie(d12Count + i)}
                aria-label={`d10 #${i + 1}${isSpent(d12Count + i) ? ' (spent)' : ''}`}
                aria-pressed={isSpent(d12Count + i)}
                className={`w-6 h-6 rounded border transition-colors touch-manipulation focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 ${
                  isSpent(d12Count + i)
                    ? 'bg-slate-300 border-slate-400'
                    : 'bg-white border-slate-300 hover:bg-slate-50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
