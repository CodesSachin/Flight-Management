import React, { createContext, useState, useCallback } from 'react';

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFlight = useCallback((id, updatedData) => {
    setFlights(prevFlights =>
      prevFlights.map(flight =>
        flight.id === id ? { ...flight, ...updatedData } : flight
      )
    );
  }, []);

  const setFlightsData = useCallback((newFlights) => {
    setFlights(newFlights);
    setFilteredFlights(newFlights);
  }, []);

  const filterFlights = useCallback((predicate) => {
    const filtered = flights.filter(predicate);
    setFilteredFlights(filtered);
  }, [flights]);

  const value = {
    flights,
    filteredFlights,
    loading,
    error,
    updateFlight,
    setFlightsData,
    filterFlights,
    setLoading,
    setError,
  };

  return (
    <FlightContext.Provider value={value}>
      {children}
    </FlightContext.Provider>
  );
};

export default FlightContext;
