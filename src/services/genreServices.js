import axios from "axios";

const API_URL = "https://api.rawg.io/api/genres";
const API_KEY = import.meta.env.VITE_API_KEY; 

const platformsCache = {};
const platformGamesCache = {};

export const getGenres = async () => {
  if (platformsCache["all"]) {
    return platformsCache["all"];
  }

  try {
    const response = await axios.get(`${API_URL}?key=${API_KEY}`);
    platformsCache["all"] = response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching platform details:", error);
    throw new Error("Platforms not found");
  }
};

export const getGamesForGenre = async (id, page = 1) => {
  const cacheKey = `${id}-${page}`;
  if (platformGamesCache[cacheKey]) {
    return platformGamesCache[cacheKey];
  }

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?genres=${id}&page=${page}&key=${API_KEY}`
    );
    platformGamesCache[cacheKey] = response.data.results;
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games for platform:", error);
    throw new Error("Games not found");
  }
};

export const getGenresDetails = async (id) => {
  if (platformsCache[id]) {
    return platformsCache[id];
  }

  try {
    const response = await axios.get(`${API_URL}/${id}?key=${API_KEY}`); 
    platformsCache[id] = response.data;
    return response.data; 
  } catch (error) {
    console.error("Error fetching platform details:", error);
    throw new Error("Platform not found"); 
  }
};
