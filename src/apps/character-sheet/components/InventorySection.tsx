import React, { useState } from 'react';
import { Backpack } from 'lucide-react';
import type { CharacterSheet, InventoryItem } from '../model/character.types';
import { bodyTextClass } from '../textClasses';

interface InventorySectionProps {
  character: CharacterSheet;
}

function splitDescription(description: string): string[] {
  return description
    .split(/\n\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

const InventoryItemCard: React.FC<{ item: InventoryItem }> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = item.description?.trim() ? splitDescription(item.description.trim()) : [];
  const hasDescription = paragraphs.length > 0;
  const hasMore =
    paragraphs.length > 1 || (paragraphs.length === 1 && Boolean(item.notes?.trim()));
  const notesInHeader = Boolean(item.notes?.trim()) && (!hasDescription || !hasMore);
  const showHeaderBody = Boolean(item.subtitle) || hasDescription || notesInHeader;

  const toggle = () => setExpanded((e) => !e);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const previewParagraph = paragraphs[0];
  const restParagraphs = paragraphs.slice(1);

  return (
    <div
      className={`rounded-lg border border-slate-200 bg-slate-50/80 overflow-hidden ${
        hasMore ? 'cursor-pointer touch-manipulation' : ''
      }`}
      onClick={hasMore ? toggle : undefined}
      onKeyDown={hasMore ? onKeyDown : undefined}
      role={hasMore ? 'button' : undefined}
      tabIndex={hasMore ? 0 : undefined}
    >
      <div className="px-2.5 py-2 sm:px-3 sm:py-2 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="text-sm font-semibold text-slate-900">{item.name}</h4>
            {typeof item.quantity === 'number' && (
              <span className="text-xs font-medium tabular-nums text-slate-600 shrink-0">×{item.quantity}</span>
            )}
          </div>
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
        {hasMore && (
          <span
            className={`shrink-0 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            aria-hidden
          >
            ▼
          </span>
        )}
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

export const InventorySection: React.FC<InventorySectionProps> = ({ character }) => {
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
      {items.length === 0 ? (
        <p className={bodyTextClass}>
          No custom items yet. Add objects to the <code className="text-xs bg-slate-100 px-1 rounded">inventory</code>{' '}
          array in this character&apos;s file under{' '}
          <code className="text-xs bg-slate-100 px-1 rounded">src/apps/character-sheet/data/characters/</code>.
        </p>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <InventoryItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};
