import React from 'react';
import type { CharacterSheet, LimitedUseResource } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';

interface ResourcesSectionProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

const ThirdsTracker: React.FC<{
  label: string;
  thirds: number;
  onChangeThirds: (delta: number) => void;
  onSpend: () => void;
}> = ({ label, thirds, onChangeThirds, onSpend }) => {
  const full = Math.floor(thirds / 3);
  const remainder = thirds % 3;
  const canSpend = thirds >= 3;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-100 bg-slate-50 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide">{label}</span>
        <span className="text-xs text-gray-600">
          {full} full · {remainder}/3 toward next
        </span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 text-lg font-semibold flex items-center justify-center active:bg-slate-200"
            onClick={() => onChangeThirds(-1)}
          >
            −
          </button>
          <div className="min-w-[3rem] h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center text-lg font-semibold tabular-nums">
            {thirds}
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 text-lg font-semibold flex items-center justify-center active:bg-slate-200"
            onClick={() => onChangeThirds(1)}
          >
            +
          </button>
        </div>
        <button
          type="button"
          disabled={!canSpend}
          onClick={onSpend}
          className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide ${
            canSpend ? 'btn-themed shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Spend 1
        </button>
      </div>
      <p className="text-[0.7rem] text-gray-500">
        You can only spend when you have at least 3 thirds (1 full point). The Spend button automatically removes 3
        thirds.
      </p>
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
    <div className="flex items-center justify-between gap-2 rounded-lg border border-gray-100 bg-white px-3 py-2">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold text-gray-800">{resource.name}</span>
        <span className="text-[0.7rem] text-gray-500">
          {remaining}/{resource.max} uses left · resets on {resource.reset.replace('-', ' ')}
        </span>
        {resource.notes && <span className="text-[0.7rem] text-gray-500">{resource.notes}</span>}
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="w-7 h-7 rounded-full bg-slate-100 text-slate-800 text-sm font-semibold flex items-center justify-center active:bg-slate-200 disabled:opacity-40"
          onClick={() => onChange(-1)}
          disabled={used <= 0}
        >
          −
        </button>
        <div className="min-w-[2rem] h-8 rounded-md bg-slate-900 text-white flex items-center justify-center text-sm font-semibold tabular-nums">
          {used}
        </div>
        <button
          type="button"
          className="w-7 h-7 rounded-full bg-slate-100 text-slate-800 text-sm font-semibold flex items-center justify-center active:bg-slate-200 disabled:opacity-40"
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
    <section className="rounded-xl bg-white shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-800 tracking-wide uppercase">Hope, Inspiration & Uses</h2>
        <button
          type="button"
          onClick={actions.resetTrackers}
          className="text-[0.7rem] text-gray-500 underline underline-offset-2"
        >
          Reset session values
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <ThirdsTracker
          label="Hope"
          thirds={state.hopeThirds}
          onChangeThirds={actions.addHopeThirds}
          onSpend={actions.spendHope}
        />
        <ThirdsTracker
          label="Inspiration"
          thirds={state.inspirationThirds}
          onChangeThirds={actions.addInspirationThirds}
          onSpend={actions.spendInspiration}
        />
      </div>

      {character.limitedUses.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Limited Uses</h3>
          <div className="flex flex-col gap-2">
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

