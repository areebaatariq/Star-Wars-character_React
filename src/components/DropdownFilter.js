import React from 'react';

const DropdownFilter = ({ options, selectedValue, onChange, placeholder }) => {
  return (
    <select value={selectedValue} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  );
};

export default DropdownFilter;
