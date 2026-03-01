import React from 'react';
import type { CharacterSheet, HopeTier, HopeCard } from '../model/character.types';

interface HopeAbilitiesSectionProps {
  character: CharacterSheet;
}

const HopeCardView: React.FC<{ card: HopeCard; variant: 'active' | 'inactive' }> = ({ card, variant }) => {
  const lines = card.body.split('\n');

  if (variant === 'active') {
    return (
      <div className="rounded-lg border border-indigo-200 bg-indigo-50/70 p-3">
        <h4 className="text-xs font-semibold text-indigo-900 uppercase tracking-wide">{card.title}</h4>
        <div className="mt-1 space-y-1 text-xs text-indigo-950">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-2 opacity-80">
      <h4 className="text-[0.7rem] font-semibold text-gray-800">{card.title}</h4>
      <p className="mt-0.5 text-[0.7rem] text-gray-500 line-clamp-3">{card.body}</p>
    </div>
  );
};

export const HopeAbilitiesSection: React.FC<HopeAbilitiesSectionProps> = ({ character }) => {
  const tiers = character.hopeAbilities ?? [];

  if (tiers.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl bg-white shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-800 tracking-wide uppercase">Hope Abilities</h2>
        <p className="text-[0.7rem] text-gray-500 max-w-xs">
          Each tier unlocks when it exists in the character sheet file under <code>hopeAbilities</code>. Exactly one
          card per tier is active, chosen in code, not here.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {tiers
          .slice()
          .sort((a, b) => a.tier - b.tier)
          .map((tier) => {
            const active = tier.cards.find((c) => c.id === tier.activeCardId) ?? tier.cards[0];
            const inactive = tier.cards.filter((c) => c.id !== tier.activeCardId);

            return (
              <div key={tier.tier} className="rounded-lg border border-gray-100 bg-slate-50/60 p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-semibold text-gray-800 uppercase tracking-wide">
                    Hope Tier {tier.tier}
                  </h3>
                  <span className="text-[0.7rem] text-gray-500">
                    Active card set in <code>hopeAbilities</code> (no in‑app switching).
                  </span>
                </div>
                <HopeCardView card={active} variant="active" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {inactive.map((card) => (
                    <HopeCardView key={card.id} card={card} variant="inactive" />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

