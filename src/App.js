import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CharacterList from './components/CharacterList';
import Loader from './components/Loader';
import Error from './components/Error';
import Filters from './components/Filters';
import CharacterModal from './components/CharacterModal';
import './App.css';

Modal.setAppElement('#root');

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);

  // Filter states
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedHomeworld, setSelectedHomeworld] = useState('');
  const [selectedFilm, setSelectedFilm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const url = 'https://swapi.dev/api/people/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const characters = await Promise.all(
          response.data.results.map(async (character) => {
            const speciesDetails = await Promise.all(
              character.species.map((speciesUrl) => axios.get(speciesUrl))
            );
            const speciesNames = speciesDetails.map((res) => res.data.name || 'Unknown');

            const homeworldResponse = await axios.get(character.homeworld);
            const homeworldName = homeworldResponse.data.name || 'Unknown';

            const filmDetails = await Promise.all(
              character.films.map((filmUrl) => axios.get(filmUrl))
            );
            const filmTitles = filmDetails.map((res) => res.data.title || 'Unknown');

            return {
              ...character,
              speciesNames,
              homeworldName,
              filmTitles,
            };
          })
        );

        setCharacters(characters);
        setFilteredCharacters(characters); // Initially display all characters
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtering logic
  useEffect(() => {
    const filtered = characters.filter((character) => {
      const matchesSpecies = selectedSpecies ? character.speciesNames.includes(selectedSpecies) : true;
      const matchesHomeworld = selectedHomeworld ? character.homeworldName === selectedHomeworld : true;
      const matchesFilm = selectedFilm ? character.filmTitles.includes(selectedFilm) : true;
      const matchesSearchTerm = searchTerm
        ? character.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchesSpecies && matchesHomeworld && matchesFilm && matchesSearchTerm;
    });

    setFilteredCharacters(filtered);
  }, [selectedSpecies, selectedHomeworld, selectedFilm, searchTerm, characters]);

  const handleCardClick = async (character) => {
    setSelectedCharacter(character);
    try {
      const homeworldResponse = await axios.get(character.homeworld);
      setHomeworld(homeworldResponse.data);
      setModalIsOpen(true);
    } catch (err) {
      console.error('Failed to fetch homeworld data', err);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCharacter(null);
    setHomeworld(null);
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div className="App">
      <h1>Welcome to The Star Wars</h1>
      <Filters
        selectedSpecies={selectedSpecies}
        setSelectedSpecies={setSelectedSpecies}
        selectedHomeworld={selectedHomeworld}
        setSelectedHomeworld={setSelectedHomeworld}
        selectedFilm={selectedFilm}
        setSelectedFilm={setSelectedFilm}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        speciesOptions={[...new Set(characters.flatMap((char) => char.speciesNames))]}
        homeworldOptions={[...new Set(characters.map((char) => char.homeworldName))]}
        filmOptions={[...new Set(characters.flatMap((char) => char.filmTitles))]}
      />

      <CharacterList
        characters={filteredCharacters}
        onCardClick={handleCardClick}
      />

      {selectedCharacter && homeworld && (
        <CharacterModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          character={selectedCharacter}
          homeworld={homeworld}
        />
      )}
    </div>
  );
};

export default App;
