export const filterByDateRange = (flights, startDate, endDate) => {
  if (!startDate || !endDate) return flights;

  return flights.filter((flight) => {
    const flightStartDate = new Date(flight.startDate).getTime();
    const flightEndDate = new Date(flight.endDate).getTime();
    const filterStart = new Date(startDate).getTime();
    const filterEnd = new Date(endDate).getTime();

    // Check if filter date range overlaps with flight date range
    return flightStartDate <= filterEnd && flightEndDate >= filterStart;
  });
};

export const filterByStatus = (flights, status) => {
  if (!status) return flights;
  return flights.filter((flight) => flight.status === status);
};

export const filterByAoc = (flights, aoc) => {
  if (!aoc) return flights;
  return flights.filter((flight) => flight.aoc === aoc);
};

export const filterByBodyType = (flights, bodyType) => {
  if (!bodyType) return flights;
  return flights.filter((flight) => flight.bodyType === bodyType);
};

export const filterByDays = (flights, days) => {
  if (days.length === 0) return flights;

  const dayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  return flights.filter((flight) => {
    // daysOfOperation contains numbers 1-7 (Monday=1 to Sunday=7)
    // Convert day map value to daysOfOperation value
    return days.some((day) => {
      const dayNum = dayMap[day];
      // Convert from JS day (0=Sun, 1=Mon) to daysOfOperation (1=Mon, 7=Sun)
      const daysOfOpNum = dayNum === 0 ? 7 : dayNum;
      return flight.daysOfOperation.includes(daysOfOpNum);
    });
  });
};

export const applyAllFilters = (flights, filters) => {
  let result = flights;

  if (filters.dateRange.start && filters.dateRange.end) {
    result = filterByDateRange(
      result,
      filters.dateRange.start,
      filters.dateRange.end,
    );
  }

  if (filters.status) {
    result = filterByStatus(result, filters.status);
  }

  if (filters.aoc) {
    result = filterByAoc(result, filters.aoc);
  }

  if (filters.bodyType) {
    result = filterByBodyType(result, filters.bodyType);
  }

  if (filters.days.length > 0) {
    result = filterByDays(result, filters.days);
  }

  return result;
};
