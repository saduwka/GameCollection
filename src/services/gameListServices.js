// src/services/gameListServices.js
export const fetchGames = async () => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=97d7d537cfa34027be12ab4dfea87d96`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }

    const data = await response.json();
    return data.results; // Возвращаем только список игр
  } catch (error) {
    console.error("Error fetching games:", error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
};
