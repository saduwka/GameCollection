import axios from "axios";

const API_URL = "https://api.rawg.io/api/genres";
const apiKey = "97d7d537cfa34027be12ab4dfea87d96";

export const getGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}?key=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching genre details:", error);
    throw new Error("Genre not found");
  }
};

export const getGamesForGenre = async (id) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?genres=${id}&key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games for genre:", error);
    throw new Error("Games not found");
  }
};

export const getGenresDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}?key=${apiKey}`); // Используем id из аргумента
    return response.data; // Возвращаем данные консоли
  } catch (error) {
    console.error("Error fetching genre details:", error);
    throw new Error("Genre not found"); // Бросаем ошибку, если консоль не найдена
  }
};
