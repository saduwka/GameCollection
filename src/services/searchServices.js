const API_URL = "https://api.rawg.io/api/games";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchGames = async (searchQuery = "") => {
  const allGames = [];
  let nextUrl = `${API_URL}?key=${API_KEY}&page_size=100&search=${searchQuery}`;

  while (nextUrl && allGames.length < 120) {
    const response = await fetch(nextUrl);
    if (!response.ok) {
      throw new Error("Failed to load data");
    }

    const data = await response.json();
    console.log("API response:", data);

    if (Array.isArray(data.results)) {
      allGames.push(...data.results);
      nextUrl = data.next;
    } else {
      throw new Error("API response does not contain a list of games");
    }
  }

  return allGames;
};