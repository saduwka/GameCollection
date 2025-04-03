// src/services/gameListServices.js
export const fetchGames = async (url) => {
  try {
    const response = await fetch(
      url ||
        `https://api.rawg.io/api/games?key=97d7d537cfa34027be12ab4dfea87d96`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }

    const data = await response.json();
    return {
      games: data.results,
      nextPage: data.next,
      prevPage: data.previous
    };
  } catch (error) {
    console.error("Error fetching games:", error);
    return { games: [], nextPage: null, prevPage: null }; // Возвращаем пустые данные в случае ошибки
  }
};
