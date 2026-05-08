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
      <span className="text-xs text-slate-500">Hit Dice</span>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-medium text-slate-700">Total: {totalDice}</span>
          </div>
          <div className="text-xs text-slate-600 text-center">{d12Count}d12 + {d10Count}d10</div>
        </div>
        <div className="flex flex-col gap-1.5">
          {/* d12 dice */}
          <div className="flex flex-col gap-1">
            <div className="text-xs text-slate-600 px-1">d12</div>
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: d12Count }).map((_, i) => (
                <button
                  key={`d12-${i}`}
                  type="button"
                  onClick={() => actions.toggleHitDie(i)}
                  className={`w-5 h-5 rounded border transition-colors touch-manipulation ${
                    isSpent(i)
                      ? 'bg-slate-300 border-slate-400'
                      : 'bg-white border-slate-300 hover:bg-slate-50'
                  }`}
                  title={`d12 #${i + 1}`}
                />
              ))}
            </div>
          </div>
          {/* d10 dice */}
          <div className="flex flex-col gap-1">
            <div className="text-xs text-slate-600 px-1">d10</div>
            <div className="grid grid-cols-2 gap-1">
              {Array.from({ length: d10Count }).map((_, i) => (
                <button
                  key={`d10-${i}`}
                  type="button"
                  onClick={() => actions.toggleHitDie(d12Count + i)}
                  className={`w-5 h-5 rounded border transition-colors touch-manipulation ${
                    isSpent(d12Count + i)
                      ? 'bg-slate-300 border-slate-400'
                      : 'bg-white border-slate-300 hover:bg-slate-50'
                  }`}
                  title={`d10 #${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
