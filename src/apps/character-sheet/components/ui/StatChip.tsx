import React from 'react';

interface StatChipProps {
  icon: string;
  label: string;
  value: string | number;
}

export const StatChip: React.FC<StatChipProps> = ({ icon, label, value }) => (
  <div className="h-8 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs flex items-center gap-1.5">
    <span aria-hidden>{icon}</span>
    <span className="text-slate-500">{label}</span>
    <span className="tabular-nums font-semibold text-slate-900">{value}</span>
  </div>
);
