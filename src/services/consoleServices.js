import axios from "axios";

const API_URL = "https://api.rawg.io/api/platforms";
const apiKey = "97d7d537cfa34027be12ab4dfea87d96";

export const getConsoleDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}?key=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching console details:", error);
    throw new Error("Console not found");
  }
};

export const getGamesForConsole = async (id) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?platforms=${id}&key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games for console:", error);
    throw new Error("Games not found");
  }
};
