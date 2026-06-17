import React from 'react';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';

interface HitDiceSectionProps {
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

const DiceRow: React.FC<{
  dieType: string;
  count: number;
  indexOffset: number;
  isSpent: (index: number) => boolean;
  onToggle: (index: number) => void;
}> = ({ dieType, count, indexOffset, isSpent, onToggle }) => (
  <div className="flex items-center gap-1">
    <span className="text-[0.6rem] text-slate-500 w-5 shrink-0">{dieType}</span>
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => {
        const idx = indexOffset + i;
        const spent = isSpent(idx);
        return (
          <button
            key={`${dieType}-${i}`}
            type="button"
            onClick={() => onToggle(idx)}
            aria-label={`${dieType} #${i + 1}${spent ? ' (spent)' : ''}`}
            aria-pressed={spent}
            className={`w-6 h-6 rounded border transition-colors touch-manipulation focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 ${
              spent ? 'bg-slate-300 border-slate-400' : 'bg-white border-slate-300 hover:bg-slate-50'
            }`}
          />
        );
      })}
    </div>
  </div>
);

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
        <DiceRow dieType="d12" count={d12Count} indexOffset={0} isSpent={isSpent} onToggle={actions.toggleHitDie} />
        <DiceRow dieType="d10" count={d10Count} indexOffset={d12Count} isSpent={isSpent} onToggle={actions.toggleHitDie} />
      </div>
    </div>
  );
};
