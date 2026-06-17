import React from 'react';
import { FlaskConical } from 'lucide-react';
import { bodyTextClass, sectionClass, sectionTitleClass, sectionDividerClass, innerCardClass } from '../textClasses';

const POTIONS: { name: string; dice: string; icon: string }[] = [
  { name: 'Potion of Healing', dice: '2d4 + 2 HP', icon: '🧪' },
  { name: 'Potion of Greater Healing', dice: '4d4 + 4 HP', icon: '✨' },
  { name: 'Potion of Superior Healing', dice: '8d4 + 8 HP', icon: '💠' },
  { name: 'Potion of Supreme Healing', dice: '10d4 + 20 HP', icon: '👑' },
];

export const HealingPotionsSection: React.FC = () => (
  <section
    id="healing-potions"
    className={sectionClass}
  >
    <h2 className={sectionTitleClass}>
      <FlaskConical className="h-4 w-4 text-emerald-500" />
      Healing Potions (2024)
    </h2>
    <div className={sectionDividerClass} aria-hidden />
    <p className={bodyTextClass}>
      Use as a Bonus Action: drink a potion yourself or administer it to another creature within 5 ft.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {POTIONS.map(({ name, dice, icon }) => (
        <div
          key={name}
          className={`${innerCardClass} flex flex-col gap-2 h-full`}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none" aria-hidden>{icon}</span>
            <span className="text-sm font-semibold text-slate-900">{name}</span>
          </div>
          <span className="tabular-nums font-semibold text-sm text-slate-900">{dice}</span>
        </div>
      ))}
    </div>
  </section>
);
