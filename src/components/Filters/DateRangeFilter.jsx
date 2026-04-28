import React, { useState } from 'react';

const DateRangeFilter = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    onFilterChange('dateRange', { start: value, end: endDate });
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    onFilterChange('dateRange', { start: startDate, end: value });
  };

  return (
    <div className="col-12 col-lg-6">
      <label className="form-label fw-semibold">Date Range</label>
      <div className="row g-2">
        <div className="col-12 col-md-6">
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            placeholder="Start Date"
            className="form-control"
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            placeholder="End Date"
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
