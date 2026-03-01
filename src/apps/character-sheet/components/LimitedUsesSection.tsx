import React from 'react';
import type { CharacterSheet, LimitedUseResource } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';

interface LimitedUsesSectionProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

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

export const LimitedUsesSection: React.FC<LimitedUsesSectionProps> = ({ character, state, actions }) => {
  if (!character.limitedUses?.length) return null;

  return (
    <section id="limited-uses" className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-2">
      <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Limited Uses</h2>
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
    </section>
  );
};
