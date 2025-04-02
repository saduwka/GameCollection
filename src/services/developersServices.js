import axios from "axios";

const API_URL = "https://api.rawg.io/api/developers";
const apiKey = "97d7d537cfa34027be12ab4dfea87d96";

export const getDevelopers = async () => {
  try {
    const response = await axios.get(`${API_URL}?key=${apiKey}`); 
    return response.data;
  } catch (error) {
    console.error("Error fetching developer details:", error);
    throw new Error("Developer not found"); 
  }
};

export const getGamesForDeveloper = async (id) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?developers=${id}&key=${apiKey}`
    ); 
    return response.data.results; 
  } catch (error) {
    console.error("Error fetching games for console:", error);
    throw new Error("Games not found");
  }
};

export const getDeveloperDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}?key=${apiKey}`); // Используем id из аргумента
    return response.data; // Возвращаем данные консоли
  } catch (error) {
    console.error("Error fetching developer details:", error);
    throw new Error("Console not found"); // Бросаем ошибку, если консоль не найдена
  }
};