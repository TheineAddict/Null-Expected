import React from 'react';
import type { CharacterSheet, LimitedUseResource } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';
import { bodyTextClass } from '../textClasses';

interface LimitedUsesSectionProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

const LIMITED_USE_DESCRIPTIONS: Record<string, string | string[]> = {
  'frosts-chill': [
    "On a hit: add 1d6 cold damage, and the target's speed is reduced by 10 ft until the start of your next turn. Decide after you hit and deal damage; spend 1 use.",
    "Uses per long rest equal your proficiency bonus (currently 3).",
  ],
  'large-form': [
    "Bonus action. For 10 minutes you become Large (if space allows). You have advantage on Strength checks, and your speed increases by 10 ft while this is active.",
    "Ends early if you choose (no action).",
  ],
  rage: [
    "Bonus action, lasts 1 minute. While raging: advantage on Strength checks and Strength saves, +2 damage on Strength-based melee weapon attacks, and resistance to bludgeoning/piercing/slashing damage. Rage can end early if you stop fighting (no attacks taken and no damage taken since your last turn).",
    "When you enter Rage: gain temp HP equal to your Barbarian level (Vitality Surge).",
  ],
  'second-wind': [
    "Bonus action: regain 1d10 + Fighter level hit points (your sheet uses +2).",
    "Tactical Mind (uses Second Wind): when you fail an ability check, you can roll 1d10 and add it to the check. If you still fail, the use isn't spent (campaign rule).",
    "Recharge: regain 1 use on a short rest; regain all uses on a long rest.",
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
    <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-sm font-semibold text-slate-900 truncate">{resource.name}</span>
          <span className="text-xs text-slate-500 tabular-nums shrink-0">
            {remaining}/{resource.max} · {resource.reset.replace('-', ' ')}
          </span>
        </div>
        {paragraphs.length > 0 && (
          <div className={`mt-2 ${bodyTextClass} space-y-0.5`}>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0 h-7">
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
    <section id="limited-uses" className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-col space-y-3 lg:flex-1 lg:min-h-0">
      <h2 className="text-base font-semibold leading-tight text-slate-900">Limited Uses</h2>
      <div className="border-b border-slate-100 mt-2 mb-3" aria-hidden />
      <div className="flex flex-col gap-3">
        {character.limitedUses.map((res) => (
          <LimitedUseRow
            key={res.id}
            resource={res}
            used={state.limitedUses[res.id] ?? 0}
            onChange={(delta) => actions.adjustLimitedUse(res.id, delta, res.max)}
          />
        ))}
      </div>
      <div className="flex-1 lg:block hidden" aria-hidden />
    </section>
  );
};
