// src/services/consolesService.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.rawg.io/api/platforms";
const consolesCache = {};

export const getConsoles = async () => {
  try {
    const response = await axios.get(`${API_URL}?key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching consoles:", error);
    return [];
  }
};

export const getConsoleDetails = async (id) => {
  if (consolesCache[id]) {
    return consolesCache[id];
  }

  try {
    const response = await axios.get(`${API_URL}/${id}`);
    consolesCache[id] = response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching console details:", error);
    return null;
  }
};
