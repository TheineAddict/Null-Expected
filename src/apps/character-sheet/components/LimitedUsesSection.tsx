import React from 'react';
import { Hourglass } from 'lucide-react';
import type { CharacterSheet, LimitedUseResource } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';
import { bodyTextClass, sectionClass, sectionTitleClass, sectionDividerClass, innerCardClass } from '../textClasses';
import { Counter } from './ui/Counter';

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
    <div className={`${innerCardClass} flex items-start justify-between gap-3`}>
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

export const LimitedUsesSection: React.FC<LimitedUsesSectionProps> = ({ character, state, actions }) => {
  if (!character.limitedUses?.length) return null;

  return (
    <section id="limited-uses" className={`${sectionClass} scroll-mt-4 lg:flex-1 lg:min-h-0`}>
      <h2 className={sectionTitleClass}>
        <Hourglass className="h-4 w-4 text-amber-500" />
        Limited Uses
      </h2>
      <div className={sectionDividerClass} aria-hidden />
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
