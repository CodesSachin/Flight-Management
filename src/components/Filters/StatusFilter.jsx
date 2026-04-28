import React, { useState } from 'react';

const StatusFilter = ({ onFilterChange }) => {
  const [status, setStatus] = useState('');

  const statuses = ['Active', 'Inactive'];

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    onFilterChange('status', value);
  };

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <label className="form-label fw-semibold">Status</label>
      <select value={status} onChange={handleStatusChange} className="form-select">
        <option value="">All</option>
        {statuses.map(s => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter;
