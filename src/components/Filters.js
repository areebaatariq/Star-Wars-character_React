import React from 'react';
import SearchBar from './SearchBar';
import DropdownFilter from './DropdownFilter';

const Filters = ({
  selectedSpecies, setSelectedSpecies,
  selectedHomeworld, setSelectedHomeworld,
  selectedFilm, setSelectedFilm,
  searchTerm, setSearchTerm,
  speciesOptions, homeworldOptions, filmOptions
}) => {
  return (
    <div className="filters">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <DropdownFilter
        options={speciesOptions}
        selectedValue={selectedSpecies}
        onChange={(e) => setSelectedSpecies(e.target.value)}
        placeholder="All Species"
      />
      <DropdownFilter
        options={homeworldOptions}
        selectedValue={selectedHomeworld}
        onChange={(e) => setSelectedHomeworld(e.target.value)}
        placeholder="All Homeworlds"
      />
      <DropdownFilter
        options={filmOptions}
        selectedValue={selectedFilm}
        onChange={(e) => setSelectedFilm(e.target.value)}
        placeholder="All Films"
      />
    </div>
  );
};

export default Filters;
