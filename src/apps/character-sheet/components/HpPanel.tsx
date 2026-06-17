import React from 'react';
import { Heart, ShieldPlus, Check, X } from 'lucide-react';
import type { CharacterSheet } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';
import { bodyTextClass, sectionTitleClass, sectionDividerClass } from '../textClasses';
import { Counter } from './ui/Counter';
import { HitDiceSection } from './HitDiceSection';

interface HpPanelProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

export const HpPanel: React.FC<HpPanelProps> = ({ character, state, actions }) => {
  const current = state.currentHp;
  const effectiveMax = state.effectiveMaxHp;
  const sheetMax = character.maxHp;
  const temp = state.tempHp;
  const isMaxAboveSheet = effectiveMax > sheetMax;

  return (
    <section
      id="hp"
      className={`rounded-xl shadow-sm border p-4 sm:p-5 flex flex-col space-y-3 scroll-mt-4 ${
        isMaxAboveSheet ? 'bg-red-50/80 border-red-200' : 'bg-white border-slate-200'
      }`}
    >
      <h2 className={sectionTitleClass}>
        <Heart className="h-4 w-4 text-rose-500" />
        Hit Points
      </h2>
      <div className={sectionDividerClass} aria-hidden />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-start">
        <div className="flex flex-col items-center gap-1.5">
          <div className="min-h-[1.25rem] flex items-center justify-center gap-1.5">
            <span className="text-xs text-slate-500">HP</span>
            <span className="text-[0.65rem] text-slate-400">max {sheetMax}</span>
          </div>
          <Counter
            value={current}
            onDecrement={() => actions.adjustCurrentHp(-1)}
            onIncrement={() => actions.adjustCurrentHp(1)}
            decrementLabel="Decrease HP"
            incrementLabel="Increase HP"
            size="lg"
          />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <span className="min-h-[1.25rem] text-xs text-slate-500 flex items-center gap-0.5">
            <ShieldPlus className="h-3 w-3" /> Temp
          </span>
          <Counter
            value={temp}
            onDecrement={() => actions.adjustTempHp(-1)}
            onIncrement={() => actions.adjustTempHp(1)}
            decrementLabel="Decrease temp HP"
            incrementLabel="Increase temp HP"
            size="lg"
            variant="light"
          />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <span className="min-h-[1.25rem] text-xs text-slate-500 flex items-center">Death</span>
          <div className="flex gap-2">
            <div className="flex items-center gap-0.5">
              <Check className="h-3 w-3 text-emerald-600" aria-hidden />
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const next = idx + 1 === state.deathSaves.successes ? idx : idx + 1;
                    actions.setDeathSaves(next, state.deathSaves.failures);
                  }}
                  aria-label={`Death save success ${idx + 1}`}
                  aria-pressed={state.deathSaves.successes > idx}
                  className={`w-5 h-5 rounded-full border-2 touch-manipulation focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 ${
                    state.deathSaves.successes > idx ? 'bg-emerald-500 border-emerald-600' : 'border-emerald-300 bg-white'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-0.5">
              <X className="h-3 w-3 text-rose-600" aria-hidden />
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const next = idx + 1 === state.deathSaves.failures ? idx : idx + 1;
                    actions.setDeathSaves(state.deathSaves.successes, next);
                  }}
                  aria-label={`Death save failure ${idx + 1}`}
                  aria-pressed={state.deathSaves.failures > idx}
                  className={`w-5 h-5 rounded-full border-2 touch-manipulation focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-1 ${
                    state.deathSaves.failures > idx ? 'bg-rose-500 border-rose-600' : 'border-rose-300 bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="mt-1.5 space-y-0.5">
            <p className={`${bodyTextClass} text-center`}>10 or higher is a success.</p>
            <p className={`${bodyTextClass} text-center`}>
              Nat 20: you regain 1 HP. Nat 1: counts as 2 failures.
            </p>
          </div>
        </div>
        <HitDiceSection state={state} actions={actions} />
      </div>
    </section>
  );
};
