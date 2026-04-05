import { useEffect, useState } from 'react';
import type { CharacterSheet, CoinDenom, CoinPurse } from '../model/character.types';

export const STORAGE_KEY_VERSION = 'v1';

export interface CharacterTrackerState {
  currentHp: number;
  effectiveMaxHp: number;
  tempHp: number;
  hopeThirds: number;
  inspirationThirds: number;
  limitedUses: Record<string, number>;
  /** Counts for inventory items whose sheet `quantity` is a number (not `'n/a'`). */
  inventoryQuantities: Record<string, number>;
  coinPurse: CoinPurse;
  deathSaves: {
    successes: number;
    failures: number;
  };
}

export interface CharacterTrackerActions {
  setCurrentHp: (value: number) => void;
  adjustCurrentHp: (delta: number) => void;
  setEffectiveMaxHp: (value: number) => void;
  adjustEffectiveMaxHp: (delta: number) => void;
  setTempHp: (value: number) => void;
  adjustTempHp: (delta: number) => void;
  addHopeThirds: (delta: number) => void;
  spendHope: () => void;
  addInspirationThirds: (delta: number) => void;
  spendInspiration: () => void;
  adjustLimitedUse: (id: string, delta: number, max: number) => void;
  adjustInventoryQuantity: (id: string, delta: number) => void;
  adjustCoinPurse: (denom: CoinDenom, delta: number) => void;
  setDeathSaves: (successes: number, failures: number) => void;
  resetTrackers: () => void;
}

function buildStorageKey(characterId: string): string {
  return `ne:character-sheet:${characterId}:state:${STORAGE_KEY_VERSION}`;
}

const ZERO_COIN_PURSE: CoinPurse = { pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 };

function normalizeCoinPurse(raw: unknown): CoinPurse {
  if (!raw || typeof raw !== 'object') {
    return { ...ZERO_COIN_PURSE };
  }
  const o = raw as Record<string, unknown>;
  const clamp = (v: unknown) => Math.max(0, Math.floor(typeof v === 'number' && Number.isFinite(v) ? v : 0));
  return {
    pp: clamp(o.pp),
    gp: clamp(o.gp),
    ep: clamp(o.ep),
    sp: clamp(o.sp),
    cp: clamp(o.cp),
  };
}

function createDefaultState(character: CharacterSheet): CharacterTrackerState {
  const limitedUses: Record<string, number> = {};
  character.limitedUses.forEach((res) => {
    limitedUses[res.id] = 0;
  });

  const inventoryQuantities: Record<string, number> = {};
  for (const item of character.inventory ?? []) {
    if (typeof item.quantity === 'number') {
      inventoryQuantities[item.id] = Math.max(0, Math.floor(item.quantity));
    }
  }

  return {
    currentHp: character.maxHp,
    effectiveMaxHp: character.maxHp,
    tempHp: 0,
    hopeThirds: 0,
    inspirationThirds: 0,
    limitedUses,
    inventoryQuantities,
    coinPurse: { ...ZERO_COIN_PURSE },
    deathSaves: {
      successes: 0,
      failures: 0,
    },
  };
}

function loadState(character: CharacterSheet): CharacterTrackerState {
  if (typeof window === 'undefined') {
    return createDefaultState(character);
  }

  try {
    const raw = window.localStorage.getItem(buildStorageKey(character.id));
    if (!raw) {
      return createDefaultState(character);
    }

    const parsed = JSON.parse(raw) as Partial<CharacterTrackerState>;
    const base = createDefaultState(character);
    const sheetMaxHp = character.maxHp;

    const effectiveMaxHp =
      typeof parsed.effectiveMaxHp === 'number' ? parsed.effectiveMaxHp : sheetMaxHp;

    const currentHp =
      typeof parsed.currentHp === 'number' ? parsed.currentHp : base.currentHp;
    const tempHp =
      typeof parsed.tempHp === 'number' ? Math.max(0, parsed.tempHp) : base.tempHp;
    const hopeThirds =
      typeof parsed.hopeThirds === 'number' ? Math.max(0, parsed.hopeThirds) : base.hopeThirds;
    const inspirationThirds =
      typeof parsed.inspirationThirds === 'number'
        ? Math.max(0, parsed.inspirationThirds)
        : base.inspirationThirds;

    const limitedUses = { ...base.limitedUses };
    if (parsed.limitedUses && typeof parsed.limitedUses === 'object') {
      for (const res of character.limitedUses) {
        const v = parsed.limitedUses[res.id];
        if (typeof v === 'number') {
          limitedUses[res.id] = Math.max(0, Math.min(v, res.max));
        }
      }
    }

    const inventoryQuantities = { ...base.inventoryQuantities };
    if (parsed.inventoryQuantities && typeof parsed.inventoryQuantities === 'object') {
      for (const item of character.inventory ?? []) {
        if (typeof item.quantity === 'number') {
          const v = parsed.inventoryQuantities[item.id];
          if (typeof v === 'number') {
            inventoryQuantities[item.id] = Math.max(0, Math.floor(v));
          }
        }
      }
    }

    const coinPurse = normalizeCoinPurse(parsed.coinPurse);

    const deathSaves = {
      successes:
        typeof parsed.deathSaves?.successes === 'number'
          ? Math.max(0, Math.min(parsed.deathSaves.successes, 3))
          : base.deathSaves.successes,
      failures:
        typeof parsed.deathSaves?.failures === 'number'
          ? Math.max(0, Math.min(parsed.deathSaves.failures, 3))
          : base.deathSaves.failures,
    };

    return {
      currentHp,
      effectiveMaxHp,
      tempHp,
      hopeThirds,
      inspirationThirds,
      limitedUses,
      inventoryQuantities,
      coinPurse,
      deathSaves,
    };
  } catch {
    return createDefaultState(character);
  }
}

function persistState(character: CharacterSheet, state: CharacterTrackerState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(buildStorageKey(character.id), JSON.stringify(state));
  } catch {
    // Ignore storage failures
  }
}

export function useCharacterTracker(
  character: CharacterSheet,
): { state: CharacterTrackerState; actions: CharacterTrackerActions } {
  const [state, setState] = useState<CharacterTrackerState>(() => loadState(character));

  // When the character changes, reload from storage
  useEffect(() => {
    setState(loadState(character));
  }, [character.id]);

  // Persist on change
  useEffect(() => {
    persistState(character, state);
  }, [character, state]);

  const actions: CharacterTrackerActions = {
    setCurrentHp: (value) => {
      setState((prev) => ({
        ...prev,
        currentHp: value,
      }));
    },
    adjustCurrentHp: (delta) => {
      setState((prev) => ({
        ...prev,
        currentHp: prev.currentHp + delta,
      }));
    },
    setEffectiveMaxHp: (value) => {
      setState((prev) => ({
        ...prev,
        effectiveMaxHp: value,
      }));
    },
    adjustEffectiveMaxHp: (delta) => {
      setState((prev) => ({
        ...prev,
        effectiveMaxHp: prev.effectiveMaxHp + delta,
      }));
    },
    setTempHp: (value) => {
      setState((prev) => ({
        ...prev,
        tempHp: Math.max(0, value),
      }));
    },
    adjustTempHp: (delta) => {
      setState((prev) => ({
        ...prev,
        tempHp: Math.max(0, prev.tempHp + delta),
      }));
    },
    addHopeThirds: (delta) => {
      setState((prev) => ({
        ...prev,
        hopeThirds: Math.max(0, prev.hopeThirds + delta),
      }));
    },
    spendHope: () => {
      setState((prev) => {
        if (prev.hopeThirds < 3) return prev;
        return {
          ...prev,
          hopeThirds: prev.hopeThirds - 3,
        };
      });
    },
    addInspirationThirds: (delta) => {
      setState((prev) => ({
        ...prev,
        inspirationThirds: Math.max(0, prev.inspirationThirds + delta),
      }));
    },
    spendInspiration: () => {
      setState((prev) => {
        if (prev.inspirationThirds < 1) return prev;
        return {
          ...prev,
          inspirationThirds: prev.inspirationThirds - 1,
        };
      });
    },
    adjustLimitedUse: (id, delta, max) => {
      setState((prev) => {
        const current = prev.limitedUses[id] ?? 0;
        const next = Math.max(0, Math.min(current + delta, max));
        return {
          ...prev,
          limitedUses: {
            ...prev.limitedUses,
            [id]: next,
          },
        };
      });
    },
    adjustInventoryQuantity: (id, delta) => {
      setState((prev) => {
        const invItem = character.inventory?.find((i) => i.id === id);
        if (!invItem || invItem.quantity === 'n/a' || typeof invItem.quantity !== 'number') {
          return prev;
        }
        const sheetDefault = Math.max(0, Math.floor(invItem.quantity));
        const current = prev.inventoryQuantities[id] ?? sheetDefault;
        const next = Math.max(0, current + delta);
        return {
          ...prev,
          inventoryQuantities: {
            ...prev.inventoryQuantities,
            [id]: next,
          },
        };
      });
    },
    adjustCoinPurse: (denom, delta) => {
      setState((prev) => {
        const current = prev.coinPurse[denom];
        const next = Math.max(0, current + delta);
        return {
          ...prev,
          coinPurse: {
            ...prev.coinPurse,
            [denom]: next,
          },
        };
      });
    },
    setDeathSaves: (successes, failures) => {
      setState((prev) => ({
        ...prev,
        deathSaves: {
          successes: Math.max(0, Math.min(successes, 3)),
          failures: Math.max(0, Math.min(failures, 3)),
        },
      }));
    },
    resetTrackers: () => {
      setState(createDefaultState(character));
    },
  };

  return { state, actions };
}

