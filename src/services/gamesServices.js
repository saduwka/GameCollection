import axios from "axios";

const API_URL = "https://api.rawg.io/api/games";
const API_KEY = import.meta.env.VITE_API_KEY;
const gameDetailsCache = {};

export const getGameDetails = async (gameId) => {
  if (gameDetailsCache[gameId]) {
    return gameDetailsCache[gameId];
  }

  try {
    const response = await axios.get(
      `${API_URL}/${gameId}?key=${API_KEY}`
    );
    gameDetailsCache[gameId] = response.data;
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw error;
  }
};
