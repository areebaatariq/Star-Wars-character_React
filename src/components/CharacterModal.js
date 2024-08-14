import React from 'react';
import Modal from 'react-modal';

const CharacterModal = ({ isOpen, onRequestClose, character, homeworld }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Character Details" >
      <h2>{character.name}</h2>
      <p><strong>Height:</strong> {(character.height / 100).toFixed(2)} meters</p>
      <p><strong>Mass:</strong> {character.mass} kg</p>
      <p><strong>Birth Year:</strong> {character.birth_year}</p>
      <p><strong>Date Added:</strong> {new Date(character.created).toLocaleDateString('en-GB')}</p>
      <p><strong>Number of Films:</strong> {character.filmTitles.length}</p>
      <h3>Homeworld</h3>
      <p><strong>Name:</strong> {homeworld.name}</p>
      <p><strong>Terrain:</strong> {homeworld.terrain}</p>
      <p><strong>Climate:</strong> {homeworld.climate}</p>
      <p><strong>Population:</strong> {homeworld.population}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default CharacterModal;
