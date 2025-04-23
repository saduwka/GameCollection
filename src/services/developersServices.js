import axios from "axios";

const API_URL = "https://api.rawg.io/api/developers";
const API_KEY = import.meta.env.VITE_API_KEY;

const developersCache = {};
const developerGamesCache = {};
const fetchDevelopersCache = {};

export const getDevelopers = async (page = 1) => {
  if (developersCache[page]) {
    return developersCache[page];
  }

  try {
    const response = await axios.get(`${API_URL}?key=${API_KEY}&page=${page}`);
    developersCache[page] = response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching developer details:", error);
    throw new Error("Developer not found");
  }
};

export const getGamesForDeveloper = async (id) => {
  if (developerGamesCache[id]) {
    return developerGamesCache[id];
  }

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?developers=${id}&key=${API_KEY}`
    );
    developerGamesCache[id] = response.data.results;
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games for console:", error);
    throw new Error("Games not found");
  }
};

export const getDeveloperDetails = async (id) => {
  if (developersCache[id]) {
    return developersCache[id];
  }

  try {
    const response = await axios.get(`${API_URL}/${id}?key=${API_KEY}`); 
    developersCache[id] = response.data;
    return response.data; 
  } catch (error) {
    console.error("Error fetching developer details:", error);
    throw new Error("Developer not found");
  }
};

export const fetchDevelopers = async (searchQuery = "") => {
  if (fetchDevelopersCache[searchQuery]) {
    return fetchDevelopersCache[searchQuery];
  }

  const allDevelopers = [];
  let nextUrl = `${API_URL}?key=${API_KEY}&page_size=100&search=${searchQuery}`;

  while (nextUrl && allDevelopers.length < 120) {
    const response = await fetch(nextUrl);
    if (!response.ok) {
      throw new Error("Failed to load developers");
    }

    const data = await response.json();
    console.log("Developers API response:", data);

    if (Array.isArray(data.results)) {
      allDevelopers.push(...data.results);
      nextUrl = data.next;
    } else {
      throw new Error("API response does not contain a list of developers");
    }
  }

  fetchDevelopersCache[searchQuery] = allDevelopers;
  return allDevelopers;
};
