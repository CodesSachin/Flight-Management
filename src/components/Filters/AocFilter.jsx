import React, { useState } from 'react';

const AocFilter = ({ onFilterChange }) => {
  const [aoc, setAoc] = useState('');

  const aocs = ['Z2', 'D7', 'AK', 'FD'];

  const handleAocChange = (e) => {
    const value = e.target.value;
    setAoc(value);
    onFilterChange('aoc', value);
  };

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <label className="form-label fw-semibold">AOC (Air Operator Certificate)</label>
      <select value={aoc} onChange={handleAocChange} className="form-select">
        <option value="">All</option>
        {aocs.map(a => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AocFilter;
