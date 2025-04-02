// src/services/consoleServices.js
import axios from "axios";

const API_URL = "https://api.rawg.io/api/platforms";
const apiKey = "97d7d537cfa34027be12ab4dfea87d96";

export const getConsoleDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}?key=${apiKey}`); // Используем id из аргумента
    return response.data; // Возвращаем данные консоли
  } catch (error) {
    console.error("Error fetching console details:", error);
    throw new Error("Console not found"); // Бросаем ошибку, если консоль не найдена
  }
};

export const getGamesForConsole = async (id) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?platforms=${id}&key=${apiKey}`
    ); // Запрос игр для консоли по ID
    return response.data.results; // Возвращаем список игр
  } catch (error) {
    console.error("Error fetching games for console:", error);
    throw new Error("Games not found");
  }
};
