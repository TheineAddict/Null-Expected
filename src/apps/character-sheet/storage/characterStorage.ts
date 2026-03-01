import { useEffect, useState } from 'react';
import type { CharacterSheet } from '../model/character.types';

export const STORAGE_KEY_VERSION = 'v1';

export interface CharacterTrackerState {
  currentHp: number;
  tempHp: number;
  hopeThirds: number;
  inspirationThirds: number;
  limitedUses: Record<string, number>;
  deathSaves: {
    successes: number;
    failures: number;
  };
}

export interface CharacterTrackerActions {
  setCurrentHp: (value: number) => void;
  adjustCurrentHp: (delta: number) => void;
  setTempHp: (value: number) => void;
  adjustTempHp: (delta: number) => void;
  addHopeThirds: (delta: number) => void;
  spendHope: () => void;
  addInspirationThirds: (delta: number) => void;
  spendInspiration: () => void;
  adjustLimitedUse: (id: string, delta: number, max: number) => void;
  setDeathSaves: (successes: number, failures: number) => void;
  resetTrackers: () => void;
}

function buildStorageKey(characterId: string): string {
  return `ne:character-sheet:${characterId}:state:${STORAGE_KEY_VERSION}`;
}

function createDefaultState(character: CharacterSheet): CharacterTrackerState {
  const limitedUses: Record<string, number> = {};
  character.limitedUses.forEach((res) => {
    limitedUses[res.id] = 0;
  });

  return {
    currentHp: character.maxHp,
    tempHp: 0,
    hopeThirds: 0,
    inspirationThirds: 0,
    limitedUses,
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
    const maxHp = character.maxHp;

    const currentHp =
      typeof parsed.currentHp === 'number'
        ? Math.max(0, Math.min(parsed.currentHp, maxHp))
        : base.currentHp;
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
      tempHp,
      hopeThirds,
      inspirationThirds,
      limitedUses,
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
        currentHp: Math.max(0, Math.min(value, character.maxHp)),
      }));
    },
    adjustCurrentHp: (delta) => {
      setState((prev) => ({
        ...prev,
        currentHp: Math.max(0, Math.min(prev.currentHp + delta, character.maxHp)),
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
        if (prev.inspirationThirds < 3) return prev;
        return {
          ...prev,
          inspirationThirds: prev.inspirationThirds - 3,
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

