import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import type { CharacterSheet, LimitedUseResource } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';

interface ResourcesSectionProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

export const ThirdsTracker: React.FC<{
  label: string;
  emoji: string;
  thirds: number;
  onChangeThirds: (delta: number) => void;
  onSpend: () => void;
}> = ({ label, emoji, thirds, onChangeThirds, onSpend }) => {
  const canSpend = thirds >= 3;

  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-slate-100 bg-slate-50 p-2.5 sm:p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
          <span aria-hidden>{emoji}</span>
          {label}
        </span>
        <span className="text-[0.65rem] text-slate-500 tabular-nums">{thirds}/3</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center active:bg-slate-300 touch-manipulation"
            onClick={() => onChangeThirds(-1)}
          >
            −
          </button>
          <div className="min-w-[2.5rem] h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center text-base font-semibold tabular-nums">
            {thirds}
          </div>
          <button
            type="button"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center active:bg-slate-300 touch-manipulation"
            onClick={() => onChangeThirds(1)}
          >
            +
          </button>
        </div>
        <button
          type="button"
          disabled={!canSpend}
          onClick={onSpend}
          className={`px-2.5 py-1.5 rounded-lg text-[0.7rem] font-semibold uppercase tracking-wide touch-manipulation ${
            canSpend ? 'btn-themed shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Spend 1
        </button>
      </div>
    </div>
  );
};

const LimitedUseRow: React.FC<{
  resource: LimitedUseResource;
  used: number;
  onChange: (delta: number) => void;
}> = ({ resource, used, onChange }) => {
  const remaining = Math.max(0, resource.max - used);

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-white px-2.5 py-1.5 sm:px-3 sm:py-2">
      <div className="min-w-0">
        <span className="text-xs font-semibold text-slate-800 block truncate">{resource.name}</span>
        <span className="text-[0.65rem] text-slate-500">
          {remaining}/{resource.max} · {resource.reset.replace('-', ' ')}
        </span>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center active:bg-slate-200 disabled:opacity-40 touch-manipulation"
          onClick={() => onChange(-1)}
          disabled={used <= 0}
        >
          −
        </button>
        <div className="min-w-[1.75rem] h-7 rounded-md bg-slate-800 text-white flex items-center justify-center text-xs font-semibold tabular-nums">
          {used}
        </div>
        <button
          type="button"
          className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center active:bg-slate-200 disabled:opacity-40 touch-manipulation"
          onClick={() => onChange(1)}
          disabled={used >= resource.max}
        >
          +
        </button>
      </div>
    </div>
  );
};

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ character, state, actions }) => {
  return (
    <section className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          Hope & inspiration
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

      {character.limitedUses.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[0.7rem] font-semibold text-slate-600 uppercase tracking-wide">Limited uses</h3>
          <div className="flex flex-col gap-1.5">
            {character.limitedUses.map((res) => (
              <LimitedUseRow
                key={res.id}
                resource={res}
                used={state.limitedUses[res.id] ?? 0}
                onChange={(delta) => actions.adjustLimitedUse(res.id, delta, res.max)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

