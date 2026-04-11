import React, { useState } from 'react';
import { Backpack } from 'lucide-react';
import type { CharacterSheet, CoinDenom, CoinPurse, InventoryItem } from '../model/character.types';
import type { CharacterTrackerState, CharacterTrackerActions } from '../storage/characterStorage';
import { bodyTextClass } from '../textClasses';

interface InventorySectionProps {
  character: CharacterSheet;
  state: CharacterTrackerState;
  actions: CharacterTrackerActions;
}

function splitDescription(description: string): string[] {
  return description
    .split(/\n\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

const DEFAULT_INVENTORY_ICON = '📦';

function resolveInventoryIcon(item: InventoryItem): string {
  const raw = item.icon?.trim();
  return raw && raw.length > 0 ? raw : DEFAULT_INVENTORY_ICON;
}

function isTrackedQuantity(item: InventoryItem): item is InventoryItem & { quantity: number } {
  return item.quantity !== 'n/a' && typeof item.quantity === 'number';
}

const COIN_DENOMS: { denom: CoinDenom; label: string; ariaLabel: string }[] = [
  { denom: 'pp', label: 'PP', ariaLabel: 'Platinum pieces (PP)' },
  { denom: 'gp', label: 'GP', ariaLabel: 'Gold pieces (GP)' },
  { denom: 'ep', label: 'EP', ariaLabel: 'Electrum pieces (EP)' },
  { denom: 'sp', label: 'SP', ariaLabel: 'Silver pieces (SP)' },
  { denom: 'cp', label: 'CP', ariaLabel: 'Copper pieces (CP)' },
];

/** Shared min height so Money lines up with typical item cards in the grid. */
const INVENTORY_CARD_MIN_H = 'min-h-[11rem]';

const MoneyCard: React.FC<{
  coinPurse: CoinPurse;
  onAdjustCoin: (denom: CoinDenom, delta: number) => void;
}> = ({ coinPurse, onAdjustCoin }) => {
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <div
      className={`rounded-lg border border-slate-200 bg-slate-50/80 overflow-hidden h-full flex flex-col ${INVENTORY_CARD_MIN_H}`}
    >
      <div className="px-2.5 py-2 sm:px-3 sm:py-2 flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-1.5 min-w-0 shrink-0">
          <span className="shrink-0 text-base leading-none select-none" aria-hidden>
            💰
          </span>
          <h4 className="text-sm font-semibold text-slate-900 truncate">Money</h4>
        </div>
        <div className="mt-2 border-t border-slate-100 pt-2 flex-1 flex flex-col min-h-0">
          <div
            className="flex flex-wrap gap-x-3 gap-y-2 sm:flex-nowrap sm:justify-between"
            onClick={stop}
            onKeyDown={stop}
          >
            {COIN_DENOMS.map(({ denom, label, ariaLabel }) => {
              const value = coinPurse[denom];
              return (
                <div
                  key={denom}
                  className="flex flex-col items-center gap-0.5 min-w-[3.25rem] flex-1 sm:flex-1 sm:min-w-0"
                  role="group"
                  aria-label={ariaLabel}
                >
                  <span
                    className="text-[0.65rem] font-semibold text-slate-600 tabular-nums leading-none cursor-default"
                    title={ariaLabel}
                  >
                    {label}
                  </span>
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-sm leading-none active:bg-slate-200 disabled:opacity-40 touch-manipulation"
                      onClick={() => onAdjustCoin(denom, -1)}
                      disabled={value <= 0}
                      aria-label={`Decrease ${ariaLabel}`}
                    >
                      −
                    </button>
                    <div className="min-w-[1.5rem] h-6 px-0.5 rounded bg-slate-800 text-white flex items-center justify-center text-[0.65rem] font-semibold tabular-nums">
                      {value}
                    </div>
                    <button
                      type="button"
                      className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-sm leading-none active:bg-slate-200 touch-manipulation"
                      onClick={() => onAdjustCoin(denom, 1)}
                      aria-label={`Increase ${ariaLabel}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-auto pt-2 border-t border-slate-100 text-[0.65rem] text-slate-500 leading-snug space-y-0.5">
            <p>10 Copper = 1 Silver; 5 Silver = 1 Electrum; 2 Electrum = 1 Gold; 10 Gold = 1 Platinum</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InventoryItemCard: React.FC<{
  item: InventoryItem;
  quantityCount: number;
  onAdjustQuantity: (delta: number) => void;
}> = ({ item, quantityCount, onAdjustQuantity }) => {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = item.description?.trim() ? splitDescription(item.description.trim()) : [];
  const hasDescription = paragraphs.length > 0;
  const hasMore =
    paragraphs.length > 1 || (paragraphs.length === 1 && Boolean(item.notes?.trim()));
  const notesInHeader = Boolean(item.notes?.trim()) && (!hasDescription || !hasMore);
  const showHeaderBody = Boolean(item.subtitle) || hasDescription || notesInHeader;
  const tracked = isTrackedQuantity(item);

  const toggle = () => setExpanded((e) => !e);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const stopCardToggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const previewParagraph = paragraphs[0];
  const restParagraphs = paragraphs.slice(1);
  const displayIcon = resolveInventoryIcon(item);

  return (
    <div
      className={`rounded-lg border border-slate-200 bg-slate-50/80 overflow-hidden h-full flex flex-col ${INVENTORY_CARD_MIN_H} ${
        hasMore ? 'cursor-pointer touch-manipulation' : ''
      }`}
      onClick={hasMore ? toggle : undefined}
      onKeyDown={hasMore ? onKeyDown : undefined}
      role={hasMore ? 'button' : undefined}
      tabIndex={hasMore ? 0 : undefined}
    >
      <div className="px-2.5 py-2 sm:px-3 sm:py-2 flex flex-col flex-1 min-h-0">
        <div className="min-w-0 flex-1 flex flex-col">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="shrink-0 text-base leading-none select-none" aria-hidden>
              {displayIcon}
            </span>
            <h4 className="text-sm font-semibold text-slate-900 truncate">{item.name}</h4>
          </div>
          {tracked && (
            <div
              className="flex items-center gap-1 h-7 mt-1.5"
              onClick={stopCardToggle}
              onKeyDown={stopCardToggle}
            >
              <button
                type="button"
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center active:bg-slate-200 disabled:opacity-40 touch-manipulation"
                onClick={() => onAdjustQuantity(-1)}
                disabled={quantityCount <= 0}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <div className="min-w-[1.75rem] h-7 rounded-md bg-slate-800 text-white flex items-center justify-center text-xs font-semibold tabular-nums">
                {quantityCount}
              </div>
              <button
                type="button"
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center active:bg-slate-200 touch-manipulation"
                onClick={() => onAdjustQuantity(1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
          {showHeaderBody && (
            <div className="mt-2 border-t border-slate-100 pt-2 space-y-2">
              {item.subtitle && <p className={bodyTextClass}>{item.subtitle}</p>}
              {hasDescription && (
                <p className={bodyTextClass}>
                  {previewParagraph}
                  {hasMore && !expanded && restParagraphs.length > 0 && ' …'}
                </p>
              )}
              {notesInHeader && <p className={bodyTextClass}>{item.notes}</p>}
            </div>
          )}
        </div>
      </div>
      {expanded && hasMore && (
        <div className="border-t border-slate-100 px-2.5 py-2 sm:px-3 sm:py-2 bg-white/80">
          {restParagraphs.length > 0 && (
            <div className="space-y-2">
              {restParagraphs.map((p, i) => (
                <p key={i} className={bodyTextClass}>
                  {p}
                </p>
              ))}
            </div>
          )}
          {item.notes?.trim() && (
            <p
              className={`${bodyTextClass} ${restParagraphs.length > 0 ? 'mt-2 pt-2 border-t border-slate-100' : ''}`}
            >
              {item.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export const InventorySection: React.FC<InventorySectionProps> = ({ character, state, actions }) => {
  const items = character.inventory ?? [];

  return (
    <section
      id="inventory"
      className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-col space-y-3 scroll-mt-4"
    >
      <h2 className="text-base font-semibold leading-tight text-slate-900 flex items-center gap-1.5">
        <Backpack className="h-4 w-4 text-emerald-600" />
        Inventory
      </h2>
      <div className="border-b border-slate-100 mt-2 mb-3" aria-hidden />
      {items.length === 0 && (
        <p className={bodyTextClass}>
          No custom items yet. Add objects to the <code className="text-xs bg-slate-100 px-1 rounded">inventory</code>{' '}
          array in this character&apos;s file under{' '}
          <code className="text-xs bg-slate-100 px-1 rounded">src/apps/character-sheet/data/characters/</code>.
        </p>
      )}
      <div className="grid gap-2 sm:grid-cols-2 items-stretch">
        {items.map((item) => {
          const tracked = isTrackedQuantity(item);
          const sheetDefault = tracked ? Math.max(0, Math.floor(item.quantity)) : 0;
          const quantityCount = tracked
            ? (state.inventoryQuantities[item.id] ?? sheetDefault)
            : 0;
          return (
            <InventoryItemCard
              key={item.id}
              item={item}
              quantityCount={quantityCount}
              onAdjustQuantity={(delta) => actions.adjustInventoryQuantity(item.id, delta)}
            />
          );
        })}
        <MoneyCard
          coinPurse={state.coinPurse}
          onAdjustCoin={(denom, delta) => actions.adjustCoinPurse(denom, delta)}
        />
      </div>
    </section>
  );
};
