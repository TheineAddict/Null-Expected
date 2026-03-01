import React from 'react';
import { FlaskConical } from 'lucide-react';

const POTIONS: { name: string; dice: string }[] = [
  { name: 'Potion of Healing', dice: '2d4 + 2 HP' },
  { name: 'Potion of Greater Healing', dice: '4d4 + 4 HP' },
  { name: 'Potion of Superior Healing', dice: '8d4 + 8 HP' },
  { name: 'Potion of Supreme Healing', dice: '10d4 + 20 HP' },
];

export const HealingPotionsSection: React.FC = () => (
  <section
    id="healing-potions"
    className="rounded-xl bg-white shadow-sm border border-slate-100 p-3 sm:p-4 flex flex-col gap-2"
  >
    <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
      <FlaskConical className="h-3.5 w-3.5 text-emerald-500" />
      Healing Potions (2024)
    </h2>
    <p className="text-[0.65rem] text-slate-500">
      Use as a Bonus Action: drink a potion yourself or administer it to another creature within 5 ft.
    </p>
    <ul className="flex flex-col gap-0.5 text-[0.7rem] text-slate-700">
      {POTIONS.map(({ name, dice }) => (
        <li key={name} className="flex justify-between gap-2 items-baseline">
          <span className="font-medium text-slate-800">{name}</span>
          <span className="tabular-nums text-slate-600 shrink-0">{dice}</span>
        </li>
      ))}
    </ul>
    <p className="text-[0.65rem] text-slate-500 pt-0.5">
      Roll the dice and add the modifier shown. You regain that many hit points.
    </p>
  </section>
);
