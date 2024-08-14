import React from 'react';

const CharacterCard = ({ character, onClick }) => {
  const getCardColor = (species) => {
    if (species.includes('Human')) return 'lightgrey';
    if (species.includes('Droid')) return 'Lavender';
    return 'lightpink';
  };

  return (
    <div
      className="character-card"
      style={{ backgroundColor: getCardColor(character.speciesNames) }}
      onClick={onClick}
    >
      <img src={`https://picsum.photos/200?random=${Math.random()}`} alt="Random" />
      <h2>{character.name}</h2>
    </div>
  );
};

export default CharacterCard;
