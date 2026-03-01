import type { CharacterSheet } from '../model/character.types';
import { aelfwynn } from './characters/aelfwynn';

export const CHARACTERS: Record<string, CharacterSheet> = {
  [aelfwynn.id]: aelfwynn,
};

export const DEFAULT_CHARACTER_ID = aelfwynn.id;

