import React from 'react';
import type { CharacterSheet, LimitedUseResource } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';

interface LimitedUsesSectionProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

const LIMITED_USE_DESCRIPTIONS: Record<string, string | string[]> = {
  'frosts-chill':
    "On a hit: add 1d6 cold damage, and the target's speed is reduced by 10 ft until the start of your next turn. Decide after you hit and deal damage; spend 1 use.",
  'large-form':
    "Bonus action. For 10 minutes you become Large (if space allows). You have advantage on Strength checks, and your speed increases by 10 ft while this is active.",
  rage: "Bonus action, lasts 1 minute. While raging: advantage on Strength checks and Strength saves, +2 damage on Strength-based melee weapon attacks, and resistance to bludgeoning/piercing/slashing damage. Rage can end early if you stop fighting (no attacks taken and no damage taken since your last turn).",
  'second-wind': [
    "Bonus action: regain 1d10 + Fighter level hit points (your sheet uses +2).",
    "Tactical Mind (uses Second Wind): when you fail an ability check, you can roll 1d10 and add it to the check. If you still fail, the use isn't spent (campaign rule).",
  ],
  'action-surge':
    "On your turn, take 1 additional action (for example: another Attack action). This is separate from your bonus action and reaction.",
};

const LimitedUseRow: React.FC<{
  resource: LimitedUseResource;
  used: number;
  onChange: (delta: number) => void;
}> = ({ resource, used, onChange }) => {
  const remaining = Math.max(0, resource.max - used);
  const desc = LIMITED_USE_DESCRIPTIONS[resource.id];
  const paragraphs = Array.isArray(desc) ? desc : desc ? [desc] : [];

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-white px-2.5 py-1.5 sm:px-3 sm:py-2">
      <div className="min-w-0">
        <span className="text-xs font-semibold text-slate-800 block truncate">{resource.name}</span>
        <span className="text-[0.65rem] text-slate-500">
          {remaining}/{resource.max} · {resource.reset.replace('-', ' ')}
        </span>
        {paragraphs.length > 0 && (
          <div className="mt-1 text-sm leading-snug text-slate-500 space-y-0.5">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
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
