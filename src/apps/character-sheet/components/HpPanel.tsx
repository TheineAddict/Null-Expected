import React from 'react';
import { Heart, ShieldPlus } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';

interface HpPanelProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

export const HpPanel: React.FC<HpPanelProps> = ({ character, state, actions }) => {
  const current = state.currentHp;
  const max = character.maxHp;
  const temp = state.tempHp;

  return (
    <section className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
      <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
        <Heart className="h-3.5 w-3.5 text-rose-500" />
        Hit Points
      </h2>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[0.65rem] uppercase tracking-wide text-slate-500">Current</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 text-slate-700 text-base font-semibold flex items-center justify-center active:bg-slate-200 touch-manipulation"
              onClick={() => actions.adjustCurrentHp(-1)}
            >
              −
            </button>
            <div className="min-w-[2.75rem] sm:min-w-[3.25rem] h-10 sm:h-11 rounded-lg bg-slate-800 text-white flex items-center justify-center text-lg sm:text-xl font-semibold tabular-nums">
              {current}
            </div>
            <button
              type="button"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 text-slate-700 text-base font-semibold flex items-center justify-center active:bg-slate-200 touch-manipulation"
              onClick={() => actions.adjustCurrentHp(1)}
            >
              +
            </button>
          </div>
          <span className="text-[0.65rem] text-slate-500">Max {max}</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[0.65rem] uppercase tracking-wide text-slate-500 flex items-center gap-0.5">
            <ShieldPlus className="h-3 w-3" /> Temp
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center active:bg-slate-200 touch-manipulation"
              onClick={() => actions.adjustTempHp(-1)}
            >
              −
            </button>
            <div className="min-w-[2.75rem] sm:min-w-[3.25rem] h-10 sm:h-11 rounded-lg bg-slate-50 text-slate-800 flex items-center justify-center text-lg sm:text-xl font-semibold tabular-nums border border-slate-200">
              {temp}
            </div>
            <button
              type="button"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center active:bg-slate-200 touch-manipulation"
              onClick={() => actions.adjustTempHp(1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[0.65rem] uppercase tracking-wide text-slate-500">Death</span>
          <div className="flex gap-2">
            <div className="flex items-center gap-0.5">
              <span className="text-[0.6rem] text-emerald-600">✓</span>
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const next = idx + 1 === state.deathSaves.successes ? idx : idx + 1;
                    actions.setDeathSaves(next, state.deathSaves.failures);
                  }}
                  className={`w-5 h-5 rounded-full border-2 touch-manipulation ${
                    state.deathSaves.successes > idx ? 'bg-emerald-500 border-emerald-600' : 'border-emerald-300 bg-white'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-0.5">
              <span className="text-[0.6rem] text-rose-600">✗</span>
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const next = idx + 1 === state.deathSaves.failures ? idx : idx + 1;
                    actions.setDeathSaves(state.deathSaves.successes, next);
                  }}
                  className={`w-5 h-5 rounded-full border-2 touch-manipulation ${
                    state.deathSaves.failures > idx ? 'bg-rose-500 border-rose-600' : 'border-rose-300 bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

