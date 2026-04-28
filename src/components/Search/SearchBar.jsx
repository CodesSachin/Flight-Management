import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="input-group mb-3">
      <span className="input-group-text bg-white border-0" style={{ borderRadius: '16px 0 0 16px', paddingLeft: '1rem' }}>🔎</span>
      <input
        type="text"
        placeholder="Search flight number, route, destination, operator..."
        value={searchTerm}
        onChange={handleChange}
        className="form-control border-0"
        style={{ padding: '0.95rem 0.5rem', boxShadow: 'none' }}
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="btn btn-light border-0"
          style={{ borderRadius: '0 16px 16px 0', paddingRight: '1rem' }}
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
