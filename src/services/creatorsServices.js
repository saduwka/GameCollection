import axios from "axios";

const API_URL = "https://api.rawg.io/api/creators";
const API_KEY = import.meta.env.VITE_API_KEY;

const creatorsCache = {};

export const getCreatorsDetails = async (id) => {
  if (creatorsCache[id]) {
    return creatorsCache[id];
  }

  try {
    const response = await axios.get(`${API_URL}?key=${API_KEY}`);
    creatorsCache[id] = response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching console details:", error);
    throw new Error("Console not found");
  }
};

