import { useState, useEffect, useContext } from "react";
import { FlightContext } from "../context/FlightContext";
import flightsData from "../assets/flights.json";

export const useFlights = () => {
  const context = useContext(FlightContext);

  useEffect(() => {
    const loadFlights = () => {
      try {
        context.setLoading(true);
        context.setFlightsData(flightsData.flights);
      } catch (err) {
        context.setError("Failed to load flights");
        console.error(err);
      } finally {
        context.setLoading(false);
      }
    };

    if (context.flights.length === 0) {
      loadFlights();
    }
  }, []);

  return context;
};

export default useFlights;
