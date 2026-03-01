import React from 'react';
import { HeartHandshake } from 'lucide-react';
import type { CharacterSheet, HopeTier, HopeCard } from '../model/character.types';

interface HopeAbilitiesSectionProps {
  character: CharacterSheet;
}

export const HopeCardView: React.FC<{ card: HopeCard; variant: 'active' | 'inactive' }> = ({ card, variant }) => {
  const lines = card.body.split('\n');

  if (variant === 'active') {
    return (
      <div className="rounded-lg border border-indigo-200 bg-indigo-50/80 p-2.5 sm:p-3">
        <h4 className="text-[0.7rem] font-semibold text-indigo-900 uppercase tracking-wide">{card.title}</h4>
        <div className="mt-0.5 space-y-0.5 text-[0.7rem] text-indigo-950">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-100 bg-white p-2 opacity-90">
      <h4 className="text-[0.65rem] font-semibold text-slate-700">{card.title}</h4>
      <p className="mt-0.5 text-[0.65rem] text-slate-500 line-clamp-3">{card.body}</p>
    </div>
  );
};

export const HopeAbilityTiers: React.FC<HopeAbilitiesSectionProps> = ({ character }) => {
  const tiers = character.hopeAbilities ?? [];
  if (tiers.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 sm:gap-2.5">
      {tiers
        .slice()
        .sort((a, b) => a.tier - b.tier)
        .map((tier) => {
          const active = tier.cards.find((c) => c.id === tier.activeCardId) ?? tier.cards[0];
          const inactive = tier.cards.filter((c) => c.id !== tier.activeCardId);

          return (
            <div key={tier.tier} className="rounded-lg border border-slate-100 bg-slate-50/60 p-2 sm:p-2.5 flex flex-col gap-1.5">
              <h3 className="text-[0.65rem] font-semibold text-slate-600 uppercase tracking-wide">
                Tier {tier.tier}
              </h3>
              <HopeCardView card={active} variant="active" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {inactive.map((card) => (
                  <HopeCardView key={card.id} card={card} variant="inactive" />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export const HopeAbilitiesSection: React.FC<HopeAbilitiesSectionProps> = ({ character }) => {
  const tiers = character.hopeAbilities ?? [];
  if (tiers.length === 0) return null;

  return (
    <section className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
      <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
        <HeartHandshake className="h-3.5 w-3.5 text-indigo-500" />
        Hope abilities
      </h2>
      <HopeAbilityTiers character={character} />
    </section>
  );
};

