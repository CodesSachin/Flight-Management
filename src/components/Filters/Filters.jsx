import React from 'react';
import DateRangeFilter from './DateRangeFilter';
import DaysFilter from './DaysFilter';
import StatusFilter from './StatusFilter';
import AocFilter from './AocFilter';
import BodyTypeFilter from './BodyTypeFilter';

const Filters = ({ onFilterChange }) => {
  const handleFilterChange = (filterType, value) => {
    onFilterChange({ type: filterType, value });
  };

  return (
    <div className="border bg-light p-3" style={{ borderRadius: '18px', borderColor: '#e4ebf2' }}>
      <div className="row g-3 mb-3">
        <DateRangeFilter onFilterChange={handleFilterChange} />
        <DaysFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="row g-3">
        <StatusFilter onFilterChange={handleFilterChange} />
        <AocFilter onFilterChange={handleFilterChange} />
        <BodyTypeFilter onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
};

export default Filters;
