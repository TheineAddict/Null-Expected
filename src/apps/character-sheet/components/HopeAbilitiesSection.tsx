import React, { useState } from 'react';
import { HeartHandshake, ChevronDown } from 'lucide-react';
import type { CharacterSheet, HopeTier, HopeCard } from '../model/character.types';
import { bodyTextClass, innerCardClass, subSectionHeaderClass } from '../textClasses';

interface HopeAbilitiesSectionProps {
  character: CharacterSheet;
}

const ActiveHopeCard: React.FC<{ card: HopeCard }> = ({ card }) => {
  const [expanded, setExpanded] = useState(false);
  const lines = card.body.split('\n');

  return (
    <div
      className="rounded-lg border border-indigo-200 bg-indigo-50/80 p-3 cursor-pointer touch-manipulation"
      onClick={() => setExpanded((e) => !e)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setExpanded((v) => !v);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-indigo-900">{card.title}</h4>
        <ChevronDown
          className={`shrink-0 h-3.5 w-3.5 text-indigo-400 transition-transform self-center ${expanded ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </div>
      {expanded ? (
        <div className={`mt-1 space-y-0.5 ${bodyTextClass}`}>
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      ) : (
        <p className={`mt-0.5 ${bodyTextClass} line-clamp-2`}>{card.body}</p>
      )}
    </div>
  );
};

const InactiveHopeCard: React.FC<{ card: HopeCard }> = ({ card }) => {
  const [expanded, setExpanded] = useState(false);
  const lines = card.body.split('\n');

  return (
    <div
      className={`${innerCardClass} bg-white opacity-90 cursor-pointer touch-manipulation overflow-hidden`}
      onClick={() => setExpanded((e) => !e)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setExpanded((v) => !v);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-xs font-semibold text-slate-700">{card.title}</h4>
        <ChevronDown
          className={`shrink-0 h-3.5 w-3.5 text-slate-400 transition-transform self-center ${expanded ? 'rotate-180' : ''}`}
          aria-hidden
        />
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

const TierContainer: React.FC<{ tier: HopeTier; defaultExpanded: boolean }> = ({ tier, defaultExpanded }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const active = tier.cards.find((c) => c.id === tier.activeCardId) ?? tier.cards[0];
  const inactive = tier.cards.filter((c) => c.id !== tier.activeCardId);

  return (
    <div className={`${innerCardClass} flex flex-col space-y-3`}>
      <button
        className="flex items-center justify-between gap-2 w-full text-left"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <h3 className={subSectionHeaderClass}>Tier {tier.tier}</h3>
        <ChevronDown
          className={`shrink-0 h-3.5 w-3.5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {expanded && (
        <>
          <HopeCardView card={active} variant="active" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inactive.map((card) => (
              <HopeCardView key={card.id} card={card} variant="inactive" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const HopeAbilityTiers: React.FC<HopeAbilitiesSectionProps> = ({ character }) => {
  const tiers = character.hopeAbilities ?? [];
  if (tiers.length === 0) return null;

  const sorted = tiers.slice().sort((a: HopeTier, b: HopeTier) => a.tier - b.tier);
  const maxTier = sorted[sorted.length - 1]?.tier ?? 0;

  return (
    <div className="flex flex-col space-y-4">
      {sorted.map((tier: HopeTier) => (
        <TierContainer key={tier.tier} tier={tier} defaultExpanded={tier.tier === maxTier} />
      ))}
    </div>
  );
};

export const HopeAbilitiesSection: React.FC<HopeAbilitiesSectionProps> = ({ character }) => {
  const tiers = character.hopeAbilities ?? [];
  if (tiers.length === 0) return null;

  return (
    <section className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-col gap-3 scroll-mt-4">
      <h2 className="text-base font-semibold leading-tight text-slate-900 flex items-center gap-1.5">
        <HeartHandshake className="h-4 w-4 text-indigo-500" />
        Hope Abilities
      </h2>
      <HopeAbilityTiers character={character} />
    </section>
  );
};
