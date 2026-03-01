import React from 'react';
import type { CharacterSheet } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';
import { formatModifier } from '../model/derive';

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
    <section className="rounded-xl bg-white shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-800 tracking-wide uppercase">Hit Points</h2>
        <p className="text-xs text-gray-500">Tap to adjust during play; numbers resettable from browser storage.</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-gray-500">Current</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 text-lg font-semibold flex items-center justify-center active:bg-slate-200"
              onClick={() => actions.adjustCurrentHp(-1)}
            >
              −
            </button>
            <div className="min-w-[3.5rem] h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xl font-semibold tabular-nums">
              {current}
            </div>
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 text-lg font-semibold flex items-center justify-center active:bg-slate-200"
              onClick={() => actions.adjustCurrentHp(1)}
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-500">Max {max}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-gray-500">Temp HP</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 text-lg font-semibold flex items-center justify-center active:bg-slate-200"
              onClick={() => actions.adjustTempHp(-1)}
            >
              −
            </button>
            <div className="min-w-[3.5rem] h-12 rounded-lg bg-slate-50 text-slate-900 flex items-center justify-center text-xl font-semibold tabular-nums border border-slate-200">
              {temp}
            </div>
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 text-lg font-semibold flex items-center justify-center active:bg-slate-200"
              onClick={() => actions.adjustTempHp(1)}
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-500">Use before normal HP when you take damage.</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-gray-500">Death Saves</span>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-[0.7rem] text-emerald-700 uppercase tracking-wide">Success</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const next = idx + 1 === state.deathSaves.successes ? idx : idx + 1;
                      actions.setDeathSaves(next, state.deathSaves.failures);
                    }}
                    className={`w-5 h-5 rounded-full border ${
                      state.deathSaves.successes > idx ? 'bg-emerald-500 border-emerald-600' : 'border-emerald-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[0.7rem] text-rose-700 uppercase tracking-wide">Failure</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const next = idx + 1 === state.deathSaves.failures ? idx : idx + 1;
                      actions.setDeathSaves(state.deathSaves.successes, next);
                    }}
                    className={`w-5 h-5 rounded-full border ${
                      state.deathSaves.failures > idx ? 'bg-rose-500 border-rose-600' : 'border-rose-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-[0.7rem] text-gray-500">
              When at 0 HP, roll a death save: roll d20 + {formatModifier(0)}; 10 or higher is a success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

