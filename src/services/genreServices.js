import axios from "axios";

const API_URL = "https://api.rawg.io/api/genres";
const API_KEY = import.meta.env.VITE_API_KEY; 

export const getGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching genre details:", error);
    throw new Error("Genre not found");
  }
};

export const getGamesForGenre = async (id, page = 1) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?genres=${id}&page=${page}&key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games for genre:", error);
    throw new Error("Games not found");
  }
};

export const getGenresDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}?key=${API_KEY}`); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching genre details:", error);
    throw new Error("Genre not found"); 
  }
};
