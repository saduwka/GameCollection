import axios from "axios";

const API_URL = "https://api.rawg.io/api/games";
const API_KEY = import.meta.env.VITE_API_KEY;

export const getGameDetails = async (gameId) => {
  try {
    const response = await axios.get(
      `${API_URL}/${gameId}?key=${API_KEY}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw error;
  }
};
