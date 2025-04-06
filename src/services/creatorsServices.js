import axios from "axios";

const API_URL = "https://api.rawg.io/api/creators";
const API_KEY = import.meta.env.VITE_API_KEY;

export const getCreatorsDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}?key=${API_KEY}`); 
    return response.data;
  } catch (error) {
    console.error("Error fetching console details:", error);
    throw new Error("Console not found"); 
  }
};

