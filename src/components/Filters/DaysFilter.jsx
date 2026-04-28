import React, { useState } from 'react';

const DaysFilter = ({ onFilterChange }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayChange = (day) => {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    setSelectedDays(updated);
    onFilterChange('days', updated);
  };

  return (
    <div className="col-12 col-lg-6">
      <label className="form-label fw-semibold">Days</label>
      <div className="d-flex flex-wrap gap-2">
        {days.map(day => (
          <label key={day} className="form-check form-check-inline border rounded-pill px-3 py-2 bg-white m-0">
            <input
              className="form-check-input me-2"
              type="checkbox"
              checked={selectedDays.includes(day)}
              onChange={() => handleDayChange(day)}
            />
            <span className="small">{day}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DaysFilter;
