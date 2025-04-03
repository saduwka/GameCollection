// В file: gameListServices.js
export const fetchGames = async (page = 1) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=97d7d537cfa34027be12ab4dfea87d96&page=${page}`
    );

    // Проверка на успешный ответ
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      games: data.results,
      nextPageUrl: data.next,
      prevPageUrl: data.previous
    };
  } catch (error) {
    console.error("Error fetching games:", error);
    return { games: [], nextPageUrl: null, prevPageUrl: null }; // Возвращаем пустые данные в случае ошибки
  }
};