import React from 'react';

interface StatTileProps {
  /** Primary label line (truncated). */
  label: React.ReactNode;
  /** Numeric/text value displayed below the label. */
  value: React.ReactNode;
  /** Optional extra className on the wrapper (e.g. conditional bg). */
  className?: string;
  title?: string;
  height?: 'sm' | 'md';
}

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  className = '',
  title,
  height = 'sm',
}) => (
  <div
    className={`${height === 'sm' ? 'h-12' : 'h-14'} rounded-lg border border-slate-200 bg-slate-50 px-2.5 flex flex-col justify-center min-w-0 ${className}`}
    title={title}
  >
    <div className="text-xs font-medium text-slate-700 truncate leading-tight">{label}</div>
    <div className="tabular-nums font-semibold text-slate-900 text-sm mt-0.5">{value}</div>
  </div>
);
