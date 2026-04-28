import React, { useState } from 'react';

const BodyTypeFilter = ({ onFilterChange }) => {
  const [bodyType, setBodyType] = useState('');

  const bodyTypes = ['narrow_body', 'wide_body'];

  const handleBodyTypeChange = (e) => {
    const value = e.target.value;
    setBodyType(value);
    onFilterChange('bodyType', value);
  };

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <label className="form-label fw-semibold">Body Type</label>
      <select value={bodyType} onChange={handleBodyTypeChange} className="form-select">
        <option value="">All</option>
        {bodyTypes.map(b => (
          <option key={b} value={b}>
            {b === 'narrow_body' ? 'Narrow Body' : 'Wide Body'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BodyTypeFilter;
