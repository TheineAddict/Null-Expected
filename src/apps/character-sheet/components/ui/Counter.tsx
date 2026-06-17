import React from 'react';

type CounterSize = 'sm' | 'md' | 'lg';
type CounterVariant = 'dark' | 'light';

interface CounterProps {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  decrementDisabled?: boolean;
  incrementDisabled?: boolean;
  decrementLabel?: string;
  incrementLabel?: string;
  size?: CounterSize;
  variant?: CounterVariant;
}

const SIZES: Record<CounterSize, { btn: string; display: string; gap: string }> = {
  sm: { btn: 'w-7 h-7', display: 'min-w-[1.75rem] h-7 rounded-md text-xs', gap: 'gap-1' },
  md: { btn: 'w-8 h-8 sm:w-9 sm:h-9', display: 'min-w-[2.5rem] h-9 rounded-lg text-base', gap: 'gap-1.5' },
  lg: { btn: 'w-9 h-9', display: 'min-w-[3rem] h-11 rounded-lg text-xl', gap: 'gap-2' },
};

const VARIANTS: Record<CounterVariant, string> = {
  dark: 'bg-slate-800 text-white',
  light: 'bg-slate-50 text-slate-800 border border-slate-200',
};

const BTN_BASE =
  'rounded-full bg-slate-100 text-slate-700 font-semibold flex items-center justify-center active:bg-slate-200 disabled:opacity-40 touch-manipulation focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 shrink-0';

export const Counter: React.FC<CounterProps> = ({
  value,
  onDecrement,
  onIncrement,
  decrementDisabled = false,
  incrementDisabled = false,
  decrementLabel = 'Decrease',
  incrementLabel = 'Increase',
  size = 'sm',
  variant = 'dark',
}) => {
  const { btn, display, gap } = SIZES[size];
  const displayVariantClass = VARIANTS[variant];

  return (
    <div className={`flex items-center ${gap} shrink-0`}>
      <button
        type="button"
        className={`${btn} ${BTN_BASE}`}
        onClick={onDecrement}
        disabled={decrementDisabled}
        aria-label={decrementLabel}
      >
        −
      </button>
      <div className={`${display} ${displayVariantClass} flex items-center justify-center font-semibold tabular-nums`}>
        {value}
      </div>
      <button
        type="button"
        className={`${btn} ${BTN_BASE}`}
        onClick={onIncrement}
        disabled={incrementDisabled}
        aria-label={incrementLabel}
      >
        +
      </button>
    </div>
  );
};
