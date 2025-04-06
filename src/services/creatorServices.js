import axios from "axios";

const API_URL = "https://api.rawg.io/api/creators";
const API_KEY = import.meta.env.VITE_API_KEY;

export const getCreatorDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching console details:", error);
    throw new Error("Console not found");
  }
};

export const getGamesForCreator = async (id) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?creators=${id}&key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games for console:", error);
    throw new Error("Games not found");
  }
};
