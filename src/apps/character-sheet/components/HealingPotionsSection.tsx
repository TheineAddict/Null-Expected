import React from 'react';
import { FlaskConical } from 'lucide-react';

const POTIONS: { name: string; dice: string; icon: string }[] = [
  { name: 'Potion of Healing', dice: '2d4 + 2 HP', icon: '🧪' },
  { name: 'Potion of Greater Healing', dice: '4d4 + 4 HP', icon: '✨' },
  { name: 'Potion of Superior Healing', dice: '8d4 + 8 HP', icon: '💠' },
  { name: 'Potion of Supreme Healing', dice: '10d4 + 20 HP', icon: '👑' },
];

export const HealingPotionsSection: React.FC = () => (
  <section
    id="healing-potions"
    className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-3"
  >
    <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
      <FlaskConical className="h-3.5 w-3.5 text-emerald-500" />
      Healing Potions (2024)
    </h2>
    <p className="text-[0.65rem] text-slate-500">
      Use as a Bonus Action: drink a potion yourself or administer it to another creature within 5 ft.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      {POTIONS.map(({ name, dice, icon }) => (
        <div
          key={name}
          className="rounded-lg border border-slate-100 bg-slate-50/80 p-2.5 sm:p-3 flex flex-col gap-1.5"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none" aria-hidden>{icon}</span>
            <span className="text-xs font-bold text-slate-900">{name}</span>
          </div>
          <span className="tabular-nums font-semibold text-slate-900 text-sm">{dice}</span>
        </div>
      ))}
    </div>
  </section>
);
