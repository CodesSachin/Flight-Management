import { useState, useCallback } from "react";

export const useFilters = () => {
  const [filters, setFilters] = useState({
    dateRange: { start: "", end: "" },
    days: [],
    status: "",
    aoc: "",
    bodyType: "",
  });

  const updateFilter = useCallback((filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      dateRange: { start: "", end: "" },
      days: [],
      status: "",
      aoc: "",
      bodyType: "",
    });
  }, []);

  return { filters, updateFilter, resetFilters };
};

export default useFilters;
