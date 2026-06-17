import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import type { CharacterSheet, LimitedUseResource } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';
import { Counter } from './ui/Counter';

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
    <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
          <span aria-hidden>{emoji}</span>
          {label}
        </span>
        <span className="text-xs text-slate-500 tabular-nums font-semibold">{thirds}/3</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Counter
          value={thirds}
          onDecrement={() => onChangeThirds(-1)}
          onIncrement={() => onChangeThirds(1)}
          decrementLabel={`Decrease ${label}`}
          incrementLabel={`Increase ${label}`}
          size="md"
        />
        <button
          type="button"
          disabled={!canSpend}
          onClick={onSpend}
          className={`px-2.5 py-1.5 rounded-lg text-[0.7rem] font-semibold uppercase tracking-wide touch-manipulation focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 ${
            canSpend ? 'btn-themed shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Spend 1
        </button>
      </div>
    </div>
  );
};

export const InspirationTracker: React.FC<{
  label: string;
  emoji: string;
  count: number;
  onChange: (delta: number) => void;
  onSpend: () => void;
}> = ({ label, emoji, count, onChange, onSpend }) => {
  const canSpend = count >= 1;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
          <span aria-hidden>{emoji}</span>
          {label}
        </span>
        <span className="text-xs text-slate-500 tabular-nums font-semibold">{count}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Counter
          value={count}
          onDecrement={() => onChange(-1)}
          onIncrement={() => onChange(1)}
          decrementLabel={`Decrease ${label}`}
          incrementLabel={`Increase ${label}`}
          size="md"
        />
        <button
          type="button"
          disabled={!canSpend}
          onClick={onSpend}
          className={`px-2.5 py-1.5 rounded-lg text-[0.7rem] font-semibold uppercase tracking-wide touch-manipulation focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 ${
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
    <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 sm:px-3 sm:py-2">
      <div className="min-w-0">
        <span className="text-xs font-semibold text-slate-800 block truncate">{resource.name}</span>
        <span className="text-[0.65rem] text-slate-500">
          {remaining}/{resource.max} · {resource.reset.replace('-', ' ')}
        </span>
      </div>
      <Counter
        value={used}
        onDecrement={() => onChange(-1)}
        onIncrement={() => onChange(1)}
        decrementDisabled={used <= 0}
        incrementDisabled={used >= resource.max}
        decrementLabel={`Decrease uses of ${resource.name}`}
        incrementLabel={`Increase uses of ${resource.name}`}
        size="sm"
      />
    </div>
  );
};

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ character, state, actions }) => {
  return (
    <section className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          Hope &amp; inspiration
        </h2>
        <button
          type="button"
          onClick={actions.resetTrackers}
          className="text-[0.65rem] text-slate-500 hover:text-slate-700 flex items-center gap-0.5 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 rounded"
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
        <InspirationTracker
          label="Inspiration"
          emoji="💡"
          count={state.inspirationThirds}
          onChange={actions.addInspirationThirds}
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
