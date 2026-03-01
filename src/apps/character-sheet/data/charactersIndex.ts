import type { CharacterSheet } from '../model/character.types';

type CharacterModule = Record<string, CharacterSheet>;

const modules = import.meta.glob<CharacterModule>('./characters/*.ts', { eager: false });

function pathToCharacterId(path: string): string {
  return path.split('/').pop()?.replace(/\.ts$/, '') ?? '';
}

/** Ordered list of character ids (from filenames). New .ts files under characters/ are picked up at build time. */
export const characterIds: string[] = Object.keys(modules)
  .map(pathToCharacterId)
  .filter((id) => id !== 'index' && id !== 'template_character_sheet' && id.length > 0)
  .sort((a, b) => a.localeCompare(b));

/**
 * Load a character by id (filename without extension). Returns null if not found or module has no matching export.
 */
export async function getCharacter(characterId: string): Promise<CharacterSheet | null> {
  if (!characterId) return null;
  const path = `./characters/${characterId}.ts`;
  const loader = modules[path];
  if (!loader) return null;
  try {
    const mod = await loader();
    const sheet = mod[characterId] ?? (Object.values(mod)[0] as CharacterSheet | undefined);
    return sheet ?? null;
  } catch {
    return null;
  }
}
