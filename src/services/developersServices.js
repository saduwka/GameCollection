import axios from "axios";

const API_URL = "https://api.rawg.io/api/developers";
const API_KEY = import.meta.env.VITE_API_KEY;

export const getDevelopers = async () => {
  try {
    const response = await axios.get(`${API_URL}?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching developer details:", error);
    throw new Error("Developer not found");
  }
};

export const getGamesForDeveloper = async (id) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?developers=${id}&key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games for console:", error);
    throw new Error("Games not found");
  }
};

export const getDeveloperDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}?key=${API_KEY}`); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching developer details:", error);
    throw new Error("Developer not found");
  }
};
