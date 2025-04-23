import axios from "axios";

const API_URL = "https://api.rawg.io/api/creators";
const API_KEY = import.meta.env.VITE_API_KEY;

const creatorCache = {};
const creatorGamesCache = {};

export const getCreatorDetails = async (id) => {
  if (creatorCache[id]) {
    return creatorCache[id];
  }

  try {
    const response = await axios.get(`${API_URL}/${id}?key=${API_KEY}`);
    creatorCache[id] = response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching console details:", error);
    throw new Error("Console not found");
  }
};

export const getGamesForCreator = async (id) => {
  if (creatorGamesCache[id]) {
    return creatorGamesCache[id];
  }

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?creators=${id}&key=${API_KEY}`
    );
    creatorGamesCache[id] = response.data.results;
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games for console:", error);
    throw new Error("Games not found");
  }
};
