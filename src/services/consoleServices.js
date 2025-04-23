import axios from "axios";

const API_URL = "https://api.rawg.io/api/platforms";
const API_KEY = import.meta.env.VITE_API_KEY;

const consoleCache = {};
const gamesCache = {};

export const getConsoleDetails = async (id) => {
  if (consoleCache[id]) {
    return consoleCache[id];
  }

  try {
    const response = await axios.get(`${API_URL}/${id}?key=${API_KEY}`);
    consoleCache[id] = response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching console details:", error);
    throw new Error("Console not found");
  }
};

export const getGamesForConsole = async (id, page = 1) => {
  const cacheKey = `${id}-${page}`;
  if (gamesCache[cacheKey]) {
    return gamesCache[cacheKey];
  }

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?platforms=${id}&page=${page}&key=${API_KEY}`
    );
    gamesCache[cacheKey] = response.data.results;
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games for console:", error);
    throw new Error("Games not found");
  }
};
