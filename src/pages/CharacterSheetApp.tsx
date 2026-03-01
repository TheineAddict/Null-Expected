import React from 'react';
import { Helmet } from 'react-helmet-async';
import CharacterSheetApp from '../apps/character-sheet/CharacterSheetApp';

const CharacterSheetAppPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Null Expected Character Sheet</title>
      </Helmet>
      <CharacterSheetApp />
    </>
  );
};

export default CharacterSheetAppPage;

