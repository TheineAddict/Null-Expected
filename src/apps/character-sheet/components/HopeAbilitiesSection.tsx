import React, { useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import type { CharacterSheet, HopeTier, HopeCard } from '../model/character.types';
import { bodyTextClass } from '../textClasses';

interface HopeAbilitiesSectionProps {
  character: CharacterSheet;
}

const ActiveHopeCard: React.FC<{ card: HopeCard }> = ({ card }) => {
  const lines = card.body.split('\n');
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/80 p-3">
      <h4 className="text-sm font-semibold text-indigo-900">{card.title}</h4>
      <div className={`mt-1 space-y-0.5 ${bodyTextClass}`}>
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
};

const InactiveHopeCard: React.FC<{ card: HopeCard }> = ({ card }) => {
  const [expanded, setExpanded] = useState(false);
  const lines = card.body.split('\n');

  return (
    <div
      className="rounded-lg border border-slate-200 bg-white p-3 opacity-90 cursor-pointer touch-manipulation overflow-hidden"
      onClick={() => setExpanded((e) => !e)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded((v) => !v); }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-xs font-semibold text-slate-700">{card.title}</h4>
        <span
          className={`shrink-0 text-slate-400 transition-transform self-center text-xs ${expanded ? 'rotate-180' : ''}`}
          aria-hidden
        >
          ▼
        </span>
      </div>
      {expanded ? (
        <div className={`mt-1 space-y-0.5 ${bodyTextClass}`}>
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      ) : (
        <p className={`mt-0.5 ${bodyTextClass} line-clamp-3`}>{card.body}</p>
      )}
    </div>
  );
};

export const HopeCardView: React.FC<{ card: HopeCard; variant: 'active' | 'inactive' }> = ({ card, variant }) => {
  if (variant === 'active') return <ActiveHopeCard card={card} />;
  return <InactiveHopeCard card={card} />;
};

export const HopeAbilityTiers: React.FC<HopeAbilitiesSectionProps> = ({ character }) => {
  const tiers = character.hopeAbilities ?? [];
  if (tiers.length === 0) return null;

  return (
    <div className="flex flex-col space-y-4">
      {tiers
        .slice()
        .sort((a, b) => a.tier - b.tier)
        .map((tier) => {
          const active = tier.cards.find((c) => c.id === tier.activeCardId) ?? tier.cards[0];
          const inactive = tier.cards.filter((c) => c.id !== tier.activeCardId);

          return (
            <div key={tier.tier} className="rounded-lg border border-slate-200 bg-slate-50/60 p-3 flex flex-col space-y-3">
              <h3 className="text-xs font-semibold text-slate-600">
                Tier {tier.tier}
              </h3>
              <HopeCardView card={active} variant="active" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

