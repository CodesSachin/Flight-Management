const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const fetchFlights = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/flights`);
    if (!response.ok) throw new Error("Failed to fetch flights");
    return await response.json();
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

export const updateFlight = async (flightId, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/flights/${flightId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update flight");
    return await response.json();
  } catch (error) {
    console.error("Error updating flight:", error);
    throw error;
  }
};

export const deleteFlight = async (flightId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/flights/${flightId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete flight");
    return await response.json();
  } catch (error) {
    console.error("Error deleting flight:", error);
    throw error;
  }
};

export const createFlight = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/flights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create flight");
    return await response.json();
  } catch (error) {
    console.error("Error creating flight:", error);
    throw error;
  }
};
