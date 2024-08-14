import React from 'react';
import CharacterCard from './CharacterCard';

const CharacterList = ({ characters, onCardClick }) => {
  return (
    <div className="character-list">
      {characters.map((character, index) => (
        <CharacterCard
          key={index}
          character={character}
          onClick={() => onCardClick(character)}
        />
      ))}
    </div>
  );
};

export default CharacterList;
