
const API_URL = "https://api.rawg.io/api/games";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchGames = async (page = 1) => {
  try {
    const response = await fetch(
      `${API_URL}?key=${API_KEY}&page=${page}`
    );

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
    return { games: [], nextPageUrl: null, prevPageUrl: null }; 
  }
};
