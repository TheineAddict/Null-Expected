import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Navigate, Link } from 'react-router-dom';
import CharacterSheetApp from '../apps/character-sheet/CharacterSheetApp';
import { characterIds, getCharacter } from '../apps/character-sheet/data/charactersIndex';
import type { CharacterSheet } from '../apps/character-sheet/model/character.types';

/** Index: redirect to first character or show minimal picker. */
export const CharacterSheetIndexPage: React.FC = () => {
  if (characterIds.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-sm">No characters found. Add a .ts file under src/apps/character-sheet/data/characters.</p>
      </div>
    );
  }
  return <Navigate to={`/character-sheet-app/${characterIds[0]}`} replace />;
};

/** Single sheet: load character by id and render, or not-found. */
export const CharacterSheetPage: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const [character, setCharacter] = useState<CharacterSheet | null | undefined>(undefined);

  useEffect(() => {
    if (!characterId) {
      setCharacter(null);
      return;
    }
    let cancelled = false;
    getCharacter(characterId).then((sheet) => {
      if (!cancelled) setCharacter(sheet ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [characterId]);

  if (characterId == null) return null;
  if (character === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading…</p>
      </div>
    );
  }
  if (character === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-2">Character not found.</p>
          <Link to="/character-sheet-app" className="text-indigo-600 hover:underline text-sm">
            Back to character sheet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Null Expected Character Sheet</title>
      </Helmet>
      <CharacterSheetApp character={character} />
    </>
  );
};

/** Legacy default export for the index route (redirect). */
const CharacterSheetAppPage: React.FC = () => (
  <>
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
      <title>Null Expected Character Sheet</title>
    </Helmet>
    <CharacterSheetIndexPage />
  </>
);

export default CharacterSheetAppPage;
